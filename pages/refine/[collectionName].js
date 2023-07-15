
import { useRouter } from 'next/router';
import { ParamShopifyData } from '../../lib/shopify';
import NewFooter from "../../components/NewFooter";
import WorkHeader from "../../components/WorkHeader";
import { useFilter } from "../../components/FilterContext";
import { useEffect } from "react";
import fetchProducts from "../../lib/functions";
import ProductList2 from "../../components/Products/ProductList2";

export default function Collection({ initialProducts, productsAvailable, hasNextPage }) {
    const router = useRouter();
    const { selectedCategory, selectedCollection, selectedEra } = useFilter();
    const { setCollectionName } = useFilter();
    const { collectionName } = router.query;
    useEffect(() => {
        setCollectionName(collectionName);
    }, [collectionName]);

    let tags = [selectedCategory, selectedCollection, selectedEra]
        .filter(tag => tag)
        .map(tag => tag.toLowerCase().replace(/[,&]/g, '').replace(/\s+/g, '-'));

    console.log(tags);
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!productsAvailable) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <div className="fixed w-full top-0 z-50">
                    <WorkHeader />
                </div>
                <div className="h-[62px]"></div>
                <main className="flex-grow ">
                    <h1 className="font-nhg font-medium text-xxs text-black ">NO PRODUCTS AVAILABLE</h1>
                </main>
                <NewFooter />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="fixed w-full top-0 z-50">
                <WorkHeader />
            </div>
            <div className="h-[62px]"></div>
            <main className="flex-grow ">
                <ProductList2 initialProducts={initialProducts} hasNextPage={hasNextPage} />
            </main>
            <NewFooter />
        </div>
    );
}


export async function getServerSideProps(context) {
    const { collectionName } = context.params;
    const { selectedCategory, selectedCollection, selectedEra } = context.query;

    const tags = [selectedCategory, selectedCollection, selectedEra]
        .filter(tag => tag)
        .map(tag => `tag:${tag.toLowerCase().replace(/[,&]/g, '').replace(/\s+/g, '-')}`)
        .join(' OR ');

    const { initialProducts, productsAvailable } = await fetchProducts(collectionName, tags);

    return {
        props: {
            initialProducts,
            productsAvailable,
        },
    };
}
