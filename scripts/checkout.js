import orderSummary from "./checkout/orderSummary.js";
import paymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import '../data/cart-oop.js';

renderCheckoutHeader();
orderSummary();
paymentSummary();
