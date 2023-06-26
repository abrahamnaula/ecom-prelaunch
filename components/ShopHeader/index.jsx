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
            <div className="h-29px bg-whiteSmk w-screen flex items-center justify-between">
                <Link href="/" passHref>
                    <div className="font-nhg font-medium text-black pl-2">GRAY ERA</div>
                </Link>

                <div className="flex items-center">
                    <div className="text-black font-nhg font-medium">SHOP ALL</div>
                    <img src="/img/arrow.png" alt="Arrow" className="ml-2" />
                </div>


                <div className=" pr-0 z-50">
                    <SearchBar className="z-20" onSearch={handleSearch} />
                </div>
                <div className="pr-5 text-black font-nhg font-medium">BAG 00</div>
            </div>
            <div className="w-screen z-10 h-8 bg-whiteSmk border-t border-gray-400 flex items-center justify-between">
                <div className="text-black font-nhg font-medium pl-2">REFINE +</div>
                <div className="text-black font-nhg font-medium pr-5">SORT</div>
            </div>




        </>
    )
}
export default ShopHeader