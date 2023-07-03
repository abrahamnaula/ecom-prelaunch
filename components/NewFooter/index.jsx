import React from 'react';

function NewFooter() {
    return (
        <footer className={`w-full h-32 bg-gray-600 bg-opacity-50 flex flex-col justify-between font-ngh transition-all duration-500 ease-in-out transform`}>
            <div className="bg-grayBkg flex">
                <div className="w-1/3 flex flex-col font-normal pt-3.5 mb-0.5">
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">ABOUT & CONTACT</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">SHIPPING & RETURNS</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">SIZING</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">PRIVACY POLICY</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">TERMS OF SERVICE</p>
                </div>
                <div className="w-1/3 flex flex-col sm:flex-row justify-end sm:justify-center items-center py-0.5">
                    <a href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer" className="font-ngh text-base text-xs mb-2 sm:mb-0 sm:mr-2">
                        INSTAGRAM
                    </a>
                    <p className="font-ngh text-base text-xs">TIKTOK</p>
                </div>
            </div>
            <div className="h-10 bg-gradient-to-r from-metallicLeft to-metallicRight"></div>
        </footer>
    );
}

export default NewFooter;
