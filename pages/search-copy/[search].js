import React, { useEffect, useState } from 'react';
import { getSearchCursors, ParamShopifyData } from '../../lib/shopify';
import { useRouter } from 'next/router';

export default function SearchCopy({ cursors }) {
    const [cursorIndex, setCursorIndex] = useState(0);
    const [products, setProducts] = useState([]); // Initialize products state
    const router = useRouter();
    const { search } = router.query;

    useEffect(() => {
        const fetchProducts = async (cursor) => {
            // Construct your GraphQL query
            const query = `
        query ProductSearch($query: String!, $first: Int!, $after: String) {
          products(first: $first, after: $after, query: $query) {
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
                description
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
                options {
                  name
                  values
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 10) {
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
      `;

            // Fetch data using ParamShopifyData function
            try {
                const response = await ParamShopifyData(query, {
                    query: search,
                    first: 100, // Or your desired page size
                    after: cursor, // Use 'after' instead of 'cursor'
                });

                if (response.errors || !response.data.products) {
                    throw new Error('Failed to perform product search');
                }

                // We map over the edges to return the node (the product object)
                const newProducts = response.data.products.edges.map((edge) => edge.node);

                setProducts(newProducts); // Update the products state
            } catch (error) {
                console.error('Product search error:', error);
                throw error;
            }
        };

        fetchProducts(cursors[cursorIndex]);
    }, [cursorIndex, router.query.page, search]);

    const handleNextClick = () => {
        if (cursorIndex < cursors.length - 1) {
            setCursorIndex(cursorIndex + 1);
        }
    };

    const handlePrevClick = () => {
        if (cursorIndex > 0) {
            setCursorIndex(cursorIndex - 1);
        }
    };

    return (
        <>
            {/* Render your products */}
            {products.map((product) => (
                <div key={product.id}>{product.title}</div>
                // Add other product rendering logic here
            ))}

            {/* Render Next and Previous buttons */}
            <button onClick={handlePrevClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
        </>
    );
}

// Rest of your component code...

export async function getServerSideProps(context) {

    const  {search}  = context.query
    console.log(search)
    const cursors = await getSearchCursors(search, 100);
    //console.log(cursors);
    return {
        props: {
            cursors
        }
    };
}
