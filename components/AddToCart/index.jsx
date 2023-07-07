import React from 'react';
import { useCart } from "../../context/CartContext";

export default function AddToCart({ product, onClick }) {
    const { cart, addToCart } = useCart();

    const isProductInCart = cart.some(item => item.id === product.id);
    const handleAddToCart = () => {
        addToCart(product);
    };


    return (
        <button
            className={`w-full max-w-full bg-black font-nhg font-medium text-white sm:text-white text-xxs sm:text-xs px-4 py-2 uppercase mx-auto h-14 block mt-4 ${
                isProductInCart ? 'bg-gray-300 cursor-default' : ''
            }`}
            onClick={handleAddToCart}
            disabled={isProductInCart}
        >
            {isProductInCart ? 'ADDED TO CART' : 'Add to Cart'}
        </button>
    );
}
