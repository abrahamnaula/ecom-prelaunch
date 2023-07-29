import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {getProductsCount, ParamShopifyData} from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
import Loading from "../../components/Loading";
import {useFilter} from "../../components/FilterContext";
import Pagination from "../../components/Pagination";
const productsPerPage=60;
function ProductList3({ products }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}
export default function Search({ initialProducts, totalProductCount }) {
    const router = useRouter();
    const { search } = router.query;
    const { formattedFilters, setFormattedFilters, setFilterHistory,
            setSelectedCategory, setSelectedCollection, setSelectedEra,
            setSelectedSizes, setFinalFilters} = useFilter();
    const [sortOption, setSortOption] = useState(null);
    const [error, setError] = useState(null); // New state to keep track of errors

    // You'll handle fetching on client side in case the search query changes without page navigation
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);

    //pagination state
    const [currentPage, setCurrentPage] = useState(() => parseInt(router.query.page) || 1)
    const [totalPages, setTotalPages] = useState(() => Math.ceil(totalProductCount/productsPerPage))

    const productSize = Object.keys(initialProducts).length;

    //URL query
    useEffect(() => {
        if (router.query.page) {
            setCurrentPage(parseInt(router.query.page));
        } else {
            setCurrentPage(1);
        }
    }, [router.query.page]);

    useEffect(() => {
        // Restore scroll position on component mount
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        const previousPath = sessionStorage.getItem('previousPath');


        if (previousPath && previousPath.startsWith('/products') && savedScrollPosition) {
            window.requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(savedScrollPosition));
                //console.log('Scrolled to:', savedScrollPosition);
            });
        }
        // Save scroll position on route change start
        const handleRouteChange = (url) => {
           // console.log('Route change started, scroll position:', window.scrollY);
            sessionStorage.setItem('scrollPosition', window.scrollY);
            sessionStorage.setItem('previousPath', url);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        // Clean up
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    useEffect(() => {
        // Restore scroll position after products have loaded
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        const previousPath = sessionStorage.getItem('previousPath');

        if (previousPath && previousPath.startsWith('/products') && scrollPosition) {
            window.requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(scrollPosition));
                //console.log('Scrolled to:', scrollPosition);
            });
        }
    }, [products]);
    useEffect(() => {
        if (search) {
            setLoading(true);
            (async () => {
                try {
                    const response = await ProductSearch(search);
                    setProducts(response);
                } catch (error) {
                    //console.error("Error during search: ", error);
                    setError(error.message); // Save the error message in state
                } finally {
                    setLoading(false);
                }
            })();
        }

    }, [search]);
    /*
    //Logs the window's scroll position
    useEffect(() => {
        const handleScroll = () => console.log(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    */
    const handleSortSelect = (option) => {
        setSortOption(option);
    }

    // Your known sizes
    const knownSizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large'];

// Split the filters into sizes and tags
    const sizes = formattedFilters.filter(filter => knownSizes.includes(filter));
    const tags = formattedFilters.filter(filter => !knownSizes.includes(filter));
    // console.log(initialProducts)
// Filter products
    const filteredProducts = initialProducts.filter(product => {
        // Check sizes
        const sizeMatch = sizes.length === 0 || sizes.includes(product.variants.edges[0]?.node?.title);

        // Check tags
        const tagMatch = tags.length === 0 || tags.every(tag => product.tags.includes(tag));

        return sizeMatch && tagMatch;
    });

    switch (sortOption) {
        case 'DATE, NEW TO OLD':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            window.scrollTo(0,0)
            break;
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
        default:
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            break;
    }
    if (loading) {
        return <Loading/>
    }
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    //NO PRODUCTS
    if (!filteredProducts || filteredProducts.length === 0) {
        return(
            <div className="flex flex-col min-h-screen bg-bebe">
                <div className="fixed w-full top-0 z-50">
                    <WorkHeader />
                </div>
                <div className="h-16"></div>
                <main className="flex-grow flex justify-center items-center">
                    <div className="flex fixed">
                        <div className="flex justify-center items-center">
                            <NoProducts/>
                        </div>
                    </div>
                </main>
                <div className="flex justify-center w-full mb-36">
                    <Pagination
                        productSize={productSize}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={goToPage}
                        hasNextPage={currentPage < totalPages && productSize === productsPerPage}
                    />
                </div>
                <NewFooter />
            </div>
        )
    }
    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader onSortSelect={handleSortSelect}/>
            </div>
            <div className="h-8.5 mg:h-[61px] sm:h-[60px]"></div>
            <main className="flex-grow">
                {error || products.length === 0 ?
                    <div className="flex items-center justify-center">
                        <NoProducts />
                    </div>
                    :
                    <div className="flex-grow">
                        <ProductList3 products={filteredProducts} />
                        <div className="flex justify-center items-center w-full mg:py-4 sm:py-4">
                            <Pagination
                                productSize={productSize}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={goToPage}
                                hasNextPage={currentPage < totalPages && productSize === productsPerPage}
                            />
                        </div>
                    </div>
                }
            </main>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
    const { search, page } = context.query;
    const productsPerPage = 60;
    const pageNumber = parseInt(page) || 1;  // set page number to 1 if it's not defined

    const query = `
        query ($query: String!, $first: Int!) {
          products(first: $first, query: $query) {
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

    const { data } = await ParamShopifyData(query, {
        query: search,
        first: productsPerPage * pageNumber
    });
    const totalProductCount = await getProductsCount();
    if (!data || !data.products) {
        return {
            notFound: true,
        };
    }

    const initialProducts = data.products.edges.map(edge => {
        return {
            ...edge.node,
            cursor: edge.cursor,
            imageUrl: edge.node.images.edges[0]?.node?.url,
        };
    });

    // Use .slice() to only send the products for the current page to the client
    const paginatedProducts = initialProducts.slice((pageNumber - 1) * productsPerPage, pageNumber * productsPerPage);

    return {
        props: {
            initialProducts: paginatedProducts,
            hasNextPage: data.products.pageInfo.hasNextPage,
           totalProductCount,
        },
    };
}
async function ProductSearch(queryString, pageNumber = 1, productsPerPage = 60) {
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

    const variables = {
        query: queryString,
        first: productsPerPage,
        after: pageNumber > 1 ? pageNumber * productsPerPage - productsPerPage : null
    };

    try {
        const response = await ParamShopifyData(query, variables);

        if (response.errors || !response.data.products) {
            throw new Error('Failed to perform product search');
        }

        // We map over the edges to return the node (the product object)
        const products = response.data.products.edges.map(edge => edge.node);

        return {
            products,
            hasNextPage: response.data.products.pageInfo.hasNextPage
        };
    } catch (error) {
        console.error('Product search error:', error);
        throw error;
    }
}