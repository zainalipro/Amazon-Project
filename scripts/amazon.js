import { displayItems } from '../data/products.js';
import { addToCard } from '../data/cards.js';

// display the products onto the page.
window.addEventListener('load', () => {
  document.getElementById('js-products-grid')
    .innerHTML = displayItems();
});

function updateCardQuantity() {
  let cardQuantity = 0;
  card.forEach((cardItem) => {
    cardQuantity += cardItem.quantity;
  });
  document.querySelector('.js-card-quantity')
    .textContent = cardQuantity;
}

document.querySelectorAll('.js-add-to-card-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCard(productId);
    updateCardQuantity();
  });
});