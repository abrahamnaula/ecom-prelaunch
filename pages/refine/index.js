import React from 'react'
import Header from "../../components/Header";
import ShopHeader from "../../components/ShopHeader";
import FilterMenu from "../../components/Refine";

export default function Refine() {
    return (
        <>
            <Header/>
            <ShopHeader/>
            <div className="bg-white h-screen w-screen ">

                <div className="sm:flex sm:justify-center sm:items-center sm:pt-28">
                    <FilterMenu/>
                </div>

            </div>
        </>
    )
}
