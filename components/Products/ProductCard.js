// components/ProductCard.js
import Image from 'next/image';

export default function ProductCard({ product }) {
    const { title, handle, images, priceRange, variants } = product;
    const imageUrl = images.edges[0]?.node?.originalSrc;
    const altText = images.edges[0]?.node?.altText || "Product Image";
    const price = priceRange.minVariantPrice.amount;
    const size = variants.edges[0]?.node?.title;

    return (
        <div className="flex flex-col bg-white p-1 h-full">
            <div className="relative flex-grow">
                <Image
                    src={imageUrl}
                    alt={altText}
                    layout="responsive"
                    width={1920}
                    height={2120}
                    className="object-contain"
                />
            </div>
            <div className="mt-1 flex-grow">
                <h2 className="font-nhg font-medium text-black text-xs">{title}</h2>
                <p className="font-nhg font-medium text-black text-xs">{price} / {size}</p>
            </div>
        </div>
    );
}
