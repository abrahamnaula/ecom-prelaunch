// CollectionsMenu.js

import Header from "../components/Header";
import ShopHeader from "../components/ShopHeader";
import DefaultFooter from "../components/DefaultFooter";
import CollectionMenuList from '../components/CollectionsMenu/CollectionMenuList';
import { fetchCollections } from '../lib/shopify';

export default function CollectionsMenu({ collections }) {
    return (
        <>
            <Header/>
            <ShopHeader/>
            <CollectionMenuList collections={collections} />
            <div id="top-element"></div>
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
