import { useEffect, useState } from 'react';
import Link from "next/link";

function ShopButton() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1000); // start transition after 1 second
        return () => clearTimeout(timer); // cleanup timer in case of unmounting
    }, []);

    return (

        <div className="fixed flex justify-center items-center w-full h-screen">
            <Link href="/collections-menu">
                <button className={`mt-32 w-32 h-8 bg-whiteSmk font-nhg font-medium text-black transition-opacity duration-1000
                            ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    SHOP
                </button>
            </Link>

        </div>

    );
}
export default ShopButton

/*


import { useEffect, useState } from 'react';
import Image from 'next/image';
import Index from "../Scrollable";

function Logo() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 1000); // start transition after 1 second
        return () => clearTimeout(timer); // cleanup timer in case of unmounting
    }, []);

    return (
        <div className={`fixed flex justify-center items-center w-full h-screen transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Image src="/new-ge-logo.png" alt="gray era logo" height={66} width={250}/>
        </div>
    );
}

export default Logo;




 */