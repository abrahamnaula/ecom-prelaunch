import React from 'react'
import {useRouter} from "next/router";
import NewFooter from "../../components/NewFooter";

export default function Sizing() {
    const router = useRouter();
    const handleGoBack = () => {
        router.back();
    };
    return (
        <>
            <div className="bg-bebe text-black text-transform: uppercase min-h-screen flex flex-col items-center">
                <div className="flex justify-center flex-col items-center font-nhg text-xxs sm:text-sm font-medium flex-1">
                    <div className="h-16 w-2/3  mt-8 mb-4">
                        <button className="flex flex-col items-end border border-black p-2"
                                onClick={handleGoBack}>
                            BACK
                        </button>
                    </div>

                    <div className="w-2/3 flex-1 pb-8">
                        {/*CONTENTS*/}
                        <h1 className="mb-4 text-decoration-line: underline font-bold tracking-wide">SIZING</h1>
                        <div className="h-4"></div>
                        <p>Sizing is determined by the garment&apos;s measurements, not the size tag.</p>
                        <div className="h-4"></div>

                        <p>Due to the nature of vintage and secondhand garments; tagged sizes do not always reflect the actual size. All sizing is judged and labeled according to the measurements of each item. For example, a 1970s t-shirt that is tagged an extra large, may fit like a medium. This product will be listed as a size medium, not an extra large.</p>
                        <div className="h-4"></div>

                        <p>Measurements are provided on each product under the &quot;measurements&quot; tab.</p>
                        <div className="h-4"></div>

                        <p>Chest: All chest measurements are measured from pit to pit.</p>
                        <div className="h-4"></div>

                        <p>Length: All length measurements are measured from the top of the shoulder (where it meets the collar) down to the bottom hem.</p>
                        <div className="h-4"></div>

                        <p>If you don&apos;t know your measurements, we encourage you to take some of your favorite fitting garments and follow the guide above to determine your ideal measurements when shopping at Gray Era.</p>
                        <div className="h-4"></div>

                        <p>Note: While all items are carefully measured, please allow the possibility of a slight difference due to manual measurements.</p>

                    </div>
                </div>
            </div>
            <NewFooter/>
        </>
    );
}