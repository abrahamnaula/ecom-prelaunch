import { useEffect, useState } from 'react';
import Link from "next/link";

function ShopButton() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1000); // start transition after 1 second
        return () => clearTimeout(timer); // cleanup timer in case of unmounting
    }, []);

    return (

        <div className="fixed flex justify-center items-center w-full">
            <Link href="/collections-menu">
                <button className={`w-40 h-10 bg-whiteSmk font-nhg font-medium text-black text-xs transition-opacity duration-1000
                            ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    SHOP
                </button>
            </Link>

        </div>

    );
}
export default ShopButton