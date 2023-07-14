import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import ProductList from "../../components/Products/ProductList";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";
import {useEffect} from "react";
export default function Collection({ initialProducts, hasNextPage }) {
    const router = useRouter()
    const { selectedCategory, selectedCollection, selectedEra } = useFilter();

    // On mount and whenever filters change, update the URL.
    useEffect(() => {
        const filters = {
            selectedCategory,
            selectedCollection,
            selectedEra,
        };

        // Update the URL without refreshing the page.
        router.push({
            pathname: router.pathname,
            query: filters,
        }, undefined, { shallow: true })
            .then(() => window.scrollTo(0, 0))
            .catch((error) => console.error('An error occurred while navigating:', error));
        // Shallow navigation: don't re-fetch data or re-render on the server.
    }, [selectedCategory, selectedCollection, selectedEra, selectedSizes]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader/>
            </div>
            <div className="h-[54px]"></div>
            <main className="flex-grow">
                <ProductList initialProducts={initialProducts} hasNextPage={hasNextPage} />
            </main>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
    const { collectionName, tags } = context.query; // get tags from query params
    let query = `
    query ($title: String!, $cursor: String, $tags: String) {
      collections(first: 1, query: $title) {
        edges {
          node {
            id
            title
            handle
            products(first: 12, after: $cursor, query: $tags) {
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

    const variables = {
        title: collectionName,
        cursor: null, // I am assuming cursor is not provided for the initial load
    };

    // If tags are not empty, add it to the variables
    if (tags) {
        variables.tags = tags;
    }

    const { data } = await ParamShopifyData(query, variables);

    if (!data || !data.collections || !data.collections.edges || data.collections.edges.length === 0) {
        return {
            notFound: true,
        };
    }
    const initialProducts = data.collections.edges[0].node.products.edges.map(edge => {
        return {
            ...edge.node,
            imageUrl: edge.node.images.edges[0]?.node?.url,
        };
    });
    const hasNextPage = data.collections.edges[0].node.products.pageInfo.hasNextPage;

    return {
        props: { initialProducts, hasNextPage },
    };
}
