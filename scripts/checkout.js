import orderSummary from "./checkout/orderSummary.js";
import paymentSummary from "./checkout/paymentSummary.js";
import renderCheckoutHeader from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import '../data/car.js';
import { loadCard } from '../data/card.js';

/*
//Method 1:
// load products for database of 'SuperSimpleBackend.dev/products'
loadProducts(() => {
    renderCheckoutHeader();
    orderSummary();
    paymentSummary();
});
*/

/*
// Method 2:
//create two promises one for load products and one for load cart.
// promise 1: load products
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
});

// Promise 2: load cart: load cart from 'SuperSimpleBackend.dev/cart'
new Promise((resolve) => {
    loadCard(() => {
        resolve();
    });
}).then(() => {
    renderCheckoutHeader();
    orderSummary();
    paymentSummary();
});
*/

/*
// Method 3: load products and cart in parallel
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value-1');
        });
    }),
    new Promise((resolve) => {
        loadCard(() => {
            resolve();
        });
    }),
]).then((values) => {
    renderCheckoutHeader();
    orderSummary();
    paymentSummary();
});
*/
/*
// Method 4: load products with fetch;
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCard(() => {
            resolve();
        });
    }),
]).then(() => {
    renderCheckoutHeader();
    orderSummary();
    paymentSummary();
});
*/
// Method 5: use of async and await 
async function loadPage() {
    try {
        await loadProductsFetch();

        await new Promise((resolve) => {
            loadCard(() => {
                resolve();
            });
        });
        // render the page
        renderCheckoutHeader();
        orderSummary();
        paymentSummary();
    } catch (error) {
        console.log('sorry this thing is not run due the following error' + error);

    }
}

loadPage();