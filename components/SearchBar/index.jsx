import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useRouter } from 'next/router';
function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();

        // Check if input is empty
        if (!inputValue) return;

        // Update the URL with the new search term
        router.push(`/search/${inputValue}`);
    };
    return (
        <div className="flex items-center">
            <button onClick={handleSearch}>
                <FaSearch className="mr-2 fill-black h-2 sm:h-3"/>
            </button>
            <input
                className="placeholder-grayBkg font-nhg font-medium text-grayBkg text-xxs
                            sm:text-xxs sm:font-nhg sm:text-grayBkg sm:font-medium bg-transparent outline-none
                            w-12 sm:w-auto"
                placeholder="SEARCH"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}
export default SearchBar;