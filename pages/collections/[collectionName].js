// pages/collections/[collectionName].js
import { useRouter } from 'next/router'
import {ParamShopifyData } from '../../lib/shopify'
import ShopHeader from "../../components/ShopHeader";
import Header from "../../components/Header";
import NewFooter from "../../components/NewFooter";

export default function Collection({ products }) {
    const router = useRouter()
    const { collectionName } = router.query

    if(router.isFallback) {
        return <div>Loading...</div> // You can replace this with a loading spinner or related component
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed w-full top-0 z-50 bg-white">
                <Header/>
                <ShopHeader/>
            </div>

            <main className="bg-black text-white flex-grow pt-[totalHeightOfHeaders]">
                <div className="h-29px"></div>
                <div className="h-29px"></div>
                <div className="h-29px"></div>

                <h1>{collectionName}</h1>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.title}</li>
                    ))}
                </ul>
            </main>

            <NewFooter/>
        </div>
    )



}

export async function getStaticProps(context) {
    const { collectionName } = context.params

    const query = `
    query ($title: String!){
      collections(first: 1, query: $title) {
        edges {
          node {
            id
            title
            handle
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  `

    const { data } = await ParamShopifyData(query, { title: collectionName })

    if (!data || !data.collections || !data.collections.edges || data.collections.edges.length === 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: { products: data.collections.edges[0].node.products.edges.map(edge => edge.node) },
    }
}

export async function getStaticPaths() {
    // Here we are fetching all possible paths for the collections
    const query = `
        query {
            collections(first: 100) {
                edges {
                    node {
                        handle
                    }
                }
            }
        }
    `

    const { data } = await ParamShopifyData(query)

    console.log(data) // Add this line to log the returned data

    if (!data || !data.collections || !data.collections.edges || data.collections.edges.length === 0) {
        console.error('No data returned from Shopify API')
        return { paths: [], fallback: true }
    }

    const paths = data.collections.edges.map((edge) => ({
        params: { collectionName: edge.node.handle },
    }))

    // We'll pre-render only these paths at build time.
    return { paths, fallback: true }
}

