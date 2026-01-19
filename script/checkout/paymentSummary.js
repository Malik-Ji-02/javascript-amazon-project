import {cart} from '../../data/cart-class.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import {addOrder} from '../../data/orders.js';

export function renderPaymentSummary(){
    let productsPriceCents = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach((cartItem)=>{
        const matchingItem = getProduct(cartItem.productId);
        productsPriceCents += matchingItem.priceCents * cartItem.quantity;

        const product = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += product.priceCents;
    });

    const totalCentsBeforeTax = productsPriceCents + shippingPriceCents;
    const taxCents = totalCentsBeforeTax * 0.1;
    const totalCents = taxCents + totalCentsBeforeTax;

    const totalItems = cart.totalCartItems();
    
    const paymentSummaryHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-items">Items (${totalItems}):</div>
            <div class="payment-summary-money">
              $${formatCurrency(productsPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCentsBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    document.querySelector('.js-place-order').addEventListener('click', async () => {

      try{
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);

        resetCart();

      } catch (error) {
        console.log("Unexpected Error Caught: plz check ur application code!");
      }

      window.location.href = "orders.html";

    });
    function resetCart(){
      cart.cartItems = [];
      cart.saveToCart();
    }
}