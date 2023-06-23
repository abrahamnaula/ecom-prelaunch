import SearchBar from "../SearchBar";

function TopHeader() {
    const handleSearch = (searchTerm) => {
        console.log(`Searching for "${searchTerm}"`);
        // you can replace this with actual search logic
    }

    return (
        <div className="py-2 bg-whiteSmk w-screen flex justify-between">
            <div className="text-sm font-nhg text-black pl-1">GRAY ERA</div>
            <div className="pr-6">
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    );
}

export default TopHeader;
