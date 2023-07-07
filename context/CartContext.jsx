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
        const itemWithQuantity = { ...item, quantity: 1 }; // Add a quantity property to each item

        // Extract the variant ID from the item object
        const variantId = item.variantId;
        if (!variantId) {
            console.error("Variant ID not found in item", item);
            return;
        }

        // Check if the item with the same variant ID already exists in the cart
        const existingItem = cart.find((item) => item.variantId === variantId);
        if (existingItem) {
            // If the item already exists, update its quantity
            const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
            const updatedCart = cart.map((item) => (item.variantId === variantId ? updatedItem : item));
            setCart(updatedCart);
        } else {
            // If the item doesn't exist, add it to the cart
            setCart((prevCart) => [...prevCart, itemWithQuantity]);
        }
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
