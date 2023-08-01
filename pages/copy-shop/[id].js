import { useEffect, useState } from "react";
import { ParamShopifyData } from "../../lib/shopify";
import ProductCard from "../../components/Products/ProductCard";
import {useRouter} from "next/router";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";

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
export default function CopyShop() {
    const [products, setProducts] = useState([]);
    const [cursors, setCursors] = useState([null]); // Initialized with null as the first element
    const [cursorIndex, setCursorIndex] = useState(0);
    const router = useRouter();
    const { formattedFilters } = useFilter();
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
            products(first: 90, after: ${cursor ? `"${cursor}"` : null}) {
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
                console.log("Shopify Products:", newProducts);
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
        if(products.length === 90) {
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
    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader />
            </div>
            <div className="h-8.5 mg:h-[61px] sm:h-[60px]"/>
            <main className="flex-grow">
                <button className="bg-white text-black" onClick={handlePrevClick} disabled={cursorIndex <= 0}>
                    PREVIOUS
                </button>
                <div className="w-20"></div>
                <button className="bg-white text-black"
                        onClick={handleNextClick}
                        disabled={(cursorIndex >= cursors.length - 1) || (products.length < 90)}>
                    NEXT
                </button>

                {/* Using the ProductList3 component */}
                {filteredProducts.length > 0 && (
                    <ProductList3 products={filteredProducts} />
                )}
            </main>
        </div>
    );
}
