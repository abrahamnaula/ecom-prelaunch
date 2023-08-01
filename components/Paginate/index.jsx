import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

export default function Paginate({ MAX, productCount, cursorIndex, cursors, products, handlePrevClick, handleNextClick }) {
    const totalNumPages = Math.ceil(productCount / MAX);
    const startPage = Math.max(cursorIndex, 1);
    const endPage = Math.min(startPage + 2, totalNumPages);

    return (
        <div className="flex justify-center items-center my-2">
            <button className="font-nhg font-medium text-bebe bg-black text-xxs sm:text-xs flex justify-center items-center p-2"
                    onClick={handlePrevClick} disabled={cursorIndex <= 0}>
                <ArrowLeftIcon className="text-bebe h-4"/>
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
                            onClick={() => { if (pageNumber !== cursorIndex) { fetchProducts(pageNumber - 1); setCursorIndex(pageNumber - 1); } }}
                            disabled={pageNumber === cursorIndex}>
                        {pageNumber}
                    </button>
                );
            })}
            <button className="font-nhg font-medium bg-black text-bebe text-xxs sm:text-xs flex justify-center items-center p-2"
                    onClick={handleNextClick}
                    disabled={(cursorIndex >= cursors.length - 1) || (products.length < MAX)}>
                NEXT
                <ArrowRightIcon className="text-bebe h-4"/>
            </button>
        </div>
    );
}