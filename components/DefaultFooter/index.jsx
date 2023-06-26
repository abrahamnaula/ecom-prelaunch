import { useEffect, useState } from 'react';
import BottomFooter from "../BottomFooter";

function FullFooter() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        const target = document.querySelector('#top-element');
        if (target) observer.observe(target);

        // Cleanup on unmount
        return () => {
            if (target) observer.unobserve(target);
        };
    }, []);

    return (
        <footer className={`fixed bottom-0 left-0 w-full h-32 bg-gray-600 bg-opacity-50 flex flex-col justify-between font-nhg transition-all duration-500 ease-in-out transform ${isFooterVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="flex">  {/* Added "flex" class here */}
                <div className="w-1/3 flex flex-col font-normal pt-3.5 mb-0.5">
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">ABOUT & CONTACT</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">SHIPPING & RETURNS</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">SIZING</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">PRIVACY POLICY</p>
                    <p className="font-ngh text-base tracking-wide pl-2 text-xxs mb-0.5 leading-tight">TERMS OF SERVICE</p>
                </div>

                <div className="w-1/3 flex justify-center items-center py-0.5">  {/* Added "w-1/2" class here */}
                    <p className="font-ngh text-base text-xs">INSTAGRAM</p>
                    <span className="mx-2 text-gray-400"> </span>
                    <p className="font-ngh text-base text-xs">TIKTOK</p>
                </div>
            </div>

            <BottomFooter />
        </footer>
    );
}

export default FullFooter;


