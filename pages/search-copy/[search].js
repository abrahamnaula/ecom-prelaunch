import React, { useEffect, useState } from 'react';
import { getSearchCursors, ParamShopifyData } from '../../lib/shopify';
import { useRouter } from 'next/router';
import WorkHeader from "../../components/WorkHeader";
import ProductList3 from "../../components/Products/ProductList3";
import NoProducts from "../../components/NoProducts";
import {useFilter} from "../../components/FilterContext";
import NewFooter from "../../components/NewFooter";
import SearchPaginate from "../../components/SearchPaginate";
const MAX = 100;
export default function SearchCopy({ cursors }) {
    const [cursorIndex, setCursorIndex] = useState(0);
    const [products, setProducts] = useState([]); // Initialize products state
    const router = useRouter();
    const { search } = router.query;
    const { formattedFilters } = useFilter();
    const [sortOption, setSortOption] = useState(null);
    const handleSortSelect = (option) => {
        setSortOption(option);
    }
    const knownSizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large'];
    const sizes = formattedFilters.filter(filter => knownSizes.includes(filter));
    const tags = formattedFilters.filter(filter => !knownSizes.includes(filter));
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
    useEffect(() => {
        fetchProducts(cursors[cursorIndex]);
    }, [cursorIndex, router.query.page, search]);

    const handleNextClick = () => {
        if (cursorIndex < cursors.length - 1) {
            setCursorIndex(cursorIndex + 1);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: cursorIndex + 1 },
            });
        }
    };

    const handlePrevClick = () => {
        if (cursorIndex > 0) {
            setCursorIndex(cursorIndex - 1);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: cursorIndex - 1 },
            });
        }
    };

    const jumpToPage = (pageNumber) => {
        setCursorIndex(pageNumber);

        // Update the URL with the new page number
        router.push({
            pathname: router.pathname,
            query: {...router.query, page: pageNumber},
        });
    }

    const filteredProducts = products.filter(product => {
        // Check sizes
        const sizeMatch = sizes.length === 0 || sizes.includes(product.variants.edges[0]?.node?.title);

        // Check tags
        const tagMatch = tags.length === 0 || tags.every(tag => product.tags.includes(tag));

        return sizeMatch && tagMatch;
    });
    switch (sortOption) {
        case 'DATE, OLD TO NEW':
            filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            window.scrollTo(0,0)
            break;
        case 'PRICE, LOW TO HIGH':
            filteredProducts.sort((a,b) => a.priceRange.minVariantPrice.amount - b.priceRange.minVariantPrice.amount);
            window.scrollTo(0,0)
            break;
        case 'PRICE, HIGH TO LOW':
            filteredProducts.sort((a,b) => b.priceRange.minVariantPrice.amount - a.priceRange.minVariantPrice.amount);
            window.scrollTo(0,0)
            break;
        case 'DATE, NEW TO OLD':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            window.scrollTo(0,0)
            break;
        default:
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }

    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader onSortSelect={handleSortSelect}/>
            </div>
            <div className="h-8.5 mg:h-[61px] sm:h-[60px]"/>
            <main className="flex-grow">
                {filteredProducts.length > 0 ? (
                    <ProductList3 products={filteredProducts} />
                ) : (
                    <NoProducts/>
                )}
            </main>


            <SearchPaginate
                      MAX={MAX} totalNumPages={cursors.length}
                      cursorIndex={cursorIndex}
                      cursors={cursors} products={products}
                      handlePrevClick={handlePrevClick}
                      handleNextClick={handleNextClick}
                      jumpToPage={jumpToPage}
            />

            <NewFooter />
        </div>
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