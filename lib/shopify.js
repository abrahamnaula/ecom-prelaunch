import axios from 'axios'
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
export async function ShopifyData(query){
    const URL = `https://${domain}/api/2023-07/graphql.json`

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
    // Filter out variables with null or undefined values
    const validVariables = Object.fromEntries(Object.entries(variables).filter(([key, value]) => value != null));

    const URL = `https://${domain}/api/2023-07/graphql.json`;

    const options = {
        method: "POST",
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: validVariables }),
    };

    try {
        //console.log("ParamShopifyData query:", query);
        //console.log("ParamShopifyData variables:", validVariables);
        const response = await fetch(URL, options);
        //console.log("ParamShopifyData response:", response);
        const data = await response.json();
        //console.log("ParamShopifyData data:", data);

        if (!response.ok) {
            throw new Error(`GraphQL request failed with status ${response.status}`);
        }

        if (data.errors) {
            console.log(data.errors[0].message)
            throw new Error(data.errors[0].message);
        }

        return data;
    } catch (error) {
        console.error("GraphQL request error:", error);
        throw error;
    }
}

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
//REST API
export const getProductsCount = async () => {
    try {
        const response = await axios.get(`https://${domain}/admin/api/2023-07/products/count.json`, {
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
            },
        });

        return response.data.count;
    } catch (error) {
        console.error(`Error getting product count: ${error}`);
    }
};

export async function getCollectionId(handle) {
    try {
        const query = `
            {
                collection(handle: "${handle}") {
                    id
                }
            }
        `;

        const res = await ShopifyData(query);

        // If there's an error in the response, throw it
        if (res.errors) {
            throw new Error(res.errors[0].message);
        }

        // If there's no collection with the given handle, throw an error
        if (!res.data.collection) {
            throw new Error(`No collection found with handle "${handle}"`);
        }

        // Get the collection id
        const fullCollId = res.data.collection.id;
        const collectionId = fullCollId.replace("gid://shopify/Collection/","")

        return collectionId;

    } catch (error) {
        console.error(`Error fetching collection ID for handle "${handle}": `, error);
        throw error; // You may want to handle this error in a different way, depending on your application
    }
}

export const getCollectionProductCount = async (collectionId) => {
    try {
        const response = await axios.get(`https://${domain}/admin/api/2023-07/products/count.json?collection_id=${collectionId}`, {
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
            },
        });

        return response.data.count;
    } catch (error) {
        console.error(`Error getting product count for collection ${collectionId}: ${error}`);
    }
};

export async function getCollectionCursors(handle) {
    let cursors = [];
    let hasNextPage = true;
    let lastCursor = null;

    while(hasNextPage) {
        const query = `
            {
                collection(handle: "${handle}") {
                    products(first: 200, after: ${lastCursor ? `"${lastCursor}"` : null}) {
                        pageInfo {
                            hasNextPage
                        }
                        edges {
                            cursor
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

        // If there's no collection with the given handle, throw an error
        if (!res.data.collection) {
            throw new Error(`No collection found with handle "${handle}"`);
        }

        // Get the last cursor from the edges and add to the list
        const edges = res.data.collection.products.edges;
        lastCursor = edges[edges.length - 1].cursor;
        cursors.push(lastCursor);

        hasNextPage = res.data.collection.products.pageInfo.hasNextPage;
    }

    return cursors;
}

export async function getSearchCursors(queryString, max) {
    let cursors = [];
    let hasNextPage = true;
    let lastCursor = null;

    while (hasNextPage) {
        const query = `
            query ($query: String!, $first: Int!, $cursor: String) {
                products(query: $query, first: $first, after: $cursor) {
                    pageInfo {
                        hasNextPage
                    }
                    edges {
                        cursor
                    }
                }
            }
        `;

        const variables = {
            query: queryString,
            first: max,
            cursor: lastCursor
        };

        const res = await ParamShopifyData(query, variables);

        // If there's an error in the response, throw it
        if (res.errors) {
            throw new Error(res.errors[0].message);
        }

        // Get the last cursor from the edges and add it to the list
        const edges = res.data.products.edges;
        lastCursor = edges[edges.length - 1].cursor;
        cursors.push(lastCursor);

        hasNextPage = res.data.products.pageInfo.hasNextPage;
    }

    // Remove the unnecessary cursor at the end. No pages after that cursor.
    cursors.pop();
    // Add null value to the beginning. The first page uses null for the first fetch.
    cursors.unshift(null);

    return cursors;
}

