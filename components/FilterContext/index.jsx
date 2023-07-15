import {createContext, useState, useContext, useEffect} from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [collectionName, setCollectionName] = useState(null);

    useEffect(() => {
        const filters = [];
        if (selectedCategory) {
            filters.push(selectedCategory);
        }
        if (selectedCollection) {
            filters.push(selectedCollection);
        }
        if (selectedEra) {
            filters.push(selectedEra);
        }
        filters.push(...selectedSizes);

    }, [selectedCategory, selectedCollection, selectedEra, selectedSizes]);

    const handleFilterClick = (filter, category) => {
        switch (category) {
            case 'categories':
                setSelectedCategory(filter);
                setSelectedFilter('categories');
                break;
            case 'collections':
                setSelectedCollection(filter);
                setSelectedFilter('collections');
                break;
            case 'byEra':
                setSelectedEra(filter);
                setSelectedFilter('byEra');
                break;
            case 'sizes':
                if (!selectedSizes.includes(filter)) {
                    setSelectedSizes(prevFilters => [...prevFilters, filter]);
                }
                setSelectedFilter('sizes');
                break;
            default:
                break;
        }
    };

    const handleRemoveFilter = (filter, category) => {
        switch (category) {
            case 'categories':
                if (selectedCategory === filter) setSelectedCategory(null);
                break;
            case 'collections':
                if (selectedCollection === filter) setSelectedCollection(null);
                break;
            case 'byEra':
                if (selectedEra === filter) setSelectedEra(null);
                break;
            case 'sizes':
                setSelectedSizes(prevFilters => prevFilters.filter(f => f !== filter));
                break;
            default:
                break;
        }
    }

    return (
        <FilterContext.Provider value={{
            selectedCategory, setSelectedCategory,
            selectedCollection, setSelectedCollection,
            selectedEra, setSelectedEra,
            selectedSizes, setSelectedSizes,
            collectionName, setCollectionName,
            selectedFilter, handleFilterClick, handleRemoveFilter, setSelectedFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);