import { useState } from 'react';
import ProductCard from './ProductCard';
import { useRouter } from 'next/router';
import {useFilter} from "../FilterContext";

export default function ProductList({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);

    //get array of sizes selected
    const { selectedSizes } = useFilter();

    // Filter the products by size
    const filteredProducts = initialProducts.filter(product =>
        selectedSizes.includes(product.variants.edges[0].node.title)
    );

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {filteredProducts.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}
