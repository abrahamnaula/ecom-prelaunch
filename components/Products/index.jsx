function Products({ products }) {
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>{product.title}</li>
            ))}
        </ul>
    );
}
export default Products