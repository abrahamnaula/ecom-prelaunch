// components/ProductCard.js
import Image from 'next/image';

export default function ProductCard({ product }) {
    const { title, handle, images, priceRange, variants } = product;
    const imageUrl = images.edges[0]?.node?.originalSrc;
    const altText = images.edges[0]?.node?.altText || "Product Image";
    const price = priceRange.minVariantPrice.amount;
    const size = variants.edges[0]?.node?.title;

    const aspectRatio = 1;

    return (
        <div className="border rounded-md p-4 bg-white">
            <div className="relative h-52 w-full">
                <Image
                    src={imageUrl}
                    alt={altText}
                    sizing="responsive"
                    width={10000}
                    height={10000}
                    fit="contain"
                />
            </div>
            <div className="mt-1">
                <h2 className="text-lg font-medium">{title}</h2>
                <p className="text-gray-500">{price} / {size}</p>
            </div>
        </div>
    );
}
