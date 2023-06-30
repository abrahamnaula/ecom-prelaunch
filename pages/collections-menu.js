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
            <CollectionMenuList collections={orderedCollections} />
        </>
    );
}

export async function getStaticProps() {
    const collectionsData = await fetchCollections();
    return {
        props: { collections: collectionsData },
    }
}