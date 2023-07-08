// pages/products/[productName].js
import { useRouter } from 'next/router'
import { ParamShopifyData } from '../../lib/shopify'
import Header from "../../components/Header"
import NewFooter from "../../components/NewFooter"
import Image from 'next/image'
import ShopHeader from "../../components/ShopHeader";
import AddToCart from "../../components/AddToCart";
import { formatter } from "../../utils/helpers";
import CollapsibleSection from "../../components/CollapsibleSection";
import {useEffect, useState} from "react";
import { useCart } from "../../context/CartContext";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function NextArrow(props) {
    const { onClick } = props;
    return (
        <button className="z-50 h-8 w-8 sm:h-12 sm:w-12 text-black flex items-center justify-center absolute bottom-4 right-4 3xl:right-20" onClick={onClick}>
            <ArrowRightIcon className="h-12 w-5 sm:h-7 sm:w-7" />
        </button>
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button className="z-50 h-8 w-8 sm:h-12 sm:w-12 text-black flex items-center justify-center absolute bottom-4 left-4 3xl:left-9" onClick={onClick}>
            <ArrowLeftIcon className="h-12 w-5 sm:h-7 sm:w-7" />
        </button>
    );
}

export default function Product({ product }) {
    const router = useRouter();
    const { cart, addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = () => {
        addToCart(product);
    }
    useEffect(() => {
        // This function runs when the component unmounts.
        return () => {
            // Save scroll position in window.history.state.
            if (window && window.history && window.history.replaceState) {
                const scroll = [window.scrollX || 0, window.scrollY || 0];
                const state = { ...window.history.state, scroll };
                window.history.replaceState(state, '', document.location.href);
            }
        };
    }, []);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const { title, description, images, priceRange, options } = product;
    const price = priceRange.minVariantPrice.amount;
    const sizeOptions = options.find(option => option.name.toLowerCase() === 'size')?.values || [];

    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.edges.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.edges.length) % images.edges.length);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="fixed w-full top-0 z-50">
                <Header />
                <ShopHeader />
            </div>
            <div className="h-header-h"></div>

            <main className="flex-grow flex flex-col lg:flex-row z-10">
                <div className="flex flex-grow 3xl:h-full lg:w-24">
                    {/* Product images */}
                    <div className="relative w-full h-full">
                        <Slider
                            afterChange={setCurrentImageIndex}
                            initialSlide={currentImageIndex}
                            nextArrow={<NextArrow />}
                            prevArrow={<PrevArrow />}
                        >
                            {images.edges.map((edge, index) => (
                                <div key={index} className="relative h-full w-full ">
                                    <Image
                                        src={edge.node.url}
                                        alt={edge.node.altText}
                                        width={600}
                                        height={600}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="flex-grow lg:w-1/3  3xl:w-350 h-full overflow-auto flex ">
                    {/* Product details */}
                    <div className="flex-grow sm:px-4 3xl:px-0">
                        <h1 className="text-xxs md:text-sm sm:text-sm font-medium font-nhg py-4 pl-2 sm:p-4 text-black uppercase">
                            {title}
                        </h1>

                        {/* Price and size boxes */}
                        <div className="grid grid-cols-2 mb-4">
                            <div className="flex justify-center items-center border-3/4 border-gray-400 pr-2 p-4 text-black text-xxs sm:text-sm font-medium font-nhg">
                                {formatter.format(price)}
                            </div>
                            <div className="flex justify-center items-center border-r-3/4 border-t-3/4 border-b-3/4 border-gray-400 pl-2 p-4 text-black text-xxs sm:text-sm font-medium uppercase font-nhg">
                                {sizeOptions.join(", ")}
                            </div>
                        </div>

                        {/* Add to cart component */}
                        <div>
                            <AddToCart product={product} />

                        </div>

                        <hr className="border-gray-400 my-4" />

                        <CollapsibleSection title="MEASUREMENTS" content={description} />
                        <CollapsibleSection
                            title="TERMS & DETAILS"
                            content="Sizing is determined by measurements not by the garment tag. Please be aware that all garments are vintage or secondhand. Each item may show varying degrees of wear and natural distressing. We intentionally document every available detail to ensure listing accuracy. Returns or exchanges are not accepted at this time. All sales are final. Visit our terms and conditions page for additional details, including our shipping policy."
                        />
                    </div>
                </div>
            </main>

            <div className="flex-grow"></div>
            <NewFooter />
        </div>
    );
}

export async function getStaticProps(context) {
    const { productName } = context.params;

    const query = `
        query ($handle: String!) {
            product(handle: $handle) {
                id
                title
                handle
                description
                priceRange {
                    minVariantPrice {
                        amount
                    }
                }
                options {
                    name
                    values
                }
                images(first: 10) {
                    edges {
                        node {
                            url
                            altText
                        }
                    }
                }
                variants(first: 10) {
                    edges {
                        node {
                            id
                            quantityAvailable
                        }
                    }
                }
            }
        }
    `;

    const { data } = await ParamShopifyData(query, { handle: productName });

    if (!data || !data.product) {
        return {
            notFound: true,
        };
    }

    return {
        props: { product: data.product },
    };
}

export async function getStaticPaths() {
    const query = `
        query {
            products(first: 250) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }
    `;

    const { data } = await ParamShopifyData(query);

    const paths = data.products.edges.map(edge => ({
        params: { productName: edge.node.handle },
    }));

    return { paths, fallback: true };
}
