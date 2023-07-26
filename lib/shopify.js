import axios from 'axios'
import * as queries from './queries'
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN
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
    const URL = `https://${domain}/api/2023-07/graphql.json`;

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