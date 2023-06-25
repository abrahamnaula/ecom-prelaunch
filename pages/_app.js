import '../styles/globals.css'
import BackgroundVideo from "../components/BackgroundVideo";
import Logo from "../components/Logo";
import React from "react";
import Layout from "../components/Layout";


export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

