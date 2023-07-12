import React from 'react';
import { useCart } from "../../context/CartContext";
import { createCheckout } from "../../lib/shopify";

export default function CheckoutButton() {
    const { cart, clearCart } = useCart();

    const handleCheckout = async (event) => {
        if (cart.length === 0) {
            event.preventDefault();  // Prevent navigation if cart is empty
            return;
        }

        // Create an array of line items based on the products in the cart
        const lineItems = cart.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
        }));

        try {
            // Create a checkout on Shopify and get the checkout URL
            const checkout = await createCheckout(lineItems);

            // Redirect the user to the Shopify provided checkout page
            window.location.href = checkout.webUrl;

            // Move the cart clearing logic to a callback function that is triggered after successful checkout
            const handleSuccessfulCheckout = () => {
                // Clear the cart after successful checkout
                clearCart();
            };

            // Add an event listener to the window object to detect when the checkout is completed
            window.addEventListener('shopify:checkout_complete', handleSuccessfulCheckout);
        } catch (error) {
            console.error('Checkout error:', error);
            // Handle any errors that occur during the checkout process
        }
    };
    return (
        <a
            href="#"
            className="flex items-center justify-center border border-transparent bg-black px-6 py-3
                        text-base font-medium text-bebe shadow-sm hover:bg-gray-800"
            onClick={handleCheckout}
        >
            CHECKOUT
        </a>
    );
}
