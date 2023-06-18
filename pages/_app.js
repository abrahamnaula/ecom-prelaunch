import '@aws-amplify/ui-react/styles.css';
import '../styles/globals.css'


export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
