export const collectionProducts = `
query ($collectionHandle: String!, $cursor: String) {
  collectionByHandle(handle: $collectionHandle) {
    products(first: 10, after: $cursor) {
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
                url
              }
            }
          }
          priceRangeV2 {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
}`;

export const allCollections = `
  {
    collections(first: 25) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;