// pages/products/[productName].js
import { useRouter } from 'next/router'
import { ParamShopifyData } from '../../lib/shopify'
import NewFooter from "../../components/NewFooter"
import Image from 'next/image'
import AddToCart from "../../components/AddToCart";
import { formatter } from "../../utils/helpers";
import CollapsibleSection from "../../components/CollapsibleSection";
import {useEffect, useState} from "react";
import { useCart } from "../../context/CartContext";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import WorkHeader from "../../components/WorkHeader";
import Loading from "../../components/Loading";

function NextArrow(props) {
    const { onClick } = props;
    return (
        <button className="z-50 h-8 w-8 sm:h-12 sm:w-12 text-black flex items-center justify-center absolute bottom-4
                            right-4 "
                onClick={onClick}>
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
    const [numSlidesToShow, setNumSlidesToShow] = useState(1);
    useEffect(() => {
        // This function runs when the component mounts and updates.
        const handleResize = () => {
            setNumSlidesToShow(window.innerWidth >= 1655 ? 2 : 1);
        };
        window.addEventListener('resize', handleResize);

        // Call the handleResize function to set the initial value
        handleResize();

        // This function runs when the component unmounts.
        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        return <Loading/>;
    }

    const { title, description, images, priceRange, options } = product;
    const price = priceRange.minVariantPrice.amount;
    const sizeOptions = options.find(option => option.name.toLowerCase() === 'size')?.values || [];
    const sellable = product.variants.edges[0].node.availableForSale
    //console.log(sellable)
    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.edges.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.edges.length) % images.edges.length);
    };

    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-20">
                <WorkHeader />
            </div>
            <div className="h-[54px]"></div>

            <main className="flex-grow flex flex-col lg:flex-row z-10">
                <div className="flex flex-grow h-full lg:w-2/5 w-full">
                    {/* Product images */}
                    <div className="relative w-full h-full">
                        <Slider
                            afterChange={setCurrentImageIndex}
                            initialSlide={currentImageIndex}
                            nextArrow={<NextArrow />}
                            prevArrow={<PrevArrow />}
                            slidesToShow={numSlidesToShow}
                        >

                            {images.edges.map((edge, index) => (
                                <div key={index} className="relative h-full w-full">
                                    <Image
                                        src={edge.node.url}
                                        alt={edge.node.altText || "Grey Era Vintage Product"}
                                        layout="responsive" // This will maintain the aspect ratio of the image
                                        width={500}
                                        height={500}
                                        className="lg:w-full lg:object-cover lg:object-center lg:h-full  w-screen h-auto object-cover object-center"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <div className="flex-grow lg:w-1/3 h-full overflow-auto flex ">
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
                                {sizeOptions}
                            </div>
                        </div>

                        {/* Add to cart component */}
                        <div>
                            <AddToCart product={product} />

                        </div>

                        <hr className="border-3/4 border-gray-400 my-4" />

                        <CollapsibleSection title="MEASUREMENTS" content={description} />
                        <CollapsibleSection
                            title="TERMS & DETAILS"
                            content={
                            <div>
                                <p className="mb-2">
                                    SIZING IS DETERMINED BY THE GARMENT&apos;S MEASUREMENTS, NOT THE SIZE TAG.
                                </p>
                                <p className="mb-2">
                                    ALL VINTAGE AND SECONDHAND GARMENTS ARE PREOWNED AND MAY SHOW VARYING DEGREES OF WEAR. THESE DEGREES OF WEAR ARE SEEN AS FEATURES OF THE GARMENT THAT ADD TO THEIR DESIRABILITY AND MAKE EACH ITEM UNIQUE.
                                </p>
                                <p className="mb-2">
                                    PLEASE VIEW ALL PHOTOS AND MEASUREMENTS PRIOR TO PURCHASING.
                                </p>
                                <p className="mb-2">
                                    ALL SALES ARE FINAL.
                                </p>
                                <p className="mb-2">
                                    NO RETURNS, EXCHANGES, OR REFUNDS.
                                </p>
                                <p className="mb-2">
                                    VIEW OUR POLICY PAGES FOR MORE INFO.
                                </p>
                            </div>
                            }
                        />
                    </div>
                </div>
            </main>

            <div className="flex-grow"></div>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
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
                variants(first: 1) {
                    edges {
                        node {
                            id
                            availableForSale
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
