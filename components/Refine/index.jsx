import React, {useEffect, useState} from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import {useRouter} from "next/router";
import { useFilter } from "../FilterContext";
import { useProducts } from "../../context/ProductsContext";

const FilterMenu = () => {
    const {
        selectedCategory, selectedCollection, selectedEra, selectedSizes,
        selectedFilter, handleFilterClick, handleRemoveFilter, setSelectedFilter,
        setSelectedCategory, setSelectedCollection, setSelectedEra,
        setSelectedSizes, filterHistory, setFilterHistory, reference,
        finalFilters, setFinalFilters, formattedFilters, setFormattedFilters
    } = useFilter();
    const initialProducts = useProducts()
    const [products, setProducts] = useState(initialProducts);

    const router = useRouter();
    //let tags = [selectedCategory, selectedCollection, selectedEra]
    const handleClear = () => {
        setSelectedCategory(null);
        setSelectedCollection(null);
        setSelectedEra(null);
        setSelectedSizes([]);
        setFinalFilters([]);
        setFormattedFilters([]);
    };

    const handleCancel = () => {
        router.reload();
    };
    const handleApply = () => {
        if (filterHistory.length > 0) {
            const finalFilters = filterHistory[filterHistory.length - 1];
            setFinalFilters(finalFilters);
            applyFilters(finalFilters);
            setFilterHistory([]);
        }
        console.log('applied')
    };
    const applyFilters = async (filters) => {
        // Format the selected filters
        const formatted = filters.map(filter => reference.get(filter) || filter);
        // Update the formattedFilters state
        setFormattedFilters(formatted);
    };

    const CategoriesFilter = () => {
        const categories = new Map([
            ["SHIRTS", "shirts"],
            ["TEES", "tees"],
            ["BOTTOMS", "bottoms"],
            ["OUTERWEAR", "outerwear"],
            ["SWEATSHIRTS", "sweatshirts"],
            ["HEADWEAR", "headwear"],
            ["EVERYTHING ELSE", "everything-else"]
        ]);

        return (
            <div className="pl-2 text-black py-1 flex flex-col">
                {Array.from(categories, ([key]) => (
                    <button className="mb-2 text-left" onClick={() => handleFilterClick(key, 'categories')} key={key}>{key}</button>
                ))}
            </div>
        );
    };

    const CollectionsFilter = () => {
        const collections = new Map([
            ["MUSIC, ART, & FILM", "music-art-film"],
            ["DENIM, WORKWEAR, & MILITARY", "denim-workwear-military"],
            ["SPORTSWEAR & STREETWEAR", "sportswear-streetwear"],
            ["BLANKS & ESSENTIALS", "blanks-essentials"],
            ["WOMEN", "women"]
        ]);

        return (
            <div className="pl-2 text-black py-1 flex flex-col">
                {Array.from(collections, ([key]) => (
                    <button className="mb-2 text-left" onClick={() => handleFilterClick(key, 'collections')} key={key}>{key}</button>
                ))}
            </div>
        );
    }

    const ByEraFilter = () => {
        const eras = new Map([
            ["Y2K", "y2k"],
            ["1990s", "1990s"],
            ["1980s", "1980s"],
            ["1970s", "1970s"],
            ["PRE 1970s", "pre-1970s"]
        ]);

        return (
            <div className="pl-2 text-black py-1 flex flex-col">
                {Array.from(eras, ([key]) => (
                    <button className="mb-2 text-left" onClick={() => handleFilterClick(key, 'byEra')} key={key}>{key}</button>
                ))}
            </div>
        );
    }

    const SizesFilter = () => {
        const topsSizes = new Map([
            ["X-SMALL", "X-Small"],
            ["SMALL", "Small"],
            ["MEDIUM", "Medium"],
            ["LARGE", "Large"],
            ["X-LARGE", "X-Large"],
            ["XX-LARGE", "XX-Large"],
            ["XXX-LARGE", "XXX-Large"]
        ]);
        const bottomsSizes = new Map(Array.from({length: 16}, (_, i) => [String(i+25), String(i+25)]));
        const outerwearSizes = new Map([
            ["X-SMALL", "X-Small"],
            ["SMALL", "Small"],
            ["MEDIUM", "Medium"],
            ["LARGE", "Large"],
            ["X-LARGE", "X-Large"],
            ["XX-LARGE", "XX-Large"],
            ["XXX-LARGE", "XXX-Large"]
        ]);
        useEffect(() => {
            console.log("Formatted Filters:", formattedFilters);
        }, [formattedFilters]);

        return (
            <div className="pl-2 text-black py-1">
                <div className="pb-1.5 tracking-wide font-semibold">TOPS SIZE</div>
                <div className="flex pb-5 flex-wrap md:flex-nowrap">
                    {Array.from(topsSizes, ([key]) => (
                        <button className="pr-12" onClick={() => handleFilterClick(key, 'sizes')} key={key}>{key}</button>
                    ))}
                </div>
                <div className="pb-1.5 tracking-wide font-semibold">BOTTOMS SIZE</div>
                <div className="flex pb-5 flex-wrap md:flex-nowrap">
                    {Array.from(bottomsSizes, ([key]) => (
                        <button className="pr-6" onClick={() => handleFilterClick(key, 'sizes')} key={key}>{key}</button>
                    ))}
                </div>
                <div className="pb-1.5 tracking-wide font-semibold">OUTERWEAR SIZE</div>
                <div className="flex pb-5 flex-wrap md:flex-nowrap">
                    {Array.from(outerwearSizes, ([key]) => (
                        <button className="pr-12" onClick={() => handleFilterClick(key, 'sizes')} key={key}>{key}</button>
                    ))}
                </div>
            </div>
        );
    };



    const SelectedFilter = ({ filter, handleRemove }) => {
        return (
            <div className="bg-gray-400 mt-2 h-4  sm:h-8 px-0.5 sm:px-2 py-1 mr-1 sm:mr-2  mb-0.5 sm:mb-2 flex items-center text-s5">
                <span>{filter}</span>
                <XMarkIcon onClick={() => handleRemove(filter)} className="ml-2 h-3 w-3 sm:h-4 sm:w-4 cursor-pointer" />
            </div>
        );
    };



    const allSelectedFilters = [
        ...(selectedCategory ? [selectedCategory] : []),
        ...(selectedCollection ? [selectedCollection] : []),
        ...(selectedEra ? [selectedEra] : []),
        ...selectedSizes,
    ];
//
    return (
        //<div className="filter-menu border border-grayBd p-5 w-full sm:w-2/3 font-nhg font-medium text-xxs sm:text-sm">
        <div className="filter-menu p-2 sm:p-5 w-full sm:w-full font-nhg font-medium text-xxs sm:text-sm">
            {/*<button onClick={handleCancel} className="text-black h-8 sm:hidden">CANCEL</button>*/}
            {/*<div className="filter-menu-header border border-red-500 sm:mb-12 h-8 flex justify-between items-center">*/}
            <div className="filter-menu-header sm:mb-12 h-8 flex justify-between items-center">
                <button onClick={handleClear} className="text-black w-14 sm:w-20 border border-black h-8 flex-none">CLEAR</button>

                {/* This div will be visible on screens larger than mobile */}
                {/*<div className="pl-2 filter-list border border-green-500 text-black flex flex-wrap justify-start items-center flex-grow hidden sm:flex">
 */}
                <div className="pl-2 filter-list text-black flex flex-wrap justify-start items-center flex-grow hidden sm:flex">
                    {/* Display selected filters */}
                    {allSelectedFilters.map(filter => {
                        let filterCategory;
                        if (filter === selectedCategory) filterCategory = 'categories';
                        else if (filter === selectedCollection) filterCategory = 'collections';
                        else if (filter === selectedEra) filterCategory = 'byEra';
                        else filterCategory = 'sizes';

                        return (
                            <SelectedFilter filter={filter} handleRemove={() => handleRemoveFilter(filter, filterCategory)} key={filter} />
                        )
                    })}
                </div>
                {/*<button onClick={handleCancel} className="text-black h-8 hidden sm:block mr-0">CANCEL</button>*/}
            </div>
            {/* This div will be visible on mobile */}
            {/*<div className="pl-2 filter-list border border-green-500 text-black flex flex-wrap justify-start items-center flex-grow sm:hidden">
*/}
            <div className="pl-2 filter-list text-black flex flex-wrap justify-start items-center flex-grow sm:hidden">
                {/* Display selected filters */}
                {allSelectedFilters.map(filter => {
                    let filterCategory;
                    if (filter === selectedCategory) filterCategory = 'categories';
                    else if (filter === selectedCollection) filterCategory = 'collections';
                    else if (filter === selectedEra) filterCategory = 'byEra';
                    else filterCategory = 'sizes';

                    return (
                        <SelectedFilter filter={filter} handleRemove={() => handleRemoveFilter(filter, filterCategory)} key={filter} />
                    )
                })}
            </div>
            {/*<div className="filter-menu-categories border border-blue-500 mb-2 ">*/}
            <div className="filter-menu-categories mb-2 mt-1 w-full flex">
                <button onClick={() => setSelectedFilter('categories')} className="font-semibold text-black pr-6 sm:pr-20 text-decoration-line: underline">CATEGORIES</button>
                <button onClick={() => setSelectedFilter('collections')} className="font-semibold text-black pr-6 sm:pr-20 text-decoration-line: underline">COLLECTIONS</button>
                <button onClick={() => setSelectedFilter('byEra')} className="font-semibold text-black pr-6 sm:pr-20 text-decoration-line: underline">BY ERA</button>
                <button onClick={() => setSelectedFilter('sizes')} className="font-semibold text-black pr-6 sm:pr-20 text-decoration-line: underline">SIZES</button>
            </div>
            {/*<div className="filter-menu-group-filters border border-yellow-500 mb-2">*/}
            <div className="filter-menu-group-filters mb-2">
                {selectedFilter === 'categories' && <CategoriesFilter />}
                {selectedFilter === 'collections' && <CollectionsFilter />}
                {selectedFilter === 'byEra' && <ByEraFilter />}
                {selectedFilter === 'sizes' && <SizesFilter />}
            </div>
            {/*<div className="filter-menu-footer border border-purple-500">*/}
            <div className="filter-menu-footer">
                <button onClick={handleApply} className="h-8 w-full sm:w-80 sm:px-20 bg-black text-bebe text-decoration: underline ">APPLY FILTERS ({allSelectedFilters.length})</button>
            </div>
        </div>
    );

};

export default FilterMenu;