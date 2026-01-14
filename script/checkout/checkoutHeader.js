import {totalCartItems} from '../../data/cart.js';

export function checkoutHeaderLoad(){
    const totalItems = totalCartItems();
    const headerHtml = `Checkout (<a class="return-to-home-link js-top-cart-items-count"
        href="amazon.html">${totalItems} items</a>)`;

    document.querySelector('.js-checkout-header').innerHTML = headerHtml;
}
