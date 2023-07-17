import React from 'react'
import {useRouter} from "next/router";
import NewFooter from "../../components/NewFooter";

export default function ShippingReturns() {
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
                        <div>
                            <h2 className="tracking-wide text-decoration-line: underline font-bold">SHIPPING &amp; RETURNS:</h2>
                            <div className="h-4"></div>
                            <p>Orders are processed within 1-3 business days of the purchase date.</p>
                            <div className="h-4"></div>

                            <p>All domestic orders over 16 ounces are shipped via USPS priority mail with an expected delivery time of 2-3 days. Domestic orders under 16 oz will be shipped via USPS first class mail within expected delivery time of 2-5 days depending on location. For faster shipping times for orders under 16 oz, be sure to select the priority mail option at checkout.</p>
                            <div className="h-4"></div>

                            <p>All International orders are shipped via UPS or USPS with an expected delivery time of 1-4 weeks depending on the destination country.</p>
                            <div className="h-4"></div>

                            <p>Once an order has been processed, it cannot be modified or cancelled.</p>
                            <div className="h-4"></div>

                            <p>We are not liable for any lost or stolen packages and claims must be made by the customer to the appropriate carrier.</p>
                            <div className="h-4"></div>

                            <p>International customers may be subject to customs duties and fees, which are out of our control. We cannot cover these fees and have no way of calculating this charge when an order is placed. All customs fees associated with international orders are the sole duty of the buyer upon arrival of your order.</p>
                            <div className="h-4"></div>

                            <p>We do not ship on weekends or holidays.</p>
                            <div className="h-4"></div>

                            <p>If you have questions about the status of your order, please reach out to us via email at: <a className="text-decoration-line: underline" href="mailto:contact@grayeravintage.com" target="_blank" rel="noopener noreferrer">contact@grayeravintage.com</a></p>
                            <div className="h-4"></div>

                            <h2 className="font-bold tracking-wide">RETURNS</h2>
                            <div className="h-4"></div>

                            <p>All sales are final.</p>
                            <div className="h-4"></div>

                            <p>We do not offer refunds, returns, or exchanges.</p>
                            <div className="h-4"></div>

                            <p>We provide detailed photos and measurements of all items in order to accurately describe each item&apos;s fit and condition.</p>
                            <div className="h-4"></div>

                            <p>Note that all garments are second hand and may show varying degrees of wear and tear.</p>
                            <div className="h-4"></div>

                            <p>In the rare occasion that we have made an error with your order, please contact us at <a className="text-decoration-line: underline" href="mailto:info@grayeravintage.com" target="_blank" rel="noopener noreferrer">info@grayeravintage.com</a></p>
                            <div className="h-20"></div>

                        </div>


                    </div>
                </div>
            </div>
            <NewFooter/>
        </>
    );
}