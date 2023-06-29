import Header from "../components/Header";
import ShopHeader from "../components/ShopHeader";
import DefaultFooter from "../components/DefaultFooter";
import CollectionMenuList from '../components/CollectionsMenu/CollectionMenuList';
import { fetchCollections } from '../lib/shopify';

function reorderCollections(collections) {
    const order = ["SHOP ALL", "BY ERA", "COLLECTIONS", "CATEGORIES", "SOLD ARCHIVE"];

    return order.map(o => collections.find(c => c.title === o));
}

export default function CollectionsMenu({ collections }) {
    const orderedCollections = reorderCollections(collections);

    return (
        <>
            <div className="fixed top-0 w-full z-50">
                <Header/>
                <ShopHeader/>
            </div>
            <div className="h-29px"></div>
            <div className="h-29px"></div>
            <div className="h-29px"></div>
            <CollectionMenuList collections={orderedCollections} />
            <div className="h-29px bg-black sm:bg-black sm:h-0"></div>
            <div id="top-element" className="-z-50 sm:bg-black"></div>
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
