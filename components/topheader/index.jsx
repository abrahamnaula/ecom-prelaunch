import React from "react";

function topheader() {
    return (
        <div className="w-full h-8 mb-px flex border-b-2 border-black bg-gradient-to-b">
            <div className="w-full h-8 flex justify-center items-center bg-gradient-to-b from-grayBkg to-black">
                <p className="font-neue-haas-grotesk text-white text-center text-sm">
                    FREE SHIPPING ON ALL ORDERS OVER $150
                </p>
            </div>
        </div>
    );
}

export default topheader;
