import { createContext, useState, useContext, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [selectedEra, setSelectedEra] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [collectionName, setCollectionName] = useState(null);
    const [filterHistory, setFilterHistory] = useState([]);

    const categories = new Map([
        ["shirts", "SHIRTS"],
        ["tees", "TEES"],
        ["bottoms", "BOTTOMS"],
        ["outerwear", "OUTERWEAR"],
        ["sweatshirts", "SWEATSHIRTS"],
        ["headwear", "HEADWEAR"],
        ["everything-else", "EVERYTHING ELSE"]
    ]);

    const collections = new Map([
        ["music-art-film", "MUSIC, ART, & FILM"],
        ["denim-workwear-military", "DENIM, WORKWEAR, & MILITARY"],
        ["sportswear-streetwear", "SPORTSWEAR & STREETWEAR"],
        ["blanks-essentials", "BLANKS & ESSENTIALS"],
        ["women", "WOMEN"]
    ]);

    const eras = new Map([
        ["y2k", "Y2K"],
        ["1990s", "1990s"],
        ["1980s", "1980s"],
        ["1970s", "1970s"],
        ["pre-1970s", "PRE 1970s"]
    ]);

    const topsSizes = new Map([
        ["X-Small", "X-SMALL"],
        ["Small", "SMALL"],
        ["Medium", "MEDIUM"],
        ["Large", "LARGE"],
        ["X-Large", "X-LARGE"],
        ["XX-Large", "XX-LARGE"],
        ["XXX-Large", "XXX-LARGE"]
    ]);

    const bottomsSizes = new Map(
        Array.from({ length: 16 }, (_, i) => [String(i + 25), String(i + 25)])
    );

    const outerwearSizes = new Map([
        ["X-Small", "X-SMALL"],
        ["Small", "SMALL"],
        ["Medium", "MEDIUM"],
        ["Large", "LARGE"],
        ["X-Large", "X-LARGE"],
        ["XX-Large", "XX-LARGE"],
        ["XXX-Large", "XXX-LARGE"]
    ]);


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
        setFilterHistory(prevHistory => [...prevHistory, filters]);
    }, [selectedCategory, selectedCollection, selectedEra, selectedSizes]);

    const handleFilterClick = (filter, category) => {
        switch (category) {
            case "categories":
                setSelectedCategory(filter);
                setSelectedFilter("categories");
                break;
            case "collections":
                setSelectedCollection(filter);
                setSelectedFilter("collections");
                break;
            case "byEra":
                setSelectedEra(filter);
                setSelectedFilter("byEra");
                break;
            case "sizes":
                if (!selectedSizes.includes(filter)) {
                    setSelectedSizes(prevFilters => [...prevFilters, filter]);
                }
                setSelectedFilter("sizes");
                break;
            default:
                break;
        }
    };

    const handleRemoveFilter = (filter, category) => {
        switch (category) {
            case "categories":
                if (selectedCategory === filter) setSelectedCategory(null);
                break;
            case "collections":
                if (selectedCollection === filter) setSelectedCollection(null);
                break;
            case "byEra":
                if (selectedEra === filter) setSelectedEra(null);
                break;
            case "sizes":
                setSelectedSizes(prevFilters => prevFilters.filter(f => f !== filter));
                break;
            default:
                break;
        }
    };

    console.log("Filter History:", filterHistory);

    return (
        <FilterContext.Provider
            value={{
                selectedCategory,
                setSelectedCategory,
                selectedCollection,
                setSelectedCollection,
                selectedEra,
                setSelectedEra,
                selectedSizes,
                setSelectedSizes,
                collectionName,
                setCollectionName,
                selectedFilter,
                handleFilterClick,
                handleRemoveFilter,
                setSelectedFilter,
                categories, // Provide the categories Map
                collections, // Provide the collections Map
                eras, // Provide the eras Map
                topsSizes, // Provide the topsSizes Map
                bottomsSizes, // Provide the bottomsSizes Map
                outerwearSizes // Provide the outerwearSizes Map
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => useContext(FilterContext);
