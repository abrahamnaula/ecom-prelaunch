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
        <div className="p-1 bg-white">
            <div className="relative h-56 w-full">
                <Image
                    src={imageUrl}
                    alt={altText}
                    sizing="responsive"
                    width={1920}
                    height={2120}
                    fit="contain"
                />
            </div>
            <div className="mt-1">
                <h2 className="font-nhg font-medium text-black text-xs">{title}</h2>
                <p className="font-nhg font-medium text-black text-xs">{price} / {size}</p>
            </div>
        </div>
    );
}
