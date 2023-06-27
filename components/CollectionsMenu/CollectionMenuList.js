// CollectionMenuList.js

import CollectionMenuCard from './CollectionMenuCard';

export default function CollectionMenuList({ collections }) {
    return (
        <div className="flex overflow-x-scroll pb-5 hide-scrollbar">
            {collections.map((collection, index) => (
                <CollectionMenuCard
                    key={index}
                    title={collection.title}
                    image={collection.image.url}
                />
            ))}
        </div>
    );
}
