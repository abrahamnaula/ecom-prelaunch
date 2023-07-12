import Link from "next/link";
import SearchBar from "../SearchBar";
import {useState} from "react";
import Cart from "../Cart";
import {useCart} from "../../context/CartContext";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SortMenu from "../SortMenu";
function ShopHeader(){
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = useCart(); // Use the CartContext hook

    const handleSearch = (searchTerm) => {
        console.log(`Searching for "${searchTerm}"`);
        // you can replace this with actual search logic
    }
    return(
        <>
            <div className="w-full bg-bebe flex flex-col justify-between text-xxs">
                {/*Top White Header*/}
                <div className=" w-full min-w-full overflow-hidden flex items-center justify-between
                text-xxs">

                    <Link href="/" passHref>
                        <div className="font-nhg font-medium text-black sm:text-xxs pl-2 border border-red-800">GRAY ERA</div>
                    </Link>

                    <div className="border border-red-800 pr-4 sm:pr-8 font-nhg font-medium text-black sm:text-xxs sm:font-nhg sm:font-medium
                                    sm:text-black" onClick={()=> setCartOpen(true)}>
                        {/*{`BAG ${String(cart.length).padStart(2, '0')}`} /!* Display the number of items in the cart *!/*/}
                        BAG
                    </div>
                </div>
                <div className="flex flex-grow items-center justify-center mx-auto border border-purple-950 w-1/2">
                    <Link href="/collections/shop-all" className="flex-grow flex items-center justify-center">
                        <div className="font-nhg font-medium text-black sm:text-xxs">SHOP ALL</div>
                    </Link>
                    <div className="flex-grow flex items-center justify-center z-5">
                        <SearchBar className="z-5" onSearch={handleSearch} />
                    </div>
                </div>
                {/*BOTTOM HEADER*/}
                <div className="w-full flex items-center justify-between">
                    <Link href="/refine">
                        <div className="text-black font-nhg font-medium sm:text-xxs sm:text-black  sm:font-nhg
                        sm:font-medium pl-2">REFINE +</div>
                    </Link>
                    <div className="text-black font-nhg font-medium sm:text-xxs sm:text-black  sm:font-nhg
                    sm:font-medium">
                        <SortMenu/>
                    </div>
                </div>
            </div>
            {cartOpen && <Cart open={cartOpen} setOpen={setCartOpen} />}
        </>




    )
}
export default ShopHeader