import {ParamShopifyData} from "./shopify";
export function filterProducts(initialProducts, formattedFilters) {
    return initialProducts.filter(product => {
        const { title, handle, images, priceRange, variants } = product;
        const imageUrl = images.edges[0]?.node?.url;
        const altText = images.edges[0]?.node?.altText || "Product Image";
        const price = priceRange.minVariantPrice.amount;
        const size = variants.edges[0]?.node?.title;
        const tags = product.tags; // assuming that the tags is an array

        // check if the product matches all the filters
        for (let filter of formattedFilters) {
            if (size === filter) continue; // if the product size matches the filter, continue with the next filter
            if (tags.includes(filter)) continue; // if the product tags contain the filter, continue with the next filter

            // if the product does not match the filter, return false to exclude it from the filtered array
            return false;
        }

        // if the product matches all the filters, return true to include it in the filtered array
        return true;
    });
}

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