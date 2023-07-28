import {useRouter} from 'next/router';
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

export default function Pagination({ currentPage, totalPages, productSize }) {
    const productsPerPage = 60;
    const router = useRouter()

    let startPage, endPage;

    if (productSize < productsPerPage) {
        // Current page is the last page
        startPage = Math.max(1, currentPage - 2);
        endPage = currentPage; // Set endPage as the current page
    } else if (totalPages <= 3) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            // When current page is among the first three
            startPage = 1;
            endPage = Math.min(3, totalPages);  // Ensure endPage doesn't exceed totalPages
        } else if (currentPage >= totalPages - 2) {
            // When current page is the last page or among the last three
            startPage = Math.max(1, totalPages - 2);  // Ensure startPage is not less than 1
            endPage = totalPages;
        } else {
            // When current page is more than 3 and less than totalPages
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    let pages = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i);

    return (
        <div className="pagination flex justify-center items-center">
            <button
                className={`font-nhg font-medium text-bebe text-xxs sm:text-xs flex justify-center items-center p-2 
                            xs:mr-6 
                            mg:mr-2 ${currentPage === 1 ? 'bg-gray-500' : 'bg-black'}`}
                onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, page: currentPage - 1 } })}
                disabled={currentPage === 1}
            >
                <ArrowLeftIcon className="text-bebe h-4"/>
                PREVIOUS
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    className={`font-nhg font-medium text-black text-xxs sm:text-xs 
                                mg:mx-1.5 xs:mx-3 px-2 py-1 
                                ${currentPage === page ? 'bg-gray-400' : ''}`}
                    onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, page: page } })}
                >
                    {page}
                </button>
            ))}

            <button
                className={`font-nhg font-medium text-bebe text-xxs sm:text-xs flex justify-center items-center 
                            xs:ml-6 
                            p-2 
                            mg:ml-2
                            ${currentPage === totalPages || productSize < productsPerPage ? 'bg-gray-500' : 'bg-black'}`}
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
