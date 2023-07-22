import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import {useFilter} from "../../components/FilterContext";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
import {useEffect, useState} from "react";
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
export default function Collection({ initialProducts }) {
    const router = useRouter();
    const { formattedFilters } = useFilter();
    const [sortOption, setSortOption] = useState(null);
    /*

    Please be aware that this solution assumes that your data is not dynamically loaded when scrolling.
    If your product list is long and you're using something like an infinite scroll where more products are
    loaded as the user scrolls down the page, restoring the scroll position would not work properly
    unless you also preserve the loaded data state or manage the scroll restoration in a more complex way.

     */
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
            </main>
            <NewFooter />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const query = `
        query ($title: String!) {
          collection(handle: $title) {
            id
            title
            handle
            products(first: 250) {
              edges {
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

    const { data } = await ParamShopifyData(query, { title: id });
    console.log(context.params)
    if (!data || !data.collection) {
        return {
            notFound: true,
        };
    }

    const initialProducts = data.collection.products.edges.map(edge => {
        return {
            ...edge.node,
            imageUrl: edge.node.images.edges[0]?.node?.url,
        };
    });

    return {
        props: { initialProducts, collectionName: data.collection.title },
    };
}