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