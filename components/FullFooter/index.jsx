import BottomFooter from "../BottomFooter";
import React from "react";

function FullFooter(){
    return(
        <footer className={"fixed bottom-0 left-0 w-full h-40 bg-gray-400 flex flex-col justify-between font-nhg"}>
            <div className={"flex flex-col font-normal pt-1.5"}>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>ABOUT & CONTACT</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>SHIPPING & RETURNS</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>SIZING</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>PRIVACY POLICY</p>
                <p className={"font-ngh text-base tracking-wide pl-5 text-sm"}>TERMS OF SERVICE</p>


            </div>

            <BottomFooter/>
        </footer>

    )
}
export default FullFooter