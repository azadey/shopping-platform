import { createContext, useState, useEffect } from "react";


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

export const CartContext = createContext({
    isCartOpen: false,
    setisCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0 );
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0 );
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
};