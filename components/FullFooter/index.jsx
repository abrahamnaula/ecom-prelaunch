import { useEffect, useState } from 'react';
import BottomFooter from "../BottomFooter";

function FullFooter() {
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(!entry.isIntersecting);
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
        <footer className={`fixed bottom-0 left-0 w-full h-40 bg-gray-400 flex flex-col justify-between font-nhg transition-all duration-500 ease-in-out transform ${isFooterVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className={"flex flex-col font-normal pt-1.5"}>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>ABOUT & CONTACT</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>SHIPPING & RETURNS</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>SIZING</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>PRIVACY POLICY</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>TERMS OF SERVICE</p>
            </div>
            <BottomFooter/>
        </footer>
    );
}

export default FullFooter;


