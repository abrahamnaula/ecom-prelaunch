import Link from "next/link";
import SortMenu from "../SortMenu";
import MyLink from "../MyLink"
import SearchBar from "../SearchBar";
import {useCart} from "../../context/CartContext";
import {useState} from "react";
import Cart from "../Cart";
import PopRefine from "../PopRefine";
export default function WorkHeader() {
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = useCart(); // Use the CartContext hook
    return (
        <>
        <div className="w-full flex bg-bebe fixed px-0 py-2
                        border-b border-black">
            <div className="flex-grow flex flex-col ">

                    <div className="font-nhg font-medium text-black text-xxs
                                    mg:w-5/6
                                    xs:w-18
                                    sm:w-3/5 sm:text-xxs pl-2 border-b-2 border-black
                                    md:w-1/3
                                    pb-1.5">
                        <Link href="/" passHref>
                            GRAY ERA
                        </Link>
                    </div>

                <div className="flex-grow ">

                        <div className="sm:w-1/6 w-16 text-black font-nhg font-medium text-xxs sm:text-xxs sm:text-black  sm:font-nhg
                                        sm:font-medium pl-2 ">

                                <PopRefine/>

                        </div>

                </div>
            </div>
            <div className="flex-grow text-xxs font-nhg font-medium text-black flex justify-center items-center">
                <div className="flex">
                    <MyLink href="/collections/shop-all">SHOP ALL</MyLink>
                </div>
            </div>

            <div className="flex-grow flex justify-center items-center  text-xxs">
                <SearchBar/>
            </div>
            <div className="flex-grow flex flex-col text-xxs">
                <div className="text-right border-b-2 border-black font-nhg font-medium text-black
                                sm:text-xxs sm:font-nhg sm:font-medium sm:text-black  sm:pr-4
                                ml-auto
                                pb-1.5 pr-4
                                mg:w-5/6
                                xs:w-18
                                sm:w-3/5
                                md:w-1/3" >
                    {/*{`BAG ${String(cart.length).padStart(2, '0')}`} /!* Display the number of items in the cart *!/*/}
                    <button onClick={()=> setCartOpen(true)}>BAG</button>

                </div>
                <div className="z-40 flex-grow mt-0 text-xxs pr-2">
                    <SortMenu/>
                </div>
            </div>


        </div>
            {cartOpen && <Cart open={cartOpen} setOpen={setCartOpen} />}
        </>

    )
}
