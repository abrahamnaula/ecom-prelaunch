//import {getProductsInCollection} from "../lib/shopify";
//import ProductList from "../components/ProductList";
import React from "react";
//import TopHeader from "../components/TopHeader";
import FullFooter from "../components/FullFooter";
//import Header from "../components/Header";
import BackgroundVideo from "../components/BackgroundVideo";
import Logo from "../components/Logo";

import Scrollable from "../components/Scrollable";
import ShopButton from "../components/ShopButton/ShopButton";
export default function Home() {
    return (
        <div className="relative">
            <div id="top-element" />
            <BackgroundVideo />
            <Logo />
            <ShopButton />
            {/*<Header />*/}
            {/*<TopHeader />*/}
            <Scrollable/>
            <FullFooter />
        </div>
    )
}



/*

            <video
                className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline // Add playsInline attribute
            >
                <source src="/ge-bkg-ver.mp4" type="video/mp4" />
            </video>
*/

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