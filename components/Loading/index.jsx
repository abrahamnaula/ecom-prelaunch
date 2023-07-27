import React from 'react';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="h-screen w-screen bg-black ">
                <p className="font-nhg font-medium text-white tracking-widest p-1">LOADING...</p>
        </div>
    );
}
