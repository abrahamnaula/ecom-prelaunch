// pages/products/[productName].js
import { useRouter } from 'next/router'
import { ParamShopifyData } from '../../lib/shopify'
import Header from "../../components/Header"
import NewFooter from "../../components/NewFooter"
import Image from 'next/image'
import ShopHeader from "../../components/ShopHeader";
import AddToCart from "../../components/AddToCart";
import {formatter} from "../../utils/helpers";
import CollapsibleSection from "../../components/CollapsibleSection";
import {useState} from "react";
import { useCart } from "../../context/CartContext";
import { ArrowRightIcon } from '@heroicons/react/24/outline';


export default function Product({ product }) {
    const router = useRouter();
    const { cart, addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = () => {
        addToCart(product);
    }
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const { title, description, images, priceRange, options } = product;
    //const mainImage = images.edges[0]?.node;

    const price = priceRange.minVariantPrice.amount;
    const sizeOptions = options.find(option => option.name.toLowerCase() === 'size')?.values || [];
    // Create a state for managing the current displayed image index
    // Define a handler for cycling through the images
    const handleNextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.edges.length);
    };
    const mainImage = images.edges[currentImageIndex]?.node;



    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="fixed w-full top-0 z-50">
                <Header />
                <ShopHeader/>
            </div>
            <div className="h-header-h"></div>

            <main className="flex-grow flex flex-col lg:flex-row">
                <div className="flex flex-grow lg:w-1/2 relative">
                    {/* Product image */}
                    <div className="absolute top-0 bottom-0 left-0 right-0">
                        <Image
                            src={mainImage.url}
                            alt={mainImage.altText}
                            layout="fill"
                            objectFit="cover"
                        />
                        <div className="absolute bottom-8 left-80 sm:left-100" onClick={handleNextImage}>
                            <ArrowRightIcon className="h-6 pl-20 text-black" />
                        </div>
                    </div>
                </div>
                <div className="flex-grow lg:w-1/2 h-full overflow-auto">
                    {/* Product details */}
                    <div>
                        <h1 className="text-xxs md:text-sm sm:text-sm font-medium font-nhg p-4 text-black
                                        text-transform: uppercase">{title}</h1>

                        {/* Price and size boxes */}
                        <div className="grid grid-cols-2 mb-4 px-4 ">
                            <div className="flex justify-center items-center border-3/4 border-gray-400 pr-2 p-4
                                            text-black text-xxs sm:text-sm font-medium font-nhg">
                                {formatter.format(price)}
                            </div>
                            <div className="flex justify-center items-center border-r-3/4 border-t-3/4 border-b-3/4
                                            border-gray-400 pl-2 p-4 text-black text-xxs sm:text-sm font-medium
                                            text-transform: uppercase font-nhg">
                                {sizeOptions.join(', ')}
                            </div>
                        </div>

                        {/* Add to cart component*/}
                        <div className="px-4">
                            <AddToCart onClick={handleAddToCart}/>
                        </div>

                        <div className="px-4">
                            <hr className="border-gray-400 my-4"/>
                        </div>
                        <div className="px-4">
                            <CollapsibleSection
                                title="MEASUREMENTS"
                                content={description}
                            />
                            <CollapsibleSection
                                title="TERMS & DETAILS"
                                content={`Sizing is determined by measurements not by the garment tag.
                                      Please be aware that all garments are vintage or secondhand. 
                                      Each item may show varying degrees of wear and natural distressing. 
                                      We intentionally document every available detail to insure listing accuracy. Returns or exchanges are not accepted at this time. All sales are final. Visit our terms and conditions page for additional details, including our shipping policy.`}
                            />
                            <div className="pb-8"></div>
                        </div>
                    </div>
                </div>
            </main>
            <NewFooter />
        </div>
    )
}

export async function getStaticProps(context) {
    const { productName } = context.params

    const query = ` 
          query ($handle: String!){
              productByHandle(handle: $handle) {
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
                          }
                      }
                  }
              }
          }`;


    const { data } = await ParamShopifyData(query, { handle: productName })

    if (!data || !data.productByHandle) {
        return {
            notFound: true,
        }
    }

    return {
        props: { product: data.productByHandle },
    }
}

export async function getStaticPaths() {

    const query =
        `query {
            products(first: 250) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }`;

    const { data } = await ParamShopifyData(query);

    const paths = data.products.edges.map(edge => ({
        params: { productName: edge.node.handle },
    }));

    return { paths, fallback: true };
}
