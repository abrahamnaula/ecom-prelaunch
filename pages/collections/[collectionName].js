// pages/collections/[collectionName].js
import { useRouter } from 'next/router'
import { ParamShopifyData } from '../../lib/shopify'
import ShopHeader from "../../components/ShopHeader";
import Header from "../../components/Header";
import NewFooter from "../../components/NewFooter";
import ProductList from "../../components/Products/ProductList";
import {useEffect} from "react";

export default function Collection({ initialProducts, hasNextPage }) {
    const router = useRouter()
    useEffect(() => {
        // Get the scroll position from local storage and set it
        const scrollPos = localStorage.getItem(`${router.route}_scroll_position`);
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
        }

        // Function to run when component unmounts
        return () => {
            // Set the scroll position in local storage
            localStorage.setItem(`${router.route}_scroll_position`, window.scrollY.toString());
        };
    }, []); // Empty dependency array so it only runs on mount and unmount


    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="fixed w-full top-0 z-50">
                <Header />
                <ShopHeader />
            </div>
            <div className="h-header-h"></div>
            <main className="flex-grow ">
                <ProductList initialProducts={initialProducts} hasNextPage={hasNextPage} />
            </main>
            <NewFooter />
        </div>
    );
}

export async function getStaticProps(context) {
    const { collectionName } = context.params;
    const query = `
query ($title: String!, $cursor: String) {
  collections(first: 1, query: $title) {
    edges {
      node {
        id
        title
        handle
        products(first: 12, after: $cursor) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    altText
                    url
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
    const { data } = await ParamShopifyData(query, { title: collectionName })
    if (!data || !data.collections || !data.collections.edges || data.collections.edges.length === 0) {
        return {
            notFound: true,
        }
    }
    const initialProducts = data.collections.edges[0].node.products.edges.map(edge => {
        return {
            ...edge.node,
            imageUrl: edge.node.images.edges[0]?.node?.url
        };
    });
    const hasNextPage = data.collections.edges[0].node.products.pageInfo.hasNextPage;
    return {
        props: { initialProducts, hasNextPage },
    }
}

export async function getStaticPaths() {
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
