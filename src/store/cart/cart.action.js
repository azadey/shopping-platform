import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {

    const exitingCartItems = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (exitingCartItems) {
        return cartItems.map(
            (cartItem) => cartItem.id === productToAdd.id ? 
                {...cartItem, quantity:  cartItem.quantity + 1}
                : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {

    const exitingCartItems = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if (exitingCartItems.quantity === 1) {
        return cartItems.filter(cartItem  => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map(
        (cartItem) => cartItem.id === cartItemToRemove.id ? 
            {...cartItem, quantity:  cartItem.quantity - 1}
            : cartItem
    );
};

const clearCartItem = (cartItems, cartitemToClear) => {
    return cartItems.filter(cartItem  => cartItem.id !== cartitemToClear.id);
};

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}