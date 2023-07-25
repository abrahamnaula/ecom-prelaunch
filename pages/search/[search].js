import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {PredictiveProductSearch, ProductSearch} from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import ProductCard from "../../components/Products/ProductCard";
import NoProducts from "../../components/NoProducts";
import Loading from "../../components/Loading";
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
export default function Search() {
    const router = useRouter();
    const { search } = router.query;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // New state to keep track of errors

    useEffect(() => {
        if (search) {
            setLoading(true);
            (async () => {
                try {
                    const response = await ProductSearch(search);
                    //console.log('API response:', response);

                    // Just save the response array as the product list
                    setProducts(response);

                } catch (error) {
                    console.error("Error during predictive search: ", error);
                    setError(error.message); // Save the error message in state
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [search]);

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader />
            </div>
            <div className="h-8.5 mg:h-[61px] sm:h-[60px]"></div>
            <main className="flex-grow ">
                {error || products.length === 0 ?
                    <div className="text-black">
                        <NoProducts/>
                    </div>
                    :
                    <ProductList3 products={products} />
                }
            </main>
            <NewFooter />
        </div>
    );
}
