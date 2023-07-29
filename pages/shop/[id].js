import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
import {useEffect, useState} from "react";
import {getProductsCount} from "../../lib/shopify";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
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
const productsPerPage = 60
export default function Collection({ initialProducts, hasNextPage, totalProductCount }) {
    const router = useRouter();
    const { formattedFilters, setFormattedFilters, setFilterHistory,
        setSelectedCategory, setSelectedCollection, setSelectedEra,
        setSelectedSizes, setFinalFilters} = useFilter();
    const [sortOption, setSortOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(() => parseInt(router.query.page) || 1)
    const productSize = Object.keys(initialProducts).length;
    let totalPages = Math.floor(totalProductCount / productsPerPage);
    if(totalProductCount % productsPerPage !== 0 && totalProductCount > productsPerPage){
        totalPages += 1;
    }
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
            //console.log('Route change started, scroll position:', window.scrollY);
            sessionStorage.setItem('scrollPosition', window.scrollY);
            sessionStorage.setItem('previousPath', url);
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
            break;
    }
    if (router.isFallback) {
        return <Loading/>;
    }
    //GO TO PAGE FOR PAGINATION
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
                <ProductList3 products={filteredProducts} />
                {/*COMPONENT FOR PAGINATION*/}
                <div className="flex justify-center items-center w-full py-4">
                    <Pagination
                        productSize={productSize}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={goToPage}
                        hasNextPage={currentPage < totalPages && productSize === productsPerPage}
                    />
                </div>
            </main>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
    const { id, page } = context.query;
    const productsPerPage = 60;
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
