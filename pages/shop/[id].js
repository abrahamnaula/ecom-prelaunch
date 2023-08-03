import { useEffect, useState } from "react";
import {getCollectionCursors, getCollectionId, getCollectionProductCount, ParamShopifyData} from "../../lib/shopify";
import {useRouter} from "next/router";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";
import Paginate from "../../components/Paginate";
import ProductList3 from "../../components/Products/ProductList3";
import NewFooter from "../../components/NewFooter";
import NoProducts from "../../components/NoProducts";
const MAX = 100;
export default function Collection({ productCount, cursors: initialCursors } ) {
    //console.log('Product COUNT: ', productCount)
    const [products, setProducts] = useState([]);
    const [cursors] = useState([null, ...initialCursors]); // Initialized with null as the first element
    const [cursorIndex, setCursorIndex] = useState(0);
    const router = useRouter();
    const { formattedFilters } = useFilter();
    const [sortOption, setSortOption] = useState(null);
    const handleSortSelect = (option) => {
        setSortOption(option);
    }
    const knownSizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large'];
    const sizes = formattedFilters.filter(filter => knownSizes.includes(filter));
    const tags = formattedFilters.filter(filter => !knownSizes.includes(filter));
    //Scroll Feature
    useEffect(() => {
        // Restore scroll position after route transition completes
        const handleRouteChangeComplete = () => {
            const savedScrollPosition = sessionStorage.getItem('scrollPosition');
            const previousPath = sessionStorage.getItem('previousPath');

            if (previousPath && previousPath.startsWith('/products') && savedScrollPosition) {
                window.requestAnimationFrame(() => {
                    setTimeout(() => {
                        window.scrollTo(0, parseInt(savedScrollPosition));
                        console.log('Scrolled to:', savedScrollPosition);
                    }, 500); // in milliseconds
                });

            }
        };
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        // Save scroll position on route change start
        const handleRouteChangeStart = (url) => {
            console.log('Route change started, scroll position:', window.scrollY);
            sessionStorage.setItem('scrollPosition', window.scrollY);
            sessionStorage.setItem('previousPath', url);
        };
        router.events.on('routeChangeStart', handleRouteChangeStart);

        // Clean up
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, []);
    useEffect(() => {
        const currentPage = parseInt(router.query.page) || 0;
        setCursorIndex(currentPage);
        fetchProducts(currentPage);
    }, [router.query.id]); // Added router.query.id as a dependency
    useEffect(() => {
        if (router.query.id) { // Only proceed if id exists in router.query
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: cursorIndex }
            }, undefined, { scroll: false });
        }
    }, [cursorIndex, router.query.id]); // Add router.query.id as a dependency
    const fetchProducts = async (cursorIndex) => {
        const cursor = cursors[cursorIndex];
        //console.log(`Fetching products with cursor: ${cursor}`);
        const handle = router.query.id; // Get the handle from the URL parameters
        //console.log('Handle: ', handle)
        const query = `
          query{
              collection(handle: "${handle}") {
                id
                title
                handle
                products(first: 100, after: ${cursor ? `"${cursor}"` : null}) {
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
        try {
            const data = await ParamShopifyData(query);

            if (data && data.data && data.data.collection && data.data.collection.products && data.data.collection.products.edges.length > 0) {
                const newProducts = data.data.collection.products.edges.map(({ node }) => node);
                setProducts(newProducts);
                // const newCursor = data.data.collection.products.edges[data.data.collection.products.edges.length - 1].cursor;
                // setCursors([...cursors, newCursor]);
            } else {
                console.log("No products found in the Shopify response.");
                return;
            }
        } catch (error) {
            console.error("Error fetching Shopify products:", error);
            throw error;
        }
    };
    const handleNextClick = () => {
        //ALSO add when we are at the last page...
        if(products.length === MAX) {
            fetchProducts(cursorIndex + 1);
            setCursorIndex(cursorIndex + 1);
            window.scrollTo(0,0)
        }
    };
    const handlePrevClick = () => {
        if (cursorIndex > 0) {
            fetchProducts(cursorIndex - 1);
            setCursorIndex(cursorIndex - 1);
            window.scrollTo(0,0)
        }
    };

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
            <Paginate MAX={MAX} productCount={productCount}
                      cursorIndex={cursorIndex}
                      cursors={cursors} products={products}
                      handlePrevClick={handlePrevClick}
                      handleNextClick={handleNextClick}
                      fetchProducts={fetchProducts}
                      setCursorIndex={setCursorIndex}
                        />
            <NewFooter />
        </div>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params
    try {
        const collectionId = await getCollectionId(id);
        const productCount = await getCollectionProductCount(collectionId);
        const cursors = await getCollectionCursors(id);
        //console.log(cursors)
        //console.log(productCount)
        return {
            props: {
                productCount,
                cursors,
            },
        };
    } catch (error) {
        // handle error
        console.error('Error in SSR Function on copy-shop.js: ', error);
        return {
            notFound: true,
        };
    }
}