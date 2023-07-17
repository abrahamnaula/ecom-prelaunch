import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useFilter } from "../FilterContext";

function ProductList2({ initialProducts, formattedFilters }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Filter the initial products based on the formatted filters
        const filteredProducts = initialProducts.filter(product => {
            // Check if the product's size or tags match any filter in the formatted filters
            return (
                formattedFilters.some(filter => product.tags.includes(filter)) ||
                formattedFilters.includes(product.size)
            );
        });

        // Update the products state with the filtered products
        setProducts(filteredProducts);
    }, [initialProducts, formattedFilters]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductList2;
/*

 */