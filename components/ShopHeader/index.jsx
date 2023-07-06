import Link from "next/link";
import SearchBar from "../SearchBar";
import {useState} from "react";
import Cart from "../Cart";
import {useCart} from "../../context/CartContext";
function ShopHeader(){
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = useCart(); // Use the CartContext hook

    const handleSearch = (searchTerm) => {
        console.log(`Searching for "${searchTerm}"`);
        // you can replace this with actual search logic
    }
    return(
        <>
            {/*Top WHite Header*/}
            <div className="h-29px bg-whiteSmk w-full min-w-full overflow-hidden flex items-center justify-between
                            border-x border-gray-400 text-supsm">

                <Link href="/" passHref>
                    <div className="font-nhg font-medium text-black sm:text-xxs pl-2">GRAY ERA</div>
                </Link>

                <div className="flex items-center">
                    <div className="font-nhg font-medium text-black sm:text-xxs">SHOP ALL</div>
                    <img src="/img/arrow.png" alt="Arrow" className="ml-2 h-1.5 sm:h-2" />
                </div>


                <div className=" pr-0 z-5">
                    <SearchBar className="z-5" onSearch={handleSearch} />
                </div>
                <div className="pr-5 font-nhg font-medium text-black sm:font-nhg sm:font-medium
                                 sm:text-black" onClick={()=> setCartOpen(true)}>
                    {`BAG ${String(cart.length).padStart(2, '0')}`} {/* Display the number of items in the cart */}
                </div>
            </div>
            {/*BOTTOM HEADER*/}
            <div className="w-full z-5 h-29px bg-whiteSmk border border-gray-400 flex items-center justify-between text-supsm">
                <div className="text-black font-nhg font-medium sm:text-black  sm:font-nhg
                                sm:font-medium pl-2">REFINE +</div>
                <div className="text-black font-nhg font-medium sm:text-black  sm:font-nhg
                                sm:font-medium pr-5">SORT</div>
            </div>

            {cartOpen && <Cart open={cartOpen} setOpen={setCartOpen} />}



        </>
    )
}
export default ShopHeader