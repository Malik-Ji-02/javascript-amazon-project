import {cart} from '../../data/cart-class.js';

describe('Test suit: addToCart', () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    it('adds and existing product to the cart.', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);
        });
        cart.loadFromStorage();

        cart.addToCart(productId1);

        expect(cart.cartItems.length).toEqual(1);

        expect(cart.cartItems[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart.', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromStorage();

        cart.addToCart(productId1);

        expect(cart.cartItems.length).toEqual(1);

        expect(cart.cartItems[0].productId).toEqual(productId1);
    });
});