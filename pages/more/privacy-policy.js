import React from 'react'
import {useRouter} from "next/router";
import NewFooter from "../../components/NewFooter";

export default function PrivacyPolicy() {
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


                    </div>
                </div>
            </div>
            <NewFooter/>
        </>
    );
}
