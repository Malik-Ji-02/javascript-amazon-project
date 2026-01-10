import {cart, deleteItem, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';

let cartSummaryHtml = '';

cart.forEach( (cartItem) => {
    const productId = cartItem.productId;

    let matchingItem;

    products.forEach( (product)=> {
        if(product.id === productId){
            matchingItem = product;
        }
    });

    cartSummaryHtml += `
        <div class="cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents / 100).toFixed(2)}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `;
} );

updateTopQuantity();

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-update-buttons').forEach( (button) => {
    button.addEventListener('click', ()=> {
        const productId = button.dataset.productId;
        const input = document.querySelector(`.js-update-quantity-input-${productId}`);
        const save = document.querySelector(`.js-update-quantity-save-${productId}`);
        const label = document.querySelector(`.js-quantity-label-${productId}`);

        button.classList.add('hidden');
        label.classList.add('hidden');
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
    } })
    label.innerHTML = `${products}`;
    input.classList.remove('is-editing-quantity');
    save.classList.remove('is-editing-quantity');

    updateTopQuantity();
}

document.querySelectorAll('.js-delete-item').forEach( (button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        deleteItem(productId);

        const Item = document.querySelector(`.cart-item-container-${productId}`);
        Item.remove();
        updateTopQuantity();
    })
});

function updateTopQuantity(){
    let totalItems = 0;
    cart.forEach( (item)=>{
        totalItems += (item.quantity);
        } );
    document.querySelector('.js-top-cart-items-count').innerHTML = `${totalItems} items`;
}