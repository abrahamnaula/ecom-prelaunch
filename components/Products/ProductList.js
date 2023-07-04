import ProductCard from './ProductCard';

// components/ProductList.js

export default function ProductList({ products }) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
