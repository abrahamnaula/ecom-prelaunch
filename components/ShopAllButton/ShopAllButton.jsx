// components/ShopAllButton.jsx
import React from 'react';
import Link from 'next/link';

const ShopAllButton = () => {
    return (
        <div className= "z-10 flex justify-center items-center min-h-screen" style={{ marginTop: '40%' }}>
            <Link href="/pages/shop-all">
                <button className="bg-grayBkg items-center">Go to Shop-All Page</button>
            </Link>
        </div>
    );
};


export default ShopAllButton;
