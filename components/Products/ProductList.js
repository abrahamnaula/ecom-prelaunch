import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { ParamShopifyData } from "../../lib/shopify";
import { useRouter } from 'next/router';
import {useFilter} from "../FilterContext";

export default function ProductList({ initialProducts, hasNextPage }) {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(!initialProducts);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(hasNextPage);
    const observer = useRef();
    const lastProductElementRef = useRef();

    const router = useRouter();
    const { collectionName } = router.query;

    //get array of sizes selected
    const { selectedSizes } = useFilter();

    // Filter the products by size
    const filteredProducts = initialProducts.filter(product =>
        selectedSizes.includes(product.variants.edges[0].node.title)
    );

    const loadMore = async () => {
        setLoading(true);
        const query = `
      query ($title: String!, $cursor: String) {
        collections(first: 1, query: $title) {
          edges {
            node {
              id
              title
              handle
              products(first: 12, after: $cursor) {
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
          }
        }
      }
    `;
        const { data } = await ParamShopifyData(query, { title: collectionName, cursor: cursor });
        const newProducts = data.collections.edges[0].node.products.edges.map(edge => {
            return {
                ...edge.node,
                imageUrl: edge.node.images.edges[0]?.node?.url,
            };
        });
        const newCursor = data.collections.edges[0].node.products.edges.slice(-1)[0]?.cursor;
        const newHasMore = data.collections.edges[0].node.products.pageInfo.hasNextPage;

        if (cursor) {
            // only append new products if cursor is not null (not the first load)
            setProducts(prevProducts => [...prevProducts, ...newProducts]);
        } else {
            // if cursor is null (first load), replace products with newProducts
            setProducts(newProducts);
        }

        setCursor(newCursor);
        setHasMore(newHasMore);
        setLoading(false);
    };

    useEffect(() => {
        if (loading || !initialProducts) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });

        if (lastProductElementRef.current) observer.current.observe(lastProductElementRef.current);
    }, [loading, hasMore, initialProducts]);

    useEffect(() => {
        // Restore scroll position after initial products have been loaded
        const scrollPos = sessionStorage.getItem('scrollPosition');
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
            // Clear the scroll position
            sessionStorage.removeItem('scrollPosition');
        }

        // Save scroll position when unmounting the component
        return () => {
            sessionStorage.setItem('scrollPosition', window.pageYOffset.toString());
        };
    }, []);

    useEffect(() => {
        // Check if scrolling is disabled and refresh the page
        const handleScroll = () => {
            const isScrollDisabled = document.documentElement.scrollHeight <= window.innerHeight;
            if (isScrollDisabled && sessionStorage.getItem('refreshed') !== 'true') {
                sessionStorage.setItem('refreshed', 'true');
                window.location.reload();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    ref={index === products.length - 1 ? lastProductElementRef : null}
                />
            ))}
            {loading && 'Loading more products...'}
        </div>
    );
}
