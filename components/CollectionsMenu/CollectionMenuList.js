// CollectionMenuList.js

import { useState } from "react";
import CollectionMenuCard from './CollectionMenuCard';

export default function CollectionMenuList({ collections }) {
    const [selectedCard, setSelectedCard] = useState(null); // Keep track of the currently selected card

    return (
        <div className="flex flex-col sm:flex-row hide-scrollbar">
            {collections.map((collection, index) => (
                <CollectionMenuCard
                    key={index}
                    title={collection.title}
                    image={collection.image.url}
                    animationClass={index % 2 === 0 ? 'slide-up' : 'slide-down'}
                    isSelected={collection.title === selectedCard}
                    setSelectedCard={setSelectedCard}
                />
            ))}
        </div>
    );
}
