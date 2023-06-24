import '../styles/globals.css'
import BackgroundVideo from "../components/BackgroundVideo";
import Logo from "../components/Logo";
import React from "react";


export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

