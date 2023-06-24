import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(inputValue);
        }
    }

    return (
        <div className="flex items-center">
            <FaSearch className="mr-2 fill-black"/>
            <input
                className="placeholder-grayBkg font-nhg font-medium text-grayBkg bg-transparent outline-none"
                placeholder="SEARCH"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}

export default SearchBar;
