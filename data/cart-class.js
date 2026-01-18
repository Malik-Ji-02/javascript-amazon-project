//// Cart class is declared but see its not exported we will make a object with the help
//// of this class and then export it --------------------------------------------------
class Cart {
    //! Here the cartItem is the main cart Object --------------------------------------
    cartItems;
    #localStorageKey;

    //todo Here constructor are declared -----------------------------------------------
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    //? This funciton is made to Load the data from the storage ------------------------
    loadFromStorage(){
        const storedCart = localStorage.getItem(this.#localStorageKey);

        if (storedCart){
            this.cartItems = JSON.parse(storedCart);
        } else {
            this.cartItems = [ //* These are the starting items present in the cart ----
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

    //? This function is made to Save the cart to the local Storage --------------------
    saveToCart(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    //? This function is made to add the products to the cart --------------------------
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

    //? This funciton is to gives the quantity of items selected during the adding of items in the beggning.
    getQuantity(quantitySelectedElement){
        const quantitySelected = Number(quantitySelectedElement.value);
        quantitySelectedElement.value = '1';
        return quantitySelected;
    }

    //? This funciton is used to delete any item form the cart -------------------------
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

    //? This is used with the update button which update the quantity of a specific product.
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

    //? This updates the delivery date of the product ----------------------------------
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

    //? This function calculates the total items present in the cart by adding their Quantity.
    totalCartItems(){
        let totalItems = 0;
        this.cartItems.forEach( (item)=> {
            totalItems += (item.quantity);
        } );
        return totalItems;
    }
}


export const cart = new Cart('cart'); //? Cart created from the cart class and it is exported.