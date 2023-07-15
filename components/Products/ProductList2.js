// ProductList.js
import { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductList2({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);

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
