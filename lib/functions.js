import {ParamShopifyData} from "./shopify";

export default async function fetchProducts( tags) {
    const query = `
  query getProducts($tags: String!) {
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

    const { data } = await ParamShopifyData(query, {
        tags: tags,
    });

    let initialProducts = null;
    let productsAvailable = true;

    if (!data || !data.products || !data.products.edges || data.products.edges.length === 0) {
        productsAvailable = false;
    } else {
        initialProducts = data.products.edges.map(edge => {
            return {
                ...edge.node,
                imageUrl: edge.node.images.edges[0]?.node?.url
            };
        });
    }

    return {
        initialProducts,
        productsAvailable,
    };
}