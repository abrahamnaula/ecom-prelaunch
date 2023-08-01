import { useEffect, useState } from "react";
import {getCollectionId, getCollectionProductCount, ParamShopifyData} from "../../lib/shopify";
import ProductCard from "../../components/Products/ProductCard";
import {useRouter} from "next/router";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";
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
function Paginate({ productCount, cursorIndex, cursors, products, handlePrevClick, handleNextClick }) {
    const totalNumPages = Math.ceil(productCount / 200);
    const startPage = Math.max(cursorIndex, 1);
    const endPage = Math.min(startPage + 2, totalNumPages);

    return (
        <div className="flex justify-center items-center">
            <button className="font-nhg font-medium text-bebe bg-black text-xxs sm:text-xs flex justify-center items-center p-2"
                    onClick={handlePrevClick} disabled={cursorIndex <= 0}>
                <ArrowLeftIcon className="text-bebe h-4"/>
                PREVIOUS
            </button>
            {[...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNumber = startPage + i;
                return (
                    <button key={pageNumber}
                            className={`font-nhg font-medium text-black text-xxs sm:text-xs 
                                         flex justify-center items-center  
                                          mg:mx-1.5 xs:mx-3 px-2 py-1
                                         ${pageNumber === cursorIndex+1 ? 'bg-gray-400' : ''}`}
                            onClick={() => { if (pageNumber !== cursorIndex) { fetchProducts(pageNumber - 1); setCursorIndex(pageNumber - 1); } }}
                            disabled={pageNumber === cursorIndex}>
                        {pageNumber}
                    </button>
                );
            })}
            <button className="font-nhg font-medium bg-black text-bebe text-xxs sm:text-xs flex justify-center items-center p-2"
                    onClick={handleNextClick}
                    disabled={(cursorIndex >= cursors.length - 1) || (products.length < 200)}>
                NEXT
                <ArrowRightIcon className="text-bebe h-4"/>
            </button>
        </div>
    );
}
export default function CopyShop({ productCount } ) {
    console.log('Product COUNT: ', productCount)
    const [products, setProducts] = useState([]);
    const [cursors, setCursors] = useState([null]); // Initialized with null as the first element
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
        console.log('Handle: ', handle)
        const query = `
      query{
          collection(handle: "${handle}") {
            id
            title
            handle
            products(first: 200, after: ${cursor ? `"${cursor}"` : null}) {
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
                const newCursor = data.data.collection.products.edges[data.data.collection.products.edges.length - 1].cursor;
                setCursors([...cursors, newCursor]);
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
        if(products.length === 200) {
            fetchProducts(cursorIndex + 1);
            setCursorIndex(cursorIndex + 1);
        }
    };
    const handlePrevClick = () => {
        if (cursorIndex > 0) {
            fetchProducts(cursorIndex - 1);
            setCursorIndex(cursorIndex - 1);
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
                <Paginate productCount={productCount} cursorIndex={cursorIndex}
                          cursors={cursors} products={products}
                          handlePrevClick={handlePrevClick}
                          handleNextClick={handleNextClick} />

                {filteredProducts.length > 0 && (
                    <ProductList3 products={filteredProducts} />
                )}
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.params
    try {
        const collectionId = await getCollectionId(id);
        const productCount = await getCollectionProductCount(collectionId);

        return {
            props: {
                productCount,
            },
        };
    } catch (error) {
        // handle error
        console.error(error);
        return {
            notFound: true,
        };
    }
}

