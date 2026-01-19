import {cart} from '../../data/cart-class.js';

export function checkoutHeaderLoad(){
    const totalItems = cart.totalCartItems();
    const headerHtml = `Checkout (<a class="return-to-home-link js-top-cart-items-count"
        href="index.html">${totalItems} items</a>)`;

    document.querySelector('.js-checkout-header').innerHTML = headerHtml;
}
