import Nav from "./Nav";
import React from 'react'
export default function Layout({ children }){
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Nav/>
            <main>
                {children}
            </main>
        </div>
    )
}