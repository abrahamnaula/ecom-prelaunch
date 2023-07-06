import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Load cart from local storage when component mounts
        const cartFromStorage = typeof window !== 'undefined' ? window.localStorage.getItem("cart") : null;
        if (cartFromStorage) {
            setCart(JSON.parse(cartFromStorage));
        }
    }, []);

    useEffect(() => {
        // Save cart to local storage whenever it changes
        if (typeof window !== 'undefined') {
            window.localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, item];
            console.log('Cart after adding item:', updatedCart);
            return updatedCart;
        });
    };


    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
