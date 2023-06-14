import '@aws-amplify/ui-react/styles.css';
import DivAnnouncementbar from "../components/DivAnnouncementbar";

import HomeDesktop from "./HomeDesktop";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
