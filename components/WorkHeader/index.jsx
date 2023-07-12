import React from 'react'
import Link from "next/link";
import SortMenu from "../SortMenu";
import {ChevronUpIcon} from "@heroicons/react/20/solid";
import SearchBar from "../SearchBar";

export default function WorkHeader() {
    return (
        <div className="w-full flex bg-bebe fixed px-0">
            <div className="flex-grow flex flex-col ">

                    <div className="font-nhg font-medium text-black text-xxs w-16 sm:w-1/5 sm:text-xxs pl-2 border-b-2 border-gray-600 w-1/6">
                        <Link href="/" passHref>
                            GRAY ERA
                        </Link>
                    </div>

                <div className="flex-grow ">

                        <div className="sm:w-1/6 w-16 text-black font-nhg font-medium text-xxs sm:text-xxs sm:text-black  sm:font-nhg
                                        sm:font-medium pl-2">
                            <Link href="/refine">
                                REFINE +
                            </Link>
                        </div>

                </div>
            </div>
            <div className="flex-grow border border-green-500 text-xxs font-nhg font-medium text-black flex items-center">
                <div className="flex">
                    <Link href="/collections/shop-all">SHOP ALL</Link>
                    <Link href="/collections/shop-all"><ChevronUpIcon className="h-4 ml-1" /></Link>
                </div>
            </div>

            <div className="flex-grow flex items-center border border-blue-500 text-xxs">
                <SearchBar/>
            </div>
            <div className="flex-grow flex flex-col border border-yellow-500 text-xxs">
                <div className="w-1/5 text-right border-b-2 border-gray-600 font-nhg font-medium text-black sm:text-xxs sm:font-nhg sm:font-medium
                                sm:text-black ml-auto
                                pr-8 sm:pr-2" >
                    {/*{`BAG ${String(cart.length).padStart(2, '0')}`} /!* Display the number of items in the cart *!/*/}
                    <button onClick={()=> setCartOpen(true)}>BAG</button>

                </div>
                <div className="flex-grow mt-0 text-xxs">
                    <SortMenu/>
                </div>
            </div>
        </div>


    )
}
