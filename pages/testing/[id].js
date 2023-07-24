import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
import {useEffect, useState} from "react";
import {getProductsCount} from "../../lib/shopify";
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
//Pagination Component
function Pagination({ currentPage, totalPages, setCurrentPage }) {
    let startPage, endPage;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    let pages = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i);

    return (
        <div className="pagination">
            <button
                className="text-black mr-4"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                PREVIOUS
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    className={`text-black mr-3 ${currentPage === page ? 'bg-gray-400' : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="text-black ml-4"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                NEXT
            </button>
        </div>
    );
}


const productsPerPage = 12
export default function Collection({ initialProducts, hasNextPage, totalProductCount }) {
    const router = useRouter();
    const { formattedFilters } = useFilter();
    const [sortOption, setSortOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(() => Math.ceil(totalProductCount/productsPerPage))
    useEffect(() => {
        if (router.query.page) {
            setCurrentPage(parseInt(router.query.page));
        }
    }, [router.query.page]);
    useEffect(() => {
        if (currentPage !== 1) {
            router.push({ pathname: router.pathname, query: { ...router.query, page: currentPage } });
        } else {
            const { page, ...query } = router.query;
            router.push({ pathname: router.pathname, query });
        }
    }, [currentPage]);

    useEffect(() => {
        // Restore scroll position on component mount
        const savedScrollPosition = sessionStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
            window.requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(savedScrollPosition));
                console.log('Scrolled to:', savedScrollPosition);
            });
        }

        // Save scroll position on route change start
        const handleRouteChange = () => {
            console.log('Route change started, scroll position:', window.scrollY);
            sessionStorage.setItem('scrollPosition', window.scrollY);
        };
        router.events.on('routeChangeStart', handleRouteChange);

        // Clean up
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);




    const handleSortSelect = (option) => {
        setSortOption(option);
    }
    //console.log('Formatted filers: ',formattedFilters);
    //const filteredProducts = initialProducts.filter(product => product.tags.includes('1980s'));
    //const filteredProducts = initialProducts.filter(product => product.variants.edges[0]?.node?.title === 'Large');
// Your array of filters
    const filters = [  ]; //play around with it...

// Your known sizes
    const knownSizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large'];

// Split the filters into sizes and tags
    const sizes = formattedFilters.filter(filter => knownSizes.includes(filter));
    const tags = formattedFilters.filter(filter => !knownSizes.includes(filter));

// Filter products
    const filteredProducts = initialProducts.filter(product => {
        // Check sizes
        const sizeMatch = sizes.length === 0 || sizes.includes(product.variants.edges[0]?.node?.title);

        // Check tags
        const tagMatch = tags.length === 0 || tags.every(tag => product.tags.includes(tag));

        return sizeMatch && tagMatch;
    });

    //SORT!!!
    //Price Low to High
    //filteredProducts.sort((a,b) => a.priceRange.minVariantPrice.amount - b.priceRange.minVariantPrice.amount);
    //Price High to Low
    //filteredProducts.sort((a,b) => b.priceRange.minVariantPrice.amount - a.priceRange.minVariantPrice.amount);
    //Created Old to New
    //filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    switch (sortOption) {
        case 'DATE, OLD TO NEW':
            filteredProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'PRICE, LOW TO HIGH':
            filteredProducts.sort((a,b) => a.priceRange.minVariantPrice.amount - b.priceRange.minVariantPrice.amount);
            break;
        case 'PRICE, HIGH TO LOW':
            filteredProducts.sort((a,b) => b.priceRange.minVariantPrice.amount - a.priceRange.minVariantPrice.amount);
            break;
        case 'DATE, NEW TO OLD':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        default:
            break;
    }

    if (router.isFallback) {
        return <div>Loading...</div>;
    }


    //PAGINATION
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    console.log(totalPages)
    //NO PRODUCTS
    if (!filteredProducts || filteredProducts.length === 0) {
        return(
            <div className="flex flex-col min-h-screen bg-bebe">
                <div className="fixed w-full top-0 z-50">
                    <WorkHeader />
                </div>
                <div className="h-16"></div>
                <main className="flex-grow flex justify-center items-center">
                    <NoProducts/>
                </main>
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
                <ProductList3 products={filteredProducts} />
                {/*COMPONENT FOR PAGINATION*/}
                <div className="flex justify-center items-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages-1}
                        setCurrentPage={goToPage}
                        hasNextPage={currentPage < totalPages-1}
                    />
                </div>
            </main>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
    const { id, page } = context.query;
    const productsPerPage = 12;
    const pageNumber = parseInt(page) || 1;  // set page number to 1 if it's not defined

    const query = `
        query ($title: String!, $first: Int!) {
          collection(handle: $title) {
            id
            title
            handle
            products(first: $first) {
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

    const { data } = await ParamShopifyData(query, {
        title: id,
        first: productsPerPage * pageNumber
    });

    const totalProductCount = await getProductsCount();

    if (!data || !data.collection) {
        return {
            notFound: true,
        };
    }

    const initialProducts = data.collection.products.edges.map(edge => {
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
            hasNextPage: data.collection.products.pageInfo.hasNextPage,
            collectionName: data.collection.title,
            totalProductCount,
        },
    };
}
