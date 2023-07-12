import React, { useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";
import {useRouter} from "next/router";

const FilterMenu = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filterCategory, setFilterCategory] = useState(null);
    const router = useRouter();
    const handleClear = () => {
        setSelectedFilter(null);
        setSelectedFilters([]);
        setFilterCategory(null);
    };

    const handleCancel = () => {
        router.reload()
    };

    const handleApply = () => {
        // Actions for applying filters
    };

    const handleFilterClick = (filter, category) => {
        if (category === 'sizes') {
            if (!selectedFilters.includes(filter)) {
                setSelectedFilters(prevFilters => [...prevFilters, filter]);
            }
        } else {
            if (filterCategory && filterCategory !== category) {
                return;
            }
            setSelectedFilters([filter]);
            setFilterCategory(category);
        }
    };


    const CategoriesFilter = () => {
        const categories = ["SHIRTS", "TEES", "BOTTOMS", "OUTERWEAR", "SWEATSHIRTS", "HEADWEAR", "EVERYTHING ELSE"];

        return (
            <div className="pl-2 text-black py-1 flex flex-col">
                {categories.map(category =>
                    <button className="mb-2 text-left" onClick={() => handleFilterClick(category)} key={category}>{category}</button>
                )}
            </div>
        );
    }

    const CollectionsFilter = () => {
        const collections = ["MUSIC, ART, & FILM", "DENIM, WORKWEAR, & MILITARY", "SPORTSWEAR & STREETWEAR", "BLANKS & ESSENTIALS", "WOMEN"];

        return (
            <div className="pl-2 text-black py-1 flex flex-col">
                {collections.map(collection =>
                    <button className="mb-2 text-left" onClick={() => handleFilterClick(collection)} key={collection}>{collection}</button>
                )}
            </div>
        );
    }

    const ByEraFilter = () => {
        const eras = ["Y2K", "1990s", "1980s", "1970s", "PRE 1970s"];

        return (
            <div className="pl-2 text-black py-1 flex flex-col">
                {eras.map(era =>
                    <button className="mb-2 text-left" onClick={() => handleFilterClick(era)} key={era}>{era}</button>
                )}
            </div>
        );
    }

    const SizesFilter = () => {
        const topsSizes = ["X-SMALL", "SMALL", "MEDIUM", "LARGE", "X-LARGE", "XX-LARGE", "XXX-LARGE"];
        const bottomsSizes = ["25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"];
        const outerwearSizes = ["X-SMALL", "SMALL", "MEDIUM", "LARGE", "X-LARGE", "XX-LARGE", "XXX-LARGE"];

        return (
            <div className="pl-2 text-black py-1">
                <div className="pb-1.5 tracking-wide font-semibold">TOPS SIZE</div>
                <div className="flex pb-5 flex-wrap md:flex-nowrap">
                    {topsSizes.map(size =>
                        <button className="pr-12" onClick={() => handleFilterClick(size, 'sizes')} key={size}>{size}</button>
                    )}
                </div>
                <div className="pb-1.5 tracking-wide font-semibold">BOTTOMS SIZE</div>
                <div className="flex pb-5 flex-wrap md:flex-nowrap">
                    {bottomsSizes.map(size =>
                        <button className="pr-8" onClick={() => handleFilterClick(size, 'sizes')} key={size}>{size}</button>
                    )}
                </div>
                <div className="pb-1.5 tracking-wide font-semibold">OUTERWEAR SIZE</div>
                <div className="flex pb-5 flex-wrap md:flex-nowrap">
                    {outerwearSizes.map(size =>
                        <button className="pr-12" onClick={() => handleFilterClick(size, 'sizes')} key={size}>{size}</button>
                    )}
                </div>
            </div>
        );
    };


    const SelectedFilter = ({ filter, handleRemove }) => {
        return (
            <div className="bg-gray-400 mt-2 h-8 px-2 py-1 mr-2 mb-2 flex items-center text-xxs">
                <span>{filter}</span>
                <XMarkIcon onClick={() => handleRemove(filter)} className="ml-2 h-3 w-3 sm:h-4 sm:w-4 cursor-pointer" />
            </div>
        );
    };

    const handleRemoveFilter = (filter) => {
        setSelectedFilters(prevFilters => prevFilters.filter(f => f !== filter));
    }
//
    return (
        //<div className="filter-menu border border-grayBd p-5 w-full sm:w-2/3 font-nhg font-medium text-xxs sm:text-sm">
        <div className="filter-menu p-5 w-full sm:w-full font-nhg font-medium text-xxs sm:text-sm">
            <button onClick={handleCancel} className="text-black h-8 sm:hidden">CANCEL</button>
            {/*<div className="filter-menu-header border border-red-500 sm:mb-12 h-8 flex justify-between items-center">*/}
            <div className="filter-menu-header sm:mb-12 h-8 flex justify-between items-center">
                <button onClick={handleClear} className="text-black w-14 sm:w-20 border border-black h-8 flex-none">CLEAR</button>

                {/* This div will be visible on screens larger than mobile */}
                {/*<div className="pl-2 filter-list border border-green-500 text-black flex flex-wrap justify-start items-center flex-grow hidden sm:flex">
 */}
                <div className="pl-2 filter-list text-black flex flex-wrap justify-start items-center flex-grow hidden sm:flex">
                    {/* Display selected filters */}
                    {selectedFilters.map(filter =>
                        <SelectedFilter filter={filter} handleRemove={handleRemoveFilter} key={filter} />
                    )}
                </div>
                <button onClick={handleCancel} className="text-black h-8 hidden sm:block mr-0">CANCEL</button>
            </div>
            {/* This div will be visible on mobile */}
            {/*<div className="pl-2 filter-list border border-green-500 text-black flex flex-wrap justify-start items-center flex-grow sm:hidden">
*/}
            <div className="pl-2 filter-list text-black flex flex-wrap justify-start items-center flex-grow sm:hidden">
                {/* Display selected filters */}
                {selectedFilters.map(filter =>
                    <SelectedFilter filter={filter} handleRemove={handleRemoveFilter} key={filter} />
                )}
            </div>
            {/*<div className="filter-menu-categories border border-blue-500 mb-2 ">*/}
            <div className="filter-menu-categories mb-2 mt-1">
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
                <button onClick={handleApply} className="h-8 w-full sm:w-80 sm:px-20 bg-black text-bebe text-decoration: underline ">APPLY FILTERS ({selectedFilters.length})</button>
            </div>
        </div>
    );

};

export default FilterMenu;