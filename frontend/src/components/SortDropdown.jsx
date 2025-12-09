import { useData } from '../context/DataContext';

const SortDropdown = () => {
    const { updateSort, sorting } = useData();

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Sort by:</span>
            <select
                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary-from cursor-pointer shadow-sm"
                value={sorting.sortBy}
                onChange={(e) => updateSort(e.target.value)}
            >
                <option value="date">Date (Newest First)</option>
                <option value="quantity">Quantity (Highest First)</option>
                <option value="customer_name">Customer Name (A-Z)</option>
            </select>
        </div>
    );
};

export default SortDropdown;
