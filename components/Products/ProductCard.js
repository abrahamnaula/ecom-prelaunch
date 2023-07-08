// components/ProductCard.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatter } from "../../utils/helpers";

const ProductCard = React.forwardRef(({ product }, ref) => {
    const { title, handle, images, priceRange, variants } = product;
    const imageUrl = images.edges[0]?.node?.url;
    const altText = images.edges[0]?.node?.altText || "Product Image";
    const price = priceRange.minVariantPrice.amount;
    const size = variants.edges[0]?.node?.title;

    return (
        <Link href={`/products/${handle}`} passHref>
            <div ref={ref} className="flex flex-col bg-white h-full cursor-pointer border-r border-gray-800">
                <div className="relative flex-grow ">
                    <Image
                        src={imageUrl}
                        alt={altText}
                        layout="responsive"
                        width={2}
                        height={3}
                        className="object-contain border-y border-gray-800"
                    />
                </div>
                <div className="flex-grow p-1 pl-3 border-b-3/4 border-gray-800">
                    <h2 className="font-nhg font-medium text-black text-xxs sm:text-xs transform-text: uppercase">{title}</h2>
                    <p className="font-nhg font-medium text-black text-xxs sm:text-xs transform-text: uppercase">{formatter.format(price)} / {size}</p>
                </div>
            </div>
        </Link>
    );
});
ProductCard.displayName = 'ProductCard';

export default ProductCard;
