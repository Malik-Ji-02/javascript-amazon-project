import {cart, deleteItem, updateQuantity, updateDeliveryOption, totalCartItems} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {checkoutHeaderLoad} from './checkoutHeader.js';



export function renderOrderSummary(){

  checkoutHeaderLoad();

  let cartSummaryHtml = '';

  cart.forEach( (cartItem) => {
    const productId = cartItem.productId;

    const matchingItem = getProduct(productId);

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

    cartSummaryHtml += `
      <div class="cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              ${matchingItem.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-buttons" data-product-id="${matchingItem.id}">
                Update 
              </span>
              <input class="quantity-input js-update-quantity-input-${matchingItem.id} hidden">
              <span class="save-quantity-link link-primary js-update-quantity-save-${matchingItem.id} hidden">Save</span>
              <span class="delete-quantity-link link-primary js-delete-item" data-product-id="${matchingItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingItem, cartItem)}
          </div>
        </div>
      </div>
    `;
  } );

  function deliveryOptionsHtml(matchingItem, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
        ? 'checked'
        : '';

      html += `
        <div class="delivery-option js-delivery-options"
        data-product-id = "${cartItem.productId}"
        data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

  document.querySelectorAll('.js-update-buttons').forEach( (button) => {
      button.addEventListener('click', ()=> {
          const productId = button.dataset.productId;
          const input = document.querySelector(`.js-update-quantity-input-${productId}`);
          const save = document.querySelector(`.js-update-quantity-save-${productId}`);
          const label = document.querySelector(`.js-quantity-label-${productId}`);

          button.classList.add('hidden');
          label.classList.add('hidden');
          input.value = '';
          input.classList.add('is-editing-quantity');
          save.classList.add('is-editing-quantity');

          input.addEventListener('keyup', (event)=> {
              if (event.key ==='Enter'){
                  updateItems(productId,button,label,save,input);
              }
          })

          save.addEventListener('click', ()=> {
              updateItems(productId,button,label,save,input);            
          })
      } )
  } )

  function updateItems(productId,button,label,save,input){
      updateQuantity(productId, Number(input.value));

      button.classList.remove('hidden');
      label.classList.remove('hidden');
      let products;
      cart.forEach((item)=>{ if(productId === item.productId ){
          products = item.quantity;
      } });
      label.innerHTML = `${products}`;
      input.classList.remove('is-editing-quantity');
      save.classList.remove('is-editing-quantity');

      renderOrderSummary();
      renderPaymentSummary();
  }

  document.querySelectorAll('.js-delete-item').forEach( (button) => {
      button.addEventListener('click', () => {
          const productId = button.dataset.productId;

          deleteItem(productId);

          renderOrderSummary();
          renderPaymentSummary();
      })
  });

  document.querySelectorAll('.js-delivery-options').forEach((element)=>{
    element.addEventListener('click', ()=>{
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}