import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import ProductList from "../../components/Products/ProductList";
import WorkHeader from "../../components/WorkHeader";

export default function Collection({ initialProducts }) {
    const router = useRouter();

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
                <ProductList initialProducts={initialProducts} />
            </main>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
    console.log("getServerSideProps context: ", context); // will log the entire context object

    const collectionName = context.params.collectionName;
    console.log("collectionName: ", collectionName); // will log the collectionName

    const tags = `tag:${collectionName}`;
    const query = `
        query ($tags: String!) {
          products(first: 10, query: $tags) {
            edges {
              node {
                id
                title
                tags
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
    `;

    const variables = {
        tags,
    };

    console.log("GraphQL query variables: ", variables); // will log the variables for the GraphQL query

    const data = await ParamShopifyData(query, variables);
    console.log("Data received from Shopify: ", data); // will log the data received from Shopify

    if (!data || !data.products || !data.products.edges || data.products.edges.length === 0) {
        return {
            notFound: true,
        };
    }

    const initialProducts = data.products.edges.map(edge => {
        return {
            ...edge.node,
            imageUrl: edge.node.images.edges[0]?.node?.url,
        };
    });

    console.log("Initial products: ", initialProducts); // will log the initialProducts array

    return {
        props: { initialProducts },
    };
}
