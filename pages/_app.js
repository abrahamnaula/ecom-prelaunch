import '../styles/globals.css'
import '../styles/animations.css'
import React, {useEffect} from "react";
export default function App({ Component, pageProps }) {
    useEffect(() => {
        function setVhVariable() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setVhVariable();
        window.addEventListener('resize', setVhVariable);

        return () => {
            window.removeEventListener('resize', setVhVariable);
        };
    }, []);
    return (
            <Component {...pageProps} />
    );
}

