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

    const textStyle = { color: 'black' };

    return (
        <div className="filter-menu" style={{ border: '1px solid black', padding: '20px' }}>
            <div className="filter-menu-header" style={{ border: '1px solid red', marginBottom: '10px' }}>
                <button onClick={handleClear} style={textStyle}>Clear</button>
                <div className="filter-list" style={{ border: '1px solid green', color: 'black' }}>
                    {/* Display selected filters */}
                    Selected Filters
                </div>
                <button onClick={handleCancel} style={textStyle}>Cancel</button>
            </div>

            <div className="filter-menu-categories" style={{ border: '1px solid blue', marginBottom: '10px' }}>
                <button onClick={() => setSelectedFilter('categories')} style={textStyle}>CATEGORIES</button>
                <button onClick={() => setSelectedFilter('collections')} style={textStyle}>COLLECTIONS</button>
                <button onClick={() => setSelectedFilter('byEra')} style={textStyle}>BY ERA</button>
                <button onClick={() => setSelectedFilter('sizes')} style={textStyle}>SIZES</button>
            </div>

            <div className="filter-menu-group-filters" style={{ border: '1px solid yellow', marginBottom: '10px' }}>
                {selectedFilter === 'categories' && <CategoriesFilter />}
                {selectedFilter === 'collections' && <CollectionsFilter />}
                {selectedFilter === 'byEra' && <ByEraFilter />}
                {selectedFilter === 'sizes' && <SizesFilter />}
            </div>

            <div className="filter-menu-footer" style={{ border: '1px solid purple' }}>
                <button onClick={handleApply} style={textStyle}>Apply Filters</button>
            </div>
        </div>
    );
};

export default FilterMenu;

// Replace these with your actual filter components
const CategoriesFilter = () => <div style={{ color: 'black' }}>Categories Filters</div>;
const CollectionsFilter = () => <div style={{ color: 'black' }}>Collections Filters</div>;
const ByEraFilter = () => <div style={{ color: 'black' }}>By Era Filters</div>;
const SizesFilter = () => <div style={{ color: 'black' }}>Sizes Filters</div>;
