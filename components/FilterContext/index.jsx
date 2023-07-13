import { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);

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
            selectedFilter, handleFilterClick, handleRemoveFilter, setSelectedFilter }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);