//import {getProductsInCollection} from "../lib/shopify";
//import ProductList.js from "../components/ProductList.js";
import React from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import Logo from "../components/Logo";
import ShopButton from "../components/ShopButton/ShopButton";

export default function Home() {
    return (
        <div className="relative flex flex-col justify-center h-screen">
            <BackgroundVideo />
            <div className="flex justify-between items-center -mt-32 sm:fixed sm:flex sm:justify-center sm:items-center sm:w-full sm:h-screen">
                <Logo />
            </div>
            <div className="flex justify-center mt-16 sm:mt-28 ">
                <ShopButton />
            </div>

        </div>
    );
}

/*
    <video
                className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
                examples={videoRef}
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
            <ProductList.js products = {products} />
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