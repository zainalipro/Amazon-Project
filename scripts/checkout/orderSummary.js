// Importing the necessary files 
import { card, removeFromCard, saveToStorage, calculateCartQuantity, updateQuantity, updateDeliveryOption, removeCardItems } from '../../data/cards.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';
import { deliveryOptions } from "../../data/deliveryOptions.js";

export default function renderOrderSummary() {
    // Start generating the HTML on the page
    let showHtml = '';
    card.forEach((cardItem) => {
        const { productId } = cardItem;
        let matchingProduct;

        // Check for matching product
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });

        const deliveryOptionId = Number(cardItem.deliveryOptionId);
        // let deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);
        let deliveryOptionGet;
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOptionGet = option;
            }
        });
        // Prevent error by checking if deliveryOption exists
        const today = dayjs();
        let deliveryDate;
        let dateString = 'N/A'; // Set a default string if no delivery date available

        if (deliveryOptionGet) {
            deliveryDate = today.add(deliveryOptionGet.deliveryDays, 'days');
            dateString = deliveryDate.format('dddd, MMMM D');
        } else {
            console.warn(`Delivery option not found for item with productId: ${productId}`);
        }

        if (matchingProduct) {
            showHtml += `<div class="cart-item-container js-card-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-update-card-quantity-${matchingProduct.id}">${cardItem.quantity}</span>
                        </span>

                        <span class="link-primary js-update-link" data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <span class="js-update-quantity-${matchingProduct.id} not-show">
                            <input class="quantity-input quantity-input-${matchingProduct.id}" type="number" autofocus>
                            <span class="save-quantity-link link-primary">Save</span>
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionHtml(matchingProduct, cardItem)}
                </div>
            </div>
        </div>`;
        }
    });


    // function to create the delivery options
    function deliveryOptionHtml(matchingProduct, cardItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.
                priceCents === 0
                ? 'Free'
                : `${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = (Number(cardItem.deliveryOptionId) === deliveryOption.id);

            html +=
                `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}"
            ${isChecked ? 'checked' : ''}
            >
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
        </div>
        `;
        });
        return html;
    }



    // load the products when the window/ browser is loaded.

    window.addEventListener('load', updateCartQuantity);
    document.getElementById('js-order-products-display').innerHTML = showHtml;
    function updateCartQuantity() {
        document.querySelector('.js-return-to-home-link')
            .textContent = `${calculateCartQuantity()}`;
    }

    // delete the item for the card when clicking to the delete link
    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;
                removeFromCard(productId);
                const container = document.querySelector(`.js-card-item-container-${productId}`);
                container.remove();
                updateCartQuantity();
                saveToStorage();
            });
        });

    // Updating the quantity of the products.
    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;

            // Showing the save and input into the product card
            const container = document.querySelector(`.js-update-quantity-${productId}`);
            container.classList.remove('not-show');

            // Disappearing the quantity and update link
            link.classList.add('not-show');
            const quantityNumber = document.querySelector(`.js-update-card-quantity-${productId}`);
            quantityNumber.classList.add('not-show');

            // Action for save button
            const saveLink = container.querySelector('.save-quantity-link');
            const quantityInput = document.querySelector(`.quantity-input-${productId}`);

            function saveFunc() {
                container.classList.add('not-show');
                // Displaying the save and input button
                link.classList.remove('not-show');
                quantityNumber.classList.remove('not-show');

                // Getting the input quantity number from the card
                const newQuantity = Number(quantityInput.value);

                if (newQuantity > 0 && newQuantity <= 1000) {
                    // Saving and displaying the card quantity
                    updateQuantity(newQuantity, productId);
                    quantityNumber.textContent = newQuantity;
                    updateCartQuantity();
                }
            }

            // Add click event for save link
            saveLink.addEventListener('click', saveFunc);

            // Add keypress event for the quantity input field
            quantityInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    saveFunc();
                }
            });
        });
    });

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            });
        });
}