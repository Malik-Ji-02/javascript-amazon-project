import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProductsFetch} from "../data/products.js";
// import '../data/cart-opp.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backendPractice.js';

loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});


// new Promise((resolve) => {
//     loadProducts(()=>{
//         resolve();
//     });
// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });