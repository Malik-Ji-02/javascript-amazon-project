import {orders} from '../data/orders.js';
import { loadProductsFetch, getProduct} from '../data/products.js';

loadProducts();

async function loadProducts(){
  try{
    await loadProductsFetch();
  } catch(error){
    console.log('Unexpected error. Please try after some time...!');
  }
  loadTrackingHtml();
}

function loadTrackingHtml(){

  let url = new URL(window.location.href);
  const orderIdCurr = url.searchParams.get('orderId');
  const productIdCurr = url.searchParams.get('productId');

  const matchingItem = getProduct(productIdCurr);

  let matchingOrder;
  let matchingProduct;

  orders.forEach((order)=>{
    if(order.id === orderIdCurr){
      matchingOrder = order;
    }
  });
  matchingOrder.products.forEach((product)=>{
    if(product.productId === productIdCurr){
      matchingProduct = product;
    }
  });

  const date = new Date(matchingOrder.orderTime);
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  const html = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formatted}
    </div>

    <div class="product-info">
      ${matchingItem.name}
    </div>

    <div class="product-info">
      Quantity: ${matchingProduct.quantity}
    </div>

    <img class="product-image" src="${matchingItem.image}">

    <div class="progress-labels-container">
      <div class="progress-label"  current-status>
        Preparing
      </div>
      <div class="progress-label">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;
  document.querySelector('.js-order-tracking').innerHTML = html;

  updateCartQuantity();

  function updateCartQuantity(){
    let cartQuantity = 0;

    cart.cartItems.forEach( (item)=>{
      cartQuantity += (item.quantity);
    } );

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
};