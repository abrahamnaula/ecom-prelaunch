import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PredictiveProductSearch } from '../../lib/shopify';
import ShopHeader from "../../components/ShopHeader";
import Header from "../../components/Header";
import NewFooter from "../../components/NewFooter";
import ProductList from "../../components/Products/ProductList";
import NoResults from "../../components/NoResults";
import WorkHeader from "../../components/WorkHeader";

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
                    const response = await PredictiveProductSearch(search);
                    console.log('API response:', response);

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
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader />
            </div>
            <div className="h-16"></div>
            <div className="h-8.5 mg:h-[61px] sm:h-[60px]"></div>
            <main className="flex-grow ">
                {error || products.length === 0 ?
                    <div className="text-black">
                        <NoResults/>
                    </div>
                    :
                    <ProductList products={products} />
                }
            </main>
            <NewFooter />
        </div>
    );
}
