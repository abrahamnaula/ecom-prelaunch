//Product info component
const ProductInfo = ({ title, price, size }) => (
    <div className="w-1/2">
        <h1>{title}</h1>
        <div className="flex justify-between">
            <div>{price}</div>
            <div>{size}</div>
        </div>
        <button>Add To Cart</button>
        {/* The rest of the sections go here */}
    </div>
);

export default ProductInfo;
