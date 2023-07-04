// Importing the Image component
import Image from 'next/image';

// ProductImage Component
const ProductImage = ({ imgSrc }) => (
    <div className="w-1/2 relative">
        <Image
            src={imgSrc}
            alt="Product"
            layout="fill"
            objectFit="contain"
        />
    </div>
);
export default ProductImage