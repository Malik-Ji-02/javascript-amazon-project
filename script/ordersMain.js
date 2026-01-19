import {orders} from '../data/orders.js';
import { loadProductsFetch, products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { cart } from '../data/cart-class.js';

loadProducts();

async function loadProducts(){
  try{
    await loadProductsFetch();
  } catch(error){
    console.log('Unexpected error. Please Try again after some time...!')
  }
  loadOrdersHtml();
}

let ordersHtml = '';

function loadOrdersHtml(){
  orders.forEach( (order) => {
    const date = new Date(order.orderTime);
    const formatted = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric"
    });

    ordersHtml += `
      <div class="order-container">
            
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formatted}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${loadProductsHtml(order)}
        </div>
      </div>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHtml;

  function loadProductsHtml(order){
    
    let html = '';

    order.products.forEach((product)=> {
    
      let matchingItem = {};
    
      products.forEach( (productExt)=> {
          if(productExt.id === product.productId){
              matchingItem = productExt;
          }
      });

      const deliveryDate = new Date(product.estimatedDeliveryTime);
      const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric"
      });
      
      html += `
        <div class="product-image-container">
          <img src="${matchingItem.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formattedDelivery}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
      
    });
    return html;
  }
  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click',()=>{
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      updateCartQuantity();
    });
  });

  function updateCartQuantity(){
    let cartQuantity = 0;

    cart.cartItems.forEach( (item)=>{
      cartQuantity += (item.quantity);
    } );

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
}