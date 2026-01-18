import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProductsFetch} from "../data/products.js";
// import '../data/cart-opp.js';
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backendPractice.js';

//! Using Async-Await.
async function loadPage(){

    //? Using Try and Catch in the Async-Await to catch any unexpected error while we can use try and catch even without using Async and Await in the normal program.
    try{
        await loadProductsFetch();
    }catch(error){
        console.log(`Alert! An unexpected error caught: ${error}`);
    }

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