import { card, removeFromCard } from '../data/cards.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let showHtml = '';
card.forEach((cardItem) => {
    const productId = cardItem.productId;
    let matchingProduct;

    for (const product of products) {
        if (product.id === productId) {
            matchingProduct = product;
            break;
        }
    }

    let itemInCard = ''
    if (matchingProduct) {
        itemInCard = `<div class="cart-item-container">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div >
                <div class="product-price">
                    ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label"> ${cardItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                </div>
            </div >

    <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                </div>
        </div>
    </div>
    </div >
</div > `
    }
    else {
        itemInCard = 'Sorry not products inside the card';
    }
    showHtml += itemInCard;
});

document.getElementById('js-order-products-display').innerHTML = showHtml;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const { productId } = link.dataset;
            removeFromCard(productId);
        });
    });