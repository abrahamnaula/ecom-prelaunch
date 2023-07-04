// pages/products/[productName].js
import { useRouter } from 'next/router'
import { ParamShopifyData } from '../../lib/shopify'
import Header from "../../components/Header"
import NewFooter from "../../components/NewFooter"
import Image from 'next/image'
import dynamic from 'next/dynamic'
import ShopHeader from "../../components/ShopHeader";
//const CollapsibleSection = dynamic(() => import('../../components/CollapsibleSection'), { ssr: false })
//const AddToCart = dynamic(() => import('../../components/AddToCart'), { ssr: false })


export default function Product({ product }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const { title, description, images, priceRange, options } = product;
    const mainImage = images.edges[0]?.node;
    const price = priceRange.minVariantPrice.amount;
    const sizeOptions = options.find(option => option.name.toLowerCase() === 'size')?.values || [];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="fixed w-full top-0 z-50">
                <Header />
                <ShopHeader/>
            </div>
            <div className="h-29px"></div>
            <div className="h-29px"></div>
            <div className="h-29px"></div>

            <main className="flex-grow pt-[totalHeightOfHeaders]">
                <div className="grid lg:grid-cols-2 gap-4">
                    {/* Product image */}
                    <div className="flex justify-center">
                        <Image
                            src={mainImage.url}
                            alt={mainImage.altText}
                            width={600}
                            height={600}
                            objectFit="contain"
                        />
                    </div>

                    {/* Product details */}
                    <div>
                        <h1 className="text-center text-2xl p-4 text-black">{title}</h1>

                        {/* Price and size boxes */}
                        <div className="grid grid-cols-2 gap-4 mb-4 px-4">
                            <div className="border border-gray-300 p-4">Price: {price}</div>
                            <div className="border border-gray-300 p-4">Size: {sizeOptions.join(', ')}</div>
                        </div>

                        {/* Add to cart component
                        <AddToCart />
                           */}
                        <hr className="border-gray-200 my-4"/>

                        {/* Collapsible sections
                        <CollapsibleSection title="MEASUREMENTS" content={description} />
                        <CollapsibleSection title="TERMS & DETAILS" content={`
                      Sizing is determined by measurements not by the garment tag.
                      Please be aware that all garments are vintage or secondhand. Each item may show varying degrees of wear and natural distressing. We intentionally document every available detail to insure listing accuracy. Returns or exchanges are not accepted at this time. All sales are final. Visit our terms and conditions page for additional details, including our shipping policy.
                    `} />
                     */}
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
          images(first: 5) {
              edges {
                  node {
                      url
                      altText
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
    const query = `
  query {
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
