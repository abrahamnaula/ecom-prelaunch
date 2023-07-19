import React from 'react';
import Link from "next/link";

function NewFooter() {
    return (
        <footer>
            <div className="font-nhg bg-grayBkg flex">
                <div className="w-1/3 flex flex-col font-normal py-2 mb-0.5 mt-0 text-supsm">
                    <Link href="/more/about"
                          className="font-nhg w-20 sm:w-28 font-medium text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">
                        ABOUT & CONTACT
                    </Link>
                    <Link href="/more/shipping-&-returns"
                          className="w-[85px] sm:w-[123px] font-ngh font-medium text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">SHIPPING & RETURNS
                    </Link>
                    <Link href="/more/sizing"
                          className="w-[33px] sm:w-12 font-ngh font-medium text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">SIZING
                    </Link>
                    <Link href="/more/privacy-policy"
                          className="w-[68px] sm:w-24 font-ngh font-medium text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">PRIVACY POLICY
                    </Link>
                    <Link href="/more/terms-of-service"
                          className="w-[77px] sm:w-28 font-ngh font-medium text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">TERMS OF SERVICE
                    </Link>
                </div>
                <div className="w-1/3 flex flex-col sm:flex-row justify-end sm:justify-center items-center py-0.5 text-supsm sm:text-sm">
                    <a href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer"
                       className="font-ngh text-base font-medium text-white mb-2 sm:mb-0 sm:mr-2
                       sm:text-xxs text-supsm sm:block hidden">
                        INSTAGRAM
                    </a>
                    <a href="https://www.tiktok.com/@mikegrayera/" target="_blank" rel="noopener noreferrer"
                        className="font-ngh text-base font-medium text-supsm text-white sm:text-xxs sm:block hidden">TIKTOK</a>
                </div>
                <div className="flex flex-col items-end flex-grow justify-center">
                    <a href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer"
                       className="font-nhg font-medium pr-2 pb-2 text-white text-supsm sm:text-xxs sm:hidden block">INSTAGRAM</a>
                    <a href="https://www.tiktok.com/@mikegrayera/" target="_blank" rel="noopener noreferrer"
                        className="font-nhg font-medium pr-2 text-white text-supsm sm:text-xxs sm:hidden block">TIKTOK</a>
                </div>
            </div>
            <div className="h-10 sm:h-24 bg-gradient-to-r from-metallicLeft to-metallicRight text-black
                            font-nhg font-medium text-supsm sm:text-xxs p-2">
                © GRAY ERA 2023</div>
        </footer>
    );
}

export default NewFooter;
