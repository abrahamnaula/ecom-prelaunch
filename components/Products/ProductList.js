import { useEffect } from 'react';
import ProductCard from './ProductCard';

// components/ProductList.js

export default function ProductList({ products }) {
    useEffect(() => {
        // When the component mounts, try to restore the scroll position.
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem("scrollPosition");
        }

        return () => {
            // When the component unmounts (the user navigates away), save the scroll position.
            sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
        }
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
