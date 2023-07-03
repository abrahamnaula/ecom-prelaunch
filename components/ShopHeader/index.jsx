import Link from "next/link";
import SearchBar from "../SearchBar";

function ShopHeader(){
    const handleSearch = (searchTerm) => {
        console.log(`Searching for "${searchTerm}"`);
        // you can replace this with actual search logic
    }
    return(
        <>
            {/*Top WHite Header*/}
            <div className="h-29px bg-whiteSmk w-full min-w-full overflow-hidden flex items-center justify-between">

            <Link href="/" passHref>
                    <div className="font-nhg font-medium text-black text-xxs sm:text-xxs pl-2">GRAY ERA</div>
                </Link>

                <div className="flex items-center">
                    <div className="font-nhg font-medium text-black text-xxs sm:text-xxs">SHOP ALL</div>
                    <img src="/img/arrow.png" alt="Arrow" className="ml-2 h-1.5 sm:h-2" />
                </div>


                <div className=" pr-0 z-50">
                    <SearchBar className="z-20" onSearch={handleSearch} />
                </div>
                <div className="pr-5 font-nhg font-medium text-black text-xxs sm:font-nhg sm:font-medium
                                 sm:text-black">BAG 00</div>
            </div>
            {/*BOTTOM HEADER*/}
            <div className="w-full z-10 h-29px bg-whiteSmk border-t border-gray-400 flex items-center justify-between">
                <div className="text-black text-xxs font-nhg font-medium sm:text-black  sm:font-nhg
                                sm:font-medium pl-2">REFINE +</div>
                <div className="text-black text-xxs font-nhg font-medium sm:text-black  sm:font-nhg
                                sm:font-medium pr-5">SORT</div>
            </div>




        </>
    )
}
export default ShopHeader