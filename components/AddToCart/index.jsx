import React from 'react';
import { useCart } from "../../context/CartContext";
export default function AddToCart({ product, onClick }) {
    const { cart, addToCart } = useCart();
    const sellable = product.variants.edges[0].node.availableForSale;
    const isProductInCart = cart.some(item => item.id === product.id);
    const handleAddToCart = () => {
        const variantId = product.variants.edges[0].node.id;
        // console.log(variantId)
        addToCart({ variantId, ...product });
    };
    const buttonClassName = isProductInCart || !sellable ? 'bg-gray-500 cursor-default' : '';
    return (
        <button
            className={`w-full max-w-full bg-black font-nhg font-medium text-bebe text-xxs sm:text-xs px-4 py-2 uppercase mx-auto h-14 block mt-4 ${buttonClassName}`}
            onClick={handleAddToCart}
            disabled={isProductInCart || !sellable} // Disable if in cart or not sellable
        >
            {isProductInCart ? 'ADDED TO CART' : sellable ? 'Add to Cart' : 'SOLD'}
        </button>
    );
}