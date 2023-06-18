//import { Inter } from 'next/fonts/google'
import {getProductsInCollection} from "../lib/shopify";
import ProductList from "../components/ProductList";
import {Card} from "@aws-amplify/ui-react";
import React from "react";
import DivAnnouncementbar from "../components/DivAnnouncementbar";
//import BottomFooter from "../components/BottomFooter";
import TopHeader from "../components/TopHeader";
import FullFooter from "../components/FullFooter";
import GrowingText from "../components/GrowingText";
//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return(
        <>
            <DivAnnouncementbar>FREE SHIPPING ON ALL ORDERS OVER $150</DivAnnouncementbar>
            <TopHeader/>
            <GrowingText />
            <FullFooter />

        </>
    )

}



/*
export default function Home({products}) {
    console.log(products)
    return (
        <>
            <ProductList products = {products} />
            <div className="mx-6 md:mx-20 lg:mx-50 flex justify-center items-center min-h-screen">
                <Card style={{width: '60%', height: '100px'}} className="flex flex-col justify-center">
                    <div className="flex-grow">
                        <div className="h-2"></div>
                    </div>
                    <div className="font-neue-haas-grotesk font-bold text-gray-900 flex-grow flex items-center">
                        <h1 className="w-full text-center text-2xl">
                            COMING SOON
                        </h1>
                    </div>
                    <div className="flex-grow"></div>
                </Card>
            </div>
        </DivAnnouncementbar>
    )
}

export async function getStaticProps() {
    const products = await getProductsInCollection()
    return {
        props: {products},
    }
}
*/