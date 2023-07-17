import NewFooter from "../../components/NewFooter";
import ProductList2 from "../../components/Products/ProductList2";
import WorkHeader from "../../components/WorkHeader";
import {filterProducts} from "../../lib/functions";
import {useFilter} from "../../components/FilterContext";
import {useProducts} from "../../context/ProductsContext";
import {useRouter} from "next/router";

export default function Results() {
    const router = useRouter();
    const { formattedFilters } = useFilter();
    const { products, setProducts } = useProducts();

    // Filter the initialProducts based on the formattedFilters
    useEffect(() => {
        if(formattedFilters.length > 0) {
            const filteredProducts = filterProducts(products, formattedFilters);
            setProducts(filteredProducts);
        }
    }, [formattedFilters]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-bebe">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader/>
            </div>
            <div className="h-8.5"></div>
            <main className="flex-grow">
                {/* Pass filteredProducts instead of initialProducts to ProductList2 */}
                <ProductList2 />
            </main>
            <NewFooter />
        </div>
    );
}
