import { MdSearch, MdClose } from 'react-icons/md';
import { useData } from '../context/DataContext';

const SearchBar = () => {
    const { filters, updateFilters } = useData();

    const handleChange = (e) => {
        updateFilters({ search: e.target.value });
    };

    const handleClear = () => {
        updateFilters({ search: '' });
    };

    return (
        <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-from/20 focus:border-primary-from transition-all shadow-sm"
                placeholder="Search by Name or Phone no."
                value={filters.search}
                onChange={handleChange}
            />
            {filters.search && (
                <button 
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-text-primary"
                >
                    <MdClose className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
