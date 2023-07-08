// components/ProductList.js
import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import {ParamShopifyData} from "../../lib/shopify";
import { useRouter } from 'next/router';

export default function ProductList({ initialProducts, hasNextPage }) {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(!initialProducts);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(hasNextPage);
    const observer = useRef();
    const lastProductElementRef = useRef();

    const router = useRouter()
    const { collectionName } = router.query

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
                imageUrl: edge.node.images.edges[0]?.node?.url
            };
        });
        const newCursor = data.collections.edges[0].node.products.edges.slice(-1)[0]?.cursor;
        const newHasMore = data.collections.edges[0].node.products.pageInfo.hasNextPage;
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
        setCursor(newCursor);
        setHasMore(newHasMore);
        setLoading(false);
    };

    useEffect(() => {
        // When the component mounts, try to restore the scroll position.
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition) {
            window.scrollTo(0, parseInt(scrollPosition));
            sessionStorage.removeItem("scrollPosition");
        }

        return () => {
            // When the component unmounts (the user navigates away), save the scroll position.
            sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
        }
    }, []);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            console.log("Intersection Observer", entries);

            if (entries[0].isIntersecting && hasMore) {
                console.log("Load more");

                loadMore();
            }
        })
        if (lastProductElementRef.current) observer.current.observe(lastProductElementRef.current);
    }, [loading, hasMore]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 ">
            {products.map((product, index) => (
                <ProductCard key={product.id} product={product} ref={index === products.length - 1 ? lastProductElementRef : null} />
            ))}
            {loading && 'Loading more products...'}
        </div>
    );
}
