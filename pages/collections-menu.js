// CollectionsMenu.js

import Header from "../components/Header";
import ShopHeader from "../components/ShopHeader";
import DefaultFooter from "../components/DefaultFooter";
import CollectionMenuList from '../components/CollectionsMenu/CollectionMenuList';
import { fetchCollections } from '../lib/shopify';

export default function CollectionsMenu({ collections }) {
    return (
        <>
            <div className="fixed top-0 w-full z-50">
                <Header/>
                <ShopHeader/>
            </div>
            <div className="h-29px"></div>
            <div className="h-29px"></div>
            <div className="h-29px"></div>
            <CollectionMenuList collections={collections} />
            <div className="h-29px sm:h-0"></div>
            <div id="top-element" className="bg-black"></div>
            <DefaultFooter/>
        </>
    );
}

export async function getStaticProps() {
    const collectionsData = await fetchCollections();
    return {
        props: { collections: collectionsData },
    }
}
