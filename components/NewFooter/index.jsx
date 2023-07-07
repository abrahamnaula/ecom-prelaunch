import React from 'react';

function NewFooter() {
    return (
        <footer>
            <div className="bg-grayBkg flex">
                <div className="w-1/3 flex flex-col font-normal py-2 mb-0.5 mt-0 text-supsm">
                    <p className="font-ngh text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">ABOUT & CONTACT</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">SHIPPING & RETURNS</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">SIZING</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">PRIVACY POLICY</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-supsm sm:text-xxs text-white mb-0.5 leading-tight">TERMS OF SERVICE</p>
                </div>
                <div className="w-1/3 flex flex-col sm:flex-row justify-end sm:justify-center items-center py-0.5 text-supsm sm:text-sm">
                    <a href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer"
                       className="font-ngh text-base text-white mb-2 sm:mb-0 sm:mr-2
                       sm:text-xxs text-supsm sm:block hidden">
                        INSTAGRAM
                    </a>
                    <p className="font-ngh text-base text-supsm text-white sm:text-xxs sm:block hidden">TIKTOK</p>
                </div>
                <div className="flex flex-col items-end flex-grow justify-center">
                    <a href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer"
                       className="pr-2 pb-2 text-white text-supsm sm:text-xxs sm:hidden block">INSTAGRAM</a>
                    <p className="pr-2 text-white text-supsm sm:text-xxs sm:hidden block">TIKTOK</p>
                </div>
            </div>
            <div className="h-10 sm:h-24 bg-gradient-to-r from-metallicLeft to-metallicRight text-black
                            font-nhg text-supsm sm:text-xxs p-1">
                © GRAY ERA 2023</div>
        </footer>
    );
}

export default NewFooter;
