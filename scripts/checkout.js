import orderSummary from "./checkout/orderSummary.js";
import paymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import '../data/car.js';
// import { Card } from '../data/card-class.js';
loadProducts(() => {
    renderCheckoutHeader();
    orderSummary();
    paymentSummary();
});

