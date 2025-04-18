import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'cart';
const EMPTY_CART = { 
    items: [], 
    totalPrice: 0, 
    totalCount: 0,
};

export default function CartProvider({children}) {
    const initCart = getCartFromLocalStorage();
    const [cartItems, setCartItems] = useState(initCart.items);
    const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
    const [totalCount, setTotalCount] = useState(initCart.totalCount);

    useEffect(() => {
        const totalPrice = sum(cartItems.map(item => item.price));
        const totalCount = sum(cartItems.map(item => item.quantity));
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);

        localStorage.setItem(
            CART_KEY, 
            JSON.stringify({
                items: cartItems, 
                totalPrice, 
                totalCount,
            })
        );
    }, [cartItems]);

    const addToCart = book => {
        const cartItem = cartItems.find(item => item.book.id === book.id);
        if (cartItem) {
            changeQuantity(cartItem, cartItem.quantity + 1);
        } else {
            setCartItems([
                ...cartItems,
                {
                    book,
                    quantity: 1,
                    price: book.price
                }
            ]);
        }
    }

    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
    }

    const sum = items => {
        return items.reduce((preValue, curValue) => preValue + curValue, 0);
    }

    const removeFromCart = bookId => {
        const filteredCartItems = cartItems.filter(item => item.book.id !== bookId);
        setCartItems(filteredCartItems); 
    };

    const changeQuantity = (cartItem, newQuantity) => {
        const {book} = cartItem;

        const changedCartItem = {
            ...cartItem,
            quantity: newQuantity,
            price: book.price * newQuantity
        };

        setCartItems(
            cartItems.map(item => (item.book.id === book.id ? changedCartItem : item))
        )
    }

    const clearCart = () => {
        localStorage.removeItem(CART_KEY);
        const { items, totalPrice, totalCount } = EMPTY_CART;
        setCartItems(items);
        setTotalPrice(totalPrice);
        setTotalCount(totalCount);
    }

    return (<CartContext.Provider 
        value={{
            cart:{items:cartItems, totalPrice, totalCount},
            removeFromCart,
            changeQuantity,
            addToCart,
            clearCart,
        }}
    >
        {children}
    </CartContext.Provider>);
}

export const useCart = () => useContext(CartContext);