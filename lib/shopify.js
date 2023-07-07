import * as queries from './queries'
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

export async function ShopifyData(query){
    const URL = `https://${domain}/api/2023-04/graphql.json`

    const options = {
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({query})
    }

    try{
        const data = await fetch(URL, options).then(response => {
            return response.json()
        })
        return data
    }catch (error){
        throw new Error('Index not fetched: on async ShopifyData()')
    }
}
export async function createCheckout(lineItems) {
    const mutation = `
    mutation($lineItems: [CheckoutLineItemInput!]!) {
      checkoutCreate(input: { lineItems: $lineItems }) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

    // Prepare line items with variant IDs
    const formattedLineItems = lineItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
    }));

    const variables = { lineItems: formattedLineItems };

    try {
        const response = await ParamShopifyData(mutation, variables);
        if (response.errors || !response.data.checkoutCreate.checkout) {
            throw new Error('Failed to create checkout');
        }

        return response.data.checkoutCreate.checkout;
    } catch (error) {
        console.error('Create checkout error:', error);
        throw error;
    }
}

export async function ParamShopifyData(query, variables = {}) {
    const URL = `https://${domain}/api/2023-04/graphql.json`;

    const options = {
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
    };

    try {
        const response = await fetch(URL, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`GraphQL request failed with status ${response.status}`);
        }

        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

        return data;
    } catch (error) {
        console.error("GraphQL request error:", error);
        throw error;
    }
}

export async function fetchAllCollections() {
    const response = await ShopifyData(queries.allCollections);

    if (response.errors) {
        throw new Error('Failed to fetch all collections');
    }

    const collectionsData = response.data.collections.edges.map(edge => edge.node);

    return collectionsData;
}
export async function fetchProductsFromCollection(collectionHandle, cursor) {
    const query = queries.collectionProducts;
    const variables = { collectionHandle, cursor };

    const response = await ShopifyData(query, variables);

    if (!response.data) {
        console.error('Error fetching products from collection:', response);
        return;
    }

    const productsData = response.data.collectionByHandle.products;
    if (!productsData) {
        console.error('Error: collectionByHandle is undefined. The collectionHandle might be incorrect:', collectionHandle);
        return;
    }

    const products = productsData.edges.map(edge => edge.node);
    const hasNextPage = productsData.pageInfo.hasNextPage;
    const lastCursor = productsData.edges[productsData.edges.length - 1].cursor;

    return { products, hasNextPage, lastCursor };
};
export async function fetchCollections() {
    try {
        const query = `
            {
                collections(first: 30, query: "tag:menu") {
                    edges {
                        node {
                            title
                            image {
                                url
                            }
                        }
                    }
                }
            }
        `;

        const res = await ShopifyData(query);

        // If there's an error in the response, throw it
        if (res.errors) {
            throw new Error(res.errors[0].message);
        }

        // Filter out collections that don't have an image
        const collections = res.data.collections.edges
            .filter(edge => edge.node.image !== null)
            .map(edge => edge.node);

        return collections;

    } catch (error) {
        console.error("Error fetching collections: ", error);
        throw error; // You may want to handle this error in a different way, depending on your application
    }
}
export async function getProductsInCollection(){
    const query =
        `{
              products(first: 250, query:"tag:'y2k'") {
                edges {
                  node {
                    id
                    handle
                    title        
                    priceRange{
                      minVariantPrice{
                        amount
                      }
                    }
                    tags
                    images(first: 5){
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
        }`
    const response = await ShopifyData(query)

    const allProducts = response.data.products.edges ? response.data.products.edges : []
    return allProducts
}
/*
export async function createCheckout(id, quantity) {
    const query= `
    
        mutation {
          checkoutCreate(input: 
            {lineItems: [{ variantId: ${id}, quantity: ${quantity} }]}) {
            checkout {
              id
              webUrl
            }
            checkoutUserErrors {
              code
              field
              message
            }
          }
        }`
    const response = await ShopifyData(query)
    const checkout = response.data.createCheckout.checkout ? response.data.createCheckout.checkout : []
    return checkout
}

 */
/*
//Grab collections to display on Collection Menu
{
  collections(first: 15) {
    edges {
      node {
        id
        title
        description
        image {
          url
        }
      }
    }
  }
}


*/


/*
//Return products from a collection
{
  node(id: "Collection_ID") {
    ... on Collection {
      id
      title
      products(first: 10) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}

 */