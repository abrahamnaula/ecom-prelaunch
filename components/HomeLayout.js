import React from 'react'
import TopHeader from "./TopHeader";
import FullFooter from "./FullFooter";
import Header from "./Header";
export default function HomeLayout({ children }){
    return (
        <>
            <Header/>
            <TopHeader/>
            {children}
            <FullFooter/>
        </>
    )
}