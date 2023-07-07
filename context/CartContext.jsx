import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartFromStorage = typeof window !== 'undefined' ? window.localStorage.getItem("cart") : null;
        if (cartFromStorage) {
            setCart(JSON.parse(cartFromStorage));
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item) => {
        const itemWithQuantity = {...item, quantity: 1}; // Add a quantity property to each item
        setCart((prevCart) => {
            const updatedCart = [...prevCart, itemWithQuantity];
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

    const calculateSubtotal = () => {
        let subtotal = 0;
        cart.forEach(item => {
            const itemPrice = parseFloat(item.priceRange.minVariantPrice.amount);
            if (!isNaN(itemPrice)) {
                subtotal += itemPrice * item.quantity;
            } else {
                console.error("Invalid item found in cart", item);
            }
        });
        console.log('Calculated subtotal:', subtotal);
        return subtotal;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, calculateSubtotal }}>
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
