import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useSalesData } from '../hooks/useSalesData';
import { useData } from '../context/DataContext';

const Pagination = () => {
    const { pagination, updatePage } = useData();
    const { total, totalPages } = useSalesData();

    const start = (pagination.page - 1) * pagination.limit + 1;
    const end = Math.min(pagination.page * pagination.limit, total);

    if (total === 0) return null;

    return (
        <div className="flex items-center justify-between py-4 border-t border-gray-100 mt-4">
            <p className="text-sm text-text-secondary">
                Showing <span className="font-medium text-text-primary">{start}-{end}</span> of <span className="font-medium text-text-primary">{total}</span> results
            </p>
            
            <div className="flex items-center gap-2">
                <button
                    onClick={() => updatePage(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <MdChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-text-primary px-2">
                    Page {pagination.page} of {totalPages}
                </span>
                <button
                    onClick={() => updatePage(pagination.page + 1)}
                    disabled={pagination.page === totalPages}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <MdChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
