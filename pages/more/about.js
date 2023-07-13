import React from 'react';
import NewFooter from "../../components/NewFooter";
import {useRouter} from "next/router";


export default function About() {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };
    return (
        <>
        <div className="bg-grayMo min-h-screen flex flex-col items-center">
            <div className="flex justify-center flex-col items-center font-nhg text-xxs sm:text-sm font-medium flex-1">
                <div className="h-16 w-2/3  mt-8 mb-4">
                    <button className="flex flex-col items-end border border-white p-2"
                            onClick={handleGoBack}>
                        BACK
                    </button>
                </div>

                <div className="w-2/3 flex-1">
                    <h1 className="mb-4 underline font-bold tracking-wide">ABOUT & CONTACT:</h1>
                    <p className="mb-4">
                        Gray Era is an online vintage store that currently operates out of Charlotte, NC.
                    </p>
                    <p className="mb-4">
                        Each decade over the past 100 years provided us with a unique interpretation on the meaning and purpose of the clothes we wear. At Gray Era, we emphasize sourcing vintage garments that allow our customers to visualize what we consider the best of these distinct interpretations and decide what most resonates with them. Every single product we provide is deliberately handpicked by our sole owner, Michael Gray.
                    </p>
                    <h2 className="mb-4 tracking-wide font-bold">
                        CONTACT US:
                    </h2>
                    <p>
                        Direct Messaging
                    </p>
                    <p className="mb-4">
                        <a className="font-semibold text-decoration-line: underline" href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer">@gray_era</a>
                    </p>
                    <p>
                        Customer Service
                    </p >
                    <a  className="font-semibold text-decoration-line: underline" href="mailto:contact@grayeravintage.com">contact@grayeravintage.com</a>
                    <p className="mt-4">
                        Other Inquiries
                    </p>
                    <a className="font-semibold text-decoration-line: underline" href="mailto:Info@grayeravintage.com">
                        Info@grayeravintage.com
                    </a>

                </div>
            </div>
        </div>
            <NewFooter/>
        </>
    );
}

/*

import React from 'react';
import { useRouter } from 'next/router';
import NewFooter from "../../components/NewFooter";

export default function About() {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className="bg-grayMo min-h-screen flex flex-col">
            <div className="flex justify-center flex-col items-center font-nhg text-xxs sm:text-sm font-medium flex-1">
                <div className="h-16 w-2/3  mt-8 mb-4">
                    <button className="flex flex-col items-end border border-white p-2"
                            onClick={handleGoBack}>
                        BACK
                    </button>
                </div>

                <div className="w-2/3 flex-1">
                    <h1 className="mb-4 underline font-bold tracking-wide">ABOUT & CONTACT:</h1>
                    <p className="mb-4">
                        Gray Era is an online vintage store that currently operates out of Charlotte, NC.
                    </p>
                    <p className="mb-4">
                        Each decade over the past 100 years provided us with a unique interpretation on the meaning and purpose of the clothes we wear. At Gray Era, we emphasize sourcing vintage garments that allow our customers to visualize what we consider the best of these distinct interpretations and decide what most resonates with them. Every single product we provide is deliberately handpicked by our sole owner, Michael Gray.
                    </p>
                    <h2 className="mb-4 tracking-wide font-bold">
                        CONTACT US:
                    </h2>
                    <p>
                        Direct Messaging
                    </p>
                    <p className="mb-4">
                        <a className="font-semibold text-decoration-line: underline" href="https://www.instagram.com/gray_era/" target="_blank" rel="noopener noreferrer">@gray_era</a>
                    </p>
                    <p>
                        Customer Service
                    </p >
                    <a  className="font-semibold text-decoration-line: underline" href="mailto:contact@grayeravintage.com">contact@grayeravintage.com</a>
                    <p className="mt-4">
                        Other Inquiries
                    </p>
                    <a className="font-semibold text-decoration-line: underline" href="mailto:Info@grayeravintage.com">
                        Info@grayeravintage.com
                    </a>

                </div>
            </div>
            <div className="h-12"></div>
            <NewFooter />
        </div>
    );
}


 */