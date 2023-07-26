import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProductSearch} from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
import Loading from "../../components/Loading";
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
export default function Search({ initialProducts }) {
    const router = useRouter();
    const { search } = router.query;
    const { formattedFilters } = useFilter();
    const [sortOption, setSortOption] = useState(null);
    const [error, setError] = useState(null); // New state to keep track of errors

    // You'll handle fetching on client side in case the search query changes without page navigation
    const [products, setProducts] = useState(initialProducts);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (search) {
            setLoading(true);
            (async () => {
                try {
                    const response = await ProductSearch(search);
                    setProducts(response);
                } catch (error) {
                    console.error("Error during search: ", error);
                    setError(error.message); // Save the error message in state
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [search]);
    const handleSortSelect = (option) => {
        setSortOption(option);
    }
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


    if (loading) {
        return <Loading/>
    }

    //NO PRODUCTS
    if (!filteredProducts || filteredProducts.length === 0) {
        return(
            <div className="flex flex-col min-h-screen bg-bebe">
                <div className="fixed w-full top-0 z-50">
                    <WorkHeader onSortSelect={handleSortSelect}/>
                </div>
                <div className="h-16"></div>
                <main className="flex-grow flex justify-center items-center">
                    <NoProducts/>
                </main>
                <NewFooter />
            </div>
        )
    }
    // console.log('Date ', filteredProducts[0]?.createdAt)
    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader onSortSelect={handleSortSelect}/>
            </div>
            <div className="h-8.5 mg:h-[61px] sm:h-[60px]"></div>
            <main className="flex-grow flex items-center justify-center">
                {error || products.length === 0 ?
                    <NoProducts />
                    :
                    <ProductList3 products={filteredProducts} />
                }
            </main>
            <NewFooter />
        </div>
    );
}
export async function getServerSideProps(context) {
    let products = [];
    const search = context.query.search;

    if(search) {
        try {
            const response = await ProductSearch(search);
            products = response;
        } catch (error) {
            console.error("Error during search: ", error);
            // If you want to handle error on your page, you can pass the error in props
        }
    }

    return {
        props: {
            initialProducts: products
        },
    }
}