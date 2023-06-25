import SearchBar from "../SearchBar";
import Link from 'next/link'

function TopHeader() {
    const handleSearch = (searchTerm) => {
        console.log(`Searching for "${searchTerm}"`);
        // you can replace this with actual search logic
    }

    return (
        <div className="z-50 py-2 bg-whiteSmk w-screen flex justify-between">
            <Link href="/" passHref>
                <div className="font-nhg font-medium text-black pl-2">GRAY ERA</div>
            </Link>
            <div className="pr-6 z-50">
                <SearchBar className="z-20" onSearch={handleSearch} />
            </div>
        </div>
    );
}

export default TopHeader;
