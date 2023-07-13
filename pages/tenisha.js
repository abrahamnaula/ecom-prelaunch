import React from 'react'
import WorkHeader from "../components/WorkHeader";
import PopRefine from "../components/PopRefine";
import NewFooter from "../components/NewFooter";

export default function Tenisha() {
    return (
        <div className="w-screen min-w-full max-w-full bg-bebe">

            <WorkHeader/>
            <div className="h-20"></div>
            <div className="h-screen w-screen bg-bebe">
                <PopRefine/>

            </div>
        <NewFooter/>
        </div>
    )
}
