import '../styles/globals.css'
import '../styles/animations.css'
import React, {useEffect} from "react";
import { CartProvider } from "../context/CartContext";
import {FilterProvider} from "../components/FilterContext";
import {ProductsProvider} from "../context/ProductsContext";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        function setVhVariable() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVhVariable();
        window.addEventListener('resize', setVhVariable);

        return () => {
            window.removeEventListener('resize', setVhVariable);
        };
    }, []);
    return (
        <ProductsProvider initialProductsFromServer={pageProps.initialProducts}>
            <CartProvider>
                <FilterProvider>
                    <Component {...pageProps} />
                </FilterProvider>
            </CartProvider>
        </ProductsProvider>
    );
}

