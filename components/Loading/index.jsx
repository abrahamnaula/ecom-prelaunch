import React from 'react';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="animate-reveal flex flex-col items-center justify-center">
                    <Image src="/new-ge-logo.png" alt="gray era logo" height={199} width={199} />
                    <p className="font-nhg font-medium text-white mt-4 tracking-widest">LOADING...</p>
                </div>
            </div>
        </div>
    );
}
