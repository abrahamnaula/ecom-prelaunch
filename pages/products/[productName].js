// pages/products/[productName].js
import { useRouter } from 'next/router'
import {ParamShopifyData } from '../../lib/shopify'
import Header from "../../components/Header";
import NewFooter from "../../components/NewFooter";
import ShopHeader from "../../components/ShopHeader";

export default function Product({ product }) {
    const router = useRouter()
    const { productName } = router.query

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="fixed w-full top-0 z-50">
                <Header />
                <ShopHeader/>
            </div>
            <div className="h-29px"></div>
            <main className="flex-grow pt-[totalHeightOfHeaders]">
                <h1 className="text-center text-2xl p-4 text-black">{product.title}</h1>
                {/* Place for product details */}
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

      }
    }
  `

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
    return { paths: [], fallback: true }
}
