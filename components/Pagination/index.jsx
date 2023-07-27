import {useRouter} from "next/router";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

export default function Pagination({ currentPage, totalPages, productSize }) {
    const productsPerPage = 60;
    const router = useRouter()

    let startPage, endPage;

    if (productSize < productsPerPage) {
        // Current page is the last page
        startPage = Math.max(1, currentPage - 2);
        endPage = currentPage; // Set endPage as the current page
    } else if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 > totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    // Ensure the current page is always included in the pages array
    if (!(startPage <= currentPage && currentPage <= endPage)) {
        startPage = Math.max(1, currentPage - 2);
        endPage = Math.min(totalPages, currentPage + 2);
    }

    let pages = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i);


    return (
        <div className="pagination flex justify-center items-center">

            <button
                className={`font-nhg font-medium text-bebe text-xxs sm:text-xs flex justify-center items-center p-2 mr-6 ${currentPage === 1 ? 'bg-gray-500' : 'bg-black'}`}
                onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, page: currentPage - 1 } })}
                disabled={currentPage === 1}
            >
                <ArrowLeftIcon className="text-bebe h-4"/>
                PREVIOUS
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    className={`font-nhg font-medium text-black text-xxs sm:text-xs mx-3 px-2 py-1 ${currentPage === page ? 'bg-gray-400' : ''}`}
                    onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, page: page } })}
                >
                    {page}
                </button>
            ))}

            <button
                className={`font-nhg font-medium text-bebe text-xxs sm:text-xs flex justify-center items-center ml-6 p-2 ${currentPage === totalPages || productSize < productsPerPage ? 'bg-gray-500' : 'bg-black'}`}
                onClick={() => {
                    if(productSize === productsPerPage) {
                        router.push({ pathname: router.pathname, query: { ...router.query, page: currentPage + 1 } })
                    }
                }}
                disabled={currentPage === totalPages || productSize < productsPerPage}
            >
                NEXT
                <ArrowRightIcon className="text-bebe h-4"/>
            </button>
        </div>
    );
}