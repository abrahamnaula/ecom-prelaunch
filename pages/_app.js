import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css'
import BackgroundVideo from "../components/BackgroundVideo";


export default function App({ Component, pageProps }) {
    return (
        <>
            <BackgroundVideo />
            <Component {...pageProps} />
        </>
    );
}
