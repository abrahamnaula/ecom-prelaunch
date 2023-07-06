// components/ProductCard.js
import Link from 'next/link';
import Image from 'next/image';
import {formatter} from "../../utils/helpers";
// components/ProductCard.js

export default function ProductCard({ product }) {
    const { title, handle, images, priceRange, variants } = product;
    const imageUrl = images.edges[0]?.node?.originalSrc;
    const altText = images.edges[0]?.node?.altText || "Product Image";
    const price = priceRange.minVariantPrice.amount;
    const size = variants.edges[0]?.node?.title;

    return (
        <Link href={`/products/${handle}`} passHref>
            <div className="flex flex-col bg-white h-full cursor-pointer border-r border-gray-800">
                <div className="relative flex-grow ">
                    <Image
                        src={imageUrl}
                        alt={altText}
                        layout="responsive"
                        width={2250}
                        height={3000}
                        className="object-contain border-y border-gray-800"
                    />
                </div>
                <div className="flex-grow p-3 border-b-3/4 border-gray-800">
                    <h2 className="font-nhg font-medium text-black text-xxs sm:text-xs pl-4
                                   transform-text: uppercase">{title}</h2>
                    <p className="font-nhg font-medium text-black text-xxs sm:text-xs pl-4
                                   transform-text: uppercase">{formatter.format(price)} / {size}</p>
                </div>
            </div>
        </Link>
    );
}

