import { FiInfo } from 'react-icons/fi';
import { useSalesData } from '../hooks/useSalesData';
import { formatCurrency, formatNumber } from '../utils/formatters';

const StatsCards = () => {
    const { stats, loading } = useSalesData();

    if (loading && !stats) return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 h-20 animate-pulse bg-gray-50 rounded-lg"></div>;

    return (
        <div className="flex gap-4 mb-4">
            <Card 
                label="Total units sold" 
                value={formatNumber(stats.totalUnits)} 
            />
            <Card 
                label="Total Amount" 
                value={formatCurrency(stats.totalAmount)} 
            />
            <Card 
                label="Total Discount" 
                value={formatCurrency(stats.totalDiscount)} 
            />
        </div>
    );
};

const Card = ({ label, value, subValue }) => {
    return (
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm min-w-[220px] flex flex-col justify-between">
             <div className="flex items-start justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">{label}</span>
                <FiInfo className="text-gray-400" size={14} />
             </div>
             <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-bold text-gray-900">{value}</h3>
                {subValue && <span className="text-xs font-semibold text-gray-500">{subValue}</span>}
             </div>
        </div>
    );
};

export default StatsCards;
