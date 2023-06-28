import '../styles/globals.css'
import '../styles/animations.css'
import React from "react";
export default function App({ Component, pageProps }) {
    return (
            <Component {...pageProps} />
    );
}

