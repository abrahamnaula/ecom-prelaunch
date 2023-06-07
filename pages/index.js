//import { Inter } from 'next/font/google'
import {getProductsInCollection} from "../lib/shopify";
import ProductList from "../components/ProductList";

//const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {
    console.log(products)
    return (
        <>
            <ProductList products = {products} />
        </>
    )
}

export async function getStaticProps() {
    const products = await getProductsInCollection()
    return {
        props: {products},
    }
}
