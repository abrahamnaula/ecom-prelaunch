import React from "react";

function TopHeader() {
    return (
        <div className="w-full h-8 mb-px flex border-b-2 border-black bg-gradient-to-b md:h-12 lg:h-16">
            <div className="w-full h-8 flex justify-center items-center bg-gradient-to-b from-grayBkg to-black md:h-12 lg:h-16">
                <p className="font-neue-haas-grotesk text-white text-center text-sm md:text-base lg:text-lg">
                    FREE SHIPPING ON ALL ORDERS OVER $150
                </p>
            </div>
        </div>
    );
}

export default TopHeader;
