import {useRouter} from "next/router";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/20/solid";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const router = useRouter()
    let startPage, endPage;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages+1;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages+1;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 3;
        }
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
                className={`font-nhg font-medium text-bebe text-xxs sm:text-xs flex justify-center items-center ml-6 p-2 ${currentPage === totalPages + 1 ? 'bg-gray-500' : 'bg-black'}`}
                onClick={() => router.push({ pathname: router.pathname, query: { ...router.query, page: currentPage + 1 } })}
                disabled={currentPage === totalPages + 1}
            >
                NEXT
                <ArrowRightIcon className="text-bebe h-4"/>

            </button>
        </div>
    );
}