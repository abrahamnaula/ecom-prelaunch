import React from 'react';

export default function About() {
    return (
        <div className="bg-grayMo h-screen">
            <div className="flex justify-center flex-col items-center font-nhg text-sm font-medium">
                <div className="h-16 w-2/3 bg-red-500 mt-8 mb-4">
                    <button className="flex flex-col items-end">
                        back
                    </button>
                </div>

                <div className="w-1/2">
                    <div className="h-16 bg-blue-500 mb-4">ABOUT US</div>
                    <div className="h-16 bg-green-500 mb-4">
                        Welcome to Gray Area, the exclusive destination for vintage fashion in Charlotte, NC.
                        Our store is a carefully curated selection of unique and timeless pieces that bring an edgy
                        and upscale feel to your wardrobe.
                    </div>
                    <div className="h-16 bg-yellow-500 mb-4">
                        At Gray Area, we believe that vintage fashion is more than just a trend - it&apos;s a lifestyle.
                        That&apos;s why we specialize in hand-selected, one-of-a-kind pieces that you won&apos;t find anywhere
                        else. From retro dresses to classic denim jackets, our selection is a tribute to the iconic
                        styles of the past and the ultimate expression of cool.
                    </div>
                    <div className="h-16 bg-indigo-500 mb-4">
                        Our knowledgeable and passionate staff are dedicated to helping you find the
                        perfect vintage piece to elevate your personal style. We pride ourselves on
                        creating a welcoming and inclusive environment, where every customer is treated
                        like a VIP.
                    </div>
                    <div className="h-16 bg-purple-500 mb-4">
                        Whether you&apos;re a seasoned vintage collector or just starting to discover the
                        magic of vintage, we&apos;re here to help you find something that speaks to you. Our
                        selection is constantly evolving, with new and exciting finds arriving weekly.
                    </div>
                    <div className="h-16 bg-pink-500">
                        <p>CONTACT</p>
                        <p>EMAIL</p>
                        <p>TIKTOK</p>
                        <p>INSTAGRAM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
