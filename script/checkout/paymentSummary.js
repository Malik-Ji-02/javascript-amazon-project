import {cart, totalCartItems} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
    let productsPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem)=>{
        const matchingItem = getProduct(cartItem.productId);
        productsPriceCents += matchingItem.priceCents * cartItem.quantity;

        const product = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += product.priceCents;
    });

    const totalCentsBeforeTax = productsPriceCents + shippingPriceCents;
    const taxCents = totalCentsBeforeTax * 0.1;
    const totalCents = taxCents + totalCentsBeforeTax;

    const totalItems = totalCartItems();
    
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}