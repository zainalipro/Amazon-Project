import { products } from '../data/products.js';
import { addToCard, calculateCartQuantity } from '../data/cards.js';
// import { Card } from '../data/card-class.js';
import { formatCurrency } from './utils/money.js';

// display the products onto the page.
const displayProducts = document.getElementById('js-products-grid');

let productsHTML = '';
// load the  products from the file products.js
products.forEach((product) => {
  productsHTML += `
                <div class="product-container">
              <div class="product-image-container">
                <img class="product-image" src="${product.image}">
              </div>
      
              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>
      
              <div class="product-rating-container">
                <img class="product-rating-stars" src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                 ${product.rating.count}
                </div>
              </div>
      
              <div class="product-price">
               ${product.getPrice()}
              </div>
      
              <div class="product-quantity-container">
                <select>
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              ${product.extraInfoHtml()}
      
              <div class="product-spacer"></div>
      
              <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
              </div>
      
              <button class="add-to-cart-button button-primary js-add-to-card-button" data-product-id= "${product.id}">
                Add to Cart
              </button>
            </div>
          `;
});

displayProducts.innerHTML = productsHTML;
window.addEventListener('load', updateCardQuantity());

function updateCardQuantity() {
  document.querySelector('.js-card-quantity')
    .textContent = calculateCartQuantity();
}


// button click event listener
document.querySelectorAll('.js-add-to-card-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCard(productId);
    updateCardQuantity()
  });
});
