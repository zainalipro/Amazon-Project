/*
Steps to solve the problem in JS which is also called MVC
1. Save the Date (Model)
2. Generate the Data (View)
3. Make it Interactive (Controller)
*/
// import { card, calculateCartQuantity } from "../../data/cards.js";
import { card as cart } from "../../data/card.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export default function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cardItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const charges = getDeliveryOption(Number(cartItem.deliveryOptionId));
    shippingPriceCents += charges.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const EstimatedTaxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + EstimatedTaxCents;

  const paymentSummaryHTML = `
            <div class="payment-summary-title">
          Order Summary
        </div>
        <div class="payment-summary-row">
          <div>Items (${cart.calculateCartQuantity()}):</div>
          <div class="payment-summary-money">
            ${formatCurrency(productPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">
            ${formatCurrency(shippingPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">
            ${formatCurrency(totalBeforeTaxCents)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">
            ${formatCurrency(EstimatedTaxCents)}
          </div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">
            ${formatCurrency(totalCents)}
          </div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>
    `;
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        // const cartData = cart.cardItems;
        const cartData = cart.cardItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          deliveryOptionId: String(item.deliveryOptionId), // Ensure deliveryOptionId is a string
        }));
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart: cartData
          })
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('unexpected error ' + error);
      }
      window.location.href = './orders.html';
    });
}
