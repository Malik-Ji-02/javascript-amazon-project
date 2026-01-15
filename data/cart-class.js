class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
        const storedCart = localStorage.getItem(this.#localStorageKey);

        if (storedCart){
            this.cartItems = JSON.parse(storedCart);
        } else {
            this.cartItems = [
                {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
                },
                {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
                }
            ];
        }
    }

    saveToCart(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        let matchingItem;

        const quantitySelectedElement = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantitySelected = (quantitySelectedElement)
        ? this.getQuantity(quantitySelectedElement)
        : 1;
        
        this.cartItems.forEach( (item) => {
            if(item.productId === productId){
                matchingItem = item;
            }
        } );

        if(matchingItem){
            matchingItem.quantity += quantitySelected;
        } else {
            this.cartItems.push( {
                productId: productId,
                quantity: quantitySelected,
                deliveryOptionId: '1'
            } );
        }
        this.saveToCart();
    }

    getQuantity(quantitySelectedElement){
        const quantitySelected = Number(quantitySelectedElement.value);
        quantitySelectedElement.value = '1';
        return quantitySelected;
    }

    deleteItem(productId){
        let newCart = [];
        this.cartItems.forEach((cartItem)=>{
            if (productId !== cartItem.productId){
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToCart();
    }

    updateQuantity(productId, newQuantity){
        if (newQuantity !== 0){
            this.cartItems.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                cartItem.quantity = newQuantity;
            }
            });
            this.saveToCart();
        }
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((Item)=>{
            if(Item.productId === productId){
            matchingItem = Item;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToCart();
    }

    totalCartItems(){
        let totalItems = 0;
        this.cartItems.forEach( (item)=> {
            totalItems += (item.quantity);
        } );
        return totalItems;
    }
}

 export const cart = new Cart('cart');