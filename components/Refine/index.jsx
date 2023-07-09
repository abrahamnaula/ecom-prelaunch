import React, { useState } from 'react';

const FilterMenu = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleClear = () => {
        setSelectedFilter(null);
        // Additional actions for clearing filters
    };

    const handleCancel = () => {
        // Actions for canceling filters
    };

    const handleApply = () => {
        // Actions for applying filters
    };

    return (
        <div className="filter-menu border border-grayBd p-5 w-2/3 font-nhg font-medium text-xs sm:text-sm">
            <div className="filter-menu-header border border-red-500 mb-12 h-8 flex justify-between">
                <button onClick={handleClear} className="text-black w-24 border border-black">CLEAR</button>
                <div className="filter-list border border-green-500 text-black w-full">
                    {/* Display selected filters */}
                    Selected Filters
                </div>
                <button onClick={handleCancel} className="text-black">CANCEL</button>
            </div>

            <div className="filter-menu-categories border border-blue-500 mb-2 ">
                <button onClick={() => setSelectedFilter('categories')} className="text-black pr-20 text-decoration-line: underline">CATEGORIES</button>
                <button onClick={() => setSelectedFilter('collections')} className="text-black pr-20 text-decoration-line: underline">COLLECTIONS</button>
                <button onClick={() => setSelectedFilter('byEra')} className="text-black pr-20 text-decoration-line: underline">BY ERA</button>
                <button onClick={() => setSelectedFilter('sizes')} className="text-black pr-20 text-decoration-line: underline">SIZES</button>
            </div>

            <div className="filter-menu-group-filters border border-yellow-500 mb-2">
                {selectedFilter === 'categories' && <CategoriesFilter />}
                {selectedFilter === 'collections' && <CollectionsFilter />}
                {selectedFilter === 'byEra' && <ByEraFilter />}
                {selectedFilter === 'sizes' && <SizesFilter />}
            </div>

            <div className="filter-menu-footer border border-purple-500">
                <button onClick={handleApply} className="h-8 px-20 bg-black text-white text-decoration: underline ">APPLY FILTERS</button>
            </div>
        </div>
    );
};

export default FilterMenu;

// Replace these with your actual filter components
const CategoriesFilter = () =>
    <div className="pl-2 text-black py-1">
        <div className="mb-2">SHIRTS</div>
        <div className="mb-2">TEES</div>
        <div className="mb-2">BOTTOMS</div>
        <div className="mb-2">OUTERWEAR</div>
        <div className="mb-2">SWEATSHIRTS</div>
        <div className="mb-2">HEADWEAR</div>
        <div className="mb-2">EVERYTHING ELSE</div>
    </div>;
const CollectionsFilter = () =>
    <div className="pl-2 text-black py-1">
        <div className="mb-2">MUSIC, ART, & FILM</div>
        <div className="mb-2">DENIM, WORKWEAR, & MILITARY</div>
        <div className="mb-2">SPORTSWEAR & STREETWEAR</div>
        <div className="mb-2">BLANKS & ESSENTIALS</div>
        <div className="mb-2">WOMEN</div>
    </div>;
const ByEraFilter = () =>
    <div className="pl-2 text-black py-1">
        <div className="mb-2">Y2K</div>
        <div className="mb-2">1990s</div>
        <div className="mb-2">1980s</div>
        <div className="mb-2">1970s</div>
        <div className="mb-2">PRE 1970s</div>
    </div>;
const SizesFilter = () =>
    <div className="pl-2 text-black py-1">
        <div className="pb-1.5">TOPS SIZE:</div>
        <div className="flex pb-5">
            <p className="pr-12">X-SMALL</p>
            <p className="pr-12">SMALL</p>
            <p className="pr-12">MEDIUM</p>
            <p className="pr-12">LARGE</p>
            <p className="pr-12">X-LARGE</p>
            <p className="pr-12">XX-LARGE</p>
            <p className="pr-12">XXX-LARGE</p>
        </div>
        <div className="pb-1.5">BOTTOMS SIZE:</div>
        <div className="flex pb-5">
            <p className="pr-8">25</p>
            <p className="pr-8">26</p>
            <p className="pr-8">27</p>
            <p className="pr-8">28</p>
            <p className="pr-8">29</p>
            <p className="pr-8">30</p>
            <p className="pr-8">31</p>
            <p className="pr-8">32</p>
            <p className="pr-8">33</p>
            <p className="pr-8">34</p>
            <p className="pr-8">35</p>
            <p className="pr-8">36</p>
            <p className="pr-8">37</p>
            <p className="pr-8">38</p>
            <p className="pr-8">39</p>
            <p className="pr-8">40</p>
        </div>
        <div className="pb-1.5">OUTERWEAR SIZE:</div>
        <div className="flex pb-5">
            <p className="pr-12">X-SMALL</p>
            <p className="pr-12">SMALL</p>
            <p className="pr-12">MEDIUM</p>
            <p className="pr-12">LARGE</p>
            <p className="pr-12">X-LARGE</p>
            <p className="pr-12">XX-LARGE</p>
            <p className="pr-12">XXX-LARGE</p>
        </div>
    </div>;