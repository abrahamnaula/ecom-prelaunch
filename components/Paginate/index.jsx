import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

export default function Paginate({ MAX, productCount, cursorIndex, cursors, products, handlePrevClick, handleNextClick, fetchProducts, setCursorIndex }) {
    const totalNumPages = Math.ceil(productCount / MAX) ;
    //console.log('PRODUCT COUNT: ', productCount)
    let startPage, endPage;
    if (totalNumPages <= 3) {
        startPage = 1;
        endPage = totalNumPages;
    } else {
        if (cursorIndex <= 1) {
            startPage = 1;
            endPage = 3;
        } else if (cursorIndex + 1 >= totalNumPages) {
            startPage = totalNumPages - 2;
            endPage = totalNumPages;
        } else {
            startPage = cursorIndex;
            endPage = cursorIndex + 2;
        }
    }

    return (
        <div className="flex justify-center items-center my-2">
            <button className={`font-nhg font-medium text-xxs sm:text-xs flex justify-center items-center p-2 
                ${cursorIndex <= 0 ? "text-black bg-gray-500" : "text-bebe bg-black"}`}
                    onClick={handlePrevClick}
                    disabled={cursorIndex <= 0}>
                <ArrowLeftIcon className="h-4"/>
                PREVIOUS
            </button>
            {[...Array(endPage - startPage + 1)].map((_, i) => {
                const pageNumber = startPage + i;
                return (
                    <button key={pageNumber}
                            className={`font-nhg font-medium text-black text-xxs sm:text-xs 
                                         flex justify-center items-center  
                                          mg:mx-1.5 xs:mx-3 px-2 py-1
                                         ${pageNumber === cursorIndex+1 ? 'bg-gray-400' : ''}`}
                            onClick={() => { { fetchProducts(pageNumber - 1); setCursorIndex(pageNumber - 1); window.scrollTo(0,0)} }}
                            >
                        {pageNumber}
                    </button>
                );
            })}
            <button className={`font-nhg font-medium text-xxs sm:text-xs flex justify-center items-center p-2 
                ${(cursorIndex >= cursors.length - 1) || (products.length < MAX) ? "text-black bg-gray-500" : "text-bebe bg-black"}`}
                    onClick={handleNextClick}
                    disabled={(cursorIndex >= cursors.length - 1) || (products.length < MAX)}>
                NEXT
                <ArrowRightIcon className="h-4"/>
            </button>
        </div>
    );
}
