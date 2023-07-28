import Link from "next/link";
import SortMenu from "../SortMenu";
import MyLink from "../MyLink"
import SearchBar from "../SearchBar";
import {useCart} from "../../context/CartContext";
import {useState} from "react";
import Cart from "../Cart";
import PopRefine from "../PopRefine";
import {useRouter} from "next/router";
import {useFilter} from "../FilterContext";
export default function WorkHeader({onSortSelect}) {
    const router = useRouter();
    const [cartOpen, setCartOpen] = useState(false);
    const { cart } = useCart(); // Use the CartContext hook
    const showSortandRefine = router.pathname.startsWith('/testing') || router.pathname.startsWith('/search')
    const {
        setSelectedCategory, setSelectedCollection, setSelectedEra,
        setSelectedSizes, setFilterHistory, setFinalFilters, setFormattedFilters
    } = useFilter();

    const handleClear = (event) => {
        // stop the default navigation event
        event.preventDefault();

        setSelectedCategory(null);
        setSelectedCollection(null);
        setSelectedEra(null);
        setSelectedSizes([]);
        setFinalFilters([]);
        setFormattedFilters([]);
        setFilterHistory([]);

        // manually navigate to the homepage
        router.push('/');
    };


    const handleNoRefine = (e) => {
        if(!showSortandRefine){
            alert('Nothing to \'refine\' while viewing a product.')
            e.preventDefault()
        }
    }
    const handleNoSort = (e) => {
        if(!showSortandRefine){
            alert('Nothing to \'sort\' while viewing a product.')
            e.preventDefault()
        }
    }
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
                        <Link href="/" onClick={handleClear} passHref>
                            GRAY ERA
                        </Link>
                    </div>

                <div className="flex-grow ">

                        <div className="sm:w-1/6 w-16 text-black font-nhg font-medium text-xxs sm:text-xxs sm:text-black
                                        sm:font-nhg sm:font-medium pl-2">
                            {showSortandRefine ?
                                <PopRefine/> :
                                    <button onClick={handleNoRefine}
                                            className="font-nhg font-medium text-black w-12 mt-1.5">
                                        REFINE
                                    </button>
                            }

                        </div>

                </div>
            </div>
            <div className="flex-grow text-xxs font-nhg font-medium text-black flex justify-center items-center">
                <div className="flex">
                    <MyLink href="/testing/shop-all">SHOP ALL</MyLink>
                </div>
            </div>

            <div className="flex-grow flex justify-center items-center  text-xxs">
                <SearchBar/>
            </div>
            <div className="flex-grow flex flex-col text-xxs">
                <div className="text-right border-b-2 border-black font-nhg font-medium text-black
                                sm:text-xxs sm:font-nhg sm:font-medium sm:text-black  sm:pr-4
                                ml-auto
                                pb-1.5
                                mg:w-5/6
                                xs:w-18
                                sm:w-3/5
                                md:w-1/3" >
                    {/*{`BAG ${String(cart.length).padStart(2, '0')}`} /!* Display the number of items in the cart *!/*/}
                    <button className="xs:pr-3.5 mg:pr-3.5 sm:pr-0 md:mr-[-10px]" onClick={()=> setCartOpen(true)}>{`BAG ${String(cart.length).padStart(2, '0')}`}</button>

                </div>
                <div className="z-40 flex-grow mt-0 text-xxs pr-2">
                    {showSortandRefine ?
                        <SortMenu onSelect={onSortSelect}/> :
                        <div className="flex justify-end">
                            <button onClick={handleNoSort}
                                    className="font-nhg font-medium text-xxs text-black mt-1.5 pr-3 sm:pr-4">
                                SORT
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
            {cartOpen && <Cart open={cartOpen} setOpen={setCartOpen} />}
        </>

    )
}
