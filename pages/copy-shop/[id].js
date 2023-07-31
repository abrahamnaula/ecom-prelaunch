import {ParamShopifyData} from "../../lib/shopify";

export default function CopyShop() {
    const products = getShopifyProducts()
    console.log(products)
    return(
        <div className="bg-black text-white"> SUP </div>
    )
}

export async function getShopifyProducts() {
    const query = `
    query{
        collection(handle: "shop-all") {
              id
              title
              handle
              products(first: 250) {
                pageInfo {
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                    title
                    handle
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
                    createdAt
                  }
                }
              }
            }
    }
  `;

    try {
        const data = await ParamShopifyData(query);

        if (data && data.data && data.data.collection && data.data.collection.products) {
            const products = data.data.collection.products.edges.map(({ node }) => node);
            console.log("Shopify Products:", products);
            return products;
        } else {
            throw new Error("No products found in the Shopify response.");
        }
    } catch (error) {
        console.error("Error fetching Shopify products:", error);
        throw error;
    }
}





