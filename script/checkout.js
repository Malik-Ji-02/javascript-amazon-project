import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProductsFetch} from "../data/products.js";
// import '../data/cart-opp.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backendPractice.js';

//! Using Async-Await.
async function loadPage(){
    await loadProductsFetch();

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

//! Using Fetch with the promises.
// loadProductsFetch().then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

//! Using Promises.
// new Promise((resolve) => {
//     loadProducts(()=>{
//         resolve();
//     });
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });