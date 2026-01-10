export let cart = [];

export function addToCart(productId){
  let matchingItem;

    const quantitySelectedElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantitySelected = Number(quantitySelectedElement.value);
    quantitySelectedElement.value = '1';
    
    cart.forEach( (item) => {
      if(item.productId === productId){
        matchingItem = item;
      }
    } );

    if(matchingItem){
      matchingItem.quantity += quantitySelected;
    } else {
      cart.push( {
        productId: productId,
        quantity: quantitySelected
      } );
    }
}