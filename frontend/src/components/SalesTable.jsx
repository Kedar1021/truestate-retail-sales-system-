import { FiCopy, FiMoreHorizontal } from 'react-icons/fi';
import { formatDate, formatCurrency, formatNumber } from '../utils/formatters';
import { useSalesData } from '../hooks/useSalesData';

const SalesTable = () => {
    const { data, loading, error } = useSalesData();

    if (loading) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-48 flex items-center justify-center text-red-500 bg-red-50 rounded-xl border border-red-100">
                <p className="text-sm font-medium">Error loading data: {error}</p>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center text-text-secondary bg-white rounded-xl border border-border">
                <p className="text-sm font-medium">No sales found matching your filters.</p>
                <p className="text-xs text-text-tertiary mt-1">Try adjusting the filters above</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm flex flex-col h-full ring-1 ring-black/5">
            <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap table-fixed">
                    <thead className="bg-[#F9FAFB] border-b border-border sticky top-0 z-10">
                        <tr>
                            <HeaderCell label="Transaction ID" width="110px" />
                            <HeaderCell label="Date" width="100px" />
                            <HeaderCell label="Customer ID" width="100px" />
                            <HeaderCell label="Customer Name" width="140px" />
                            <HeaderCell label="Phone Number" width="140px" />
                            <HeaderCell label="Gender" width="80px" />
                            <HeaderCell label="Age" width="60px" />
                            <HeaderCell label="Product Category" width="140px" />
                            <HeaderCell label="Quantity" width="80px" align="center" />
                            <HeaderCell label="Total Amount" width="100px" align="right" />
                            <HeaderCell label="Customer region" width="120px" />
                            <HeaderCell label="Product ID" width="120px" />
                            <HeaderCell label="Employee name" width="140px" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((item, index) => {
                            if (!item) return null;
                            const name = item.customer_name || 'Unknown';
                            // Generate a mock Customer ID if not present
                            const custId = item.customer_id || `CUST${(item.phone_number || '0000').slice(-4)}`;
                            return (
                                <tr key={item._id || index} className="hover:bg-gray-50/80 transition-colors group">
                                    <Cell width="110px" className="font-medium text-text-primary px-4">
                                        <span className="font-mono text-xs text-text-secondary">{item.transaction_id ? `#${item.transaction_id.slice(-6)}` : '-'}</span>
                                    </Cell>
                                    <Cell width="100px" className="text-text-secondary px-4">{formatDate(item.date)}</Cell>
                                    
                                    <Cell width="100px" className="text-text-secondary px-4 font-mono text-xs">{custId}</Cell>

                                    <Cell width="140px" className="px-4 text-text-primary font-medium truncate" title={name}>
                                        {name}
                                    </Cell>

                                    <Cell width="140px" className="px-4 text-text-secondary flex items-center gap-2">
                                        <span>{item.phone_number}</span>
                                        <FiCopy size={12} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </Cell>

                                    <Cell width="80px" className="px-4 text-text-secondary capitalize">{item.gender || '-'}</Cell>
                                    <Cell width="60px" className="px-4 text-text-secondary">{item.age || '-'}</Cell>
                                    
                                    <Cell width="140px" className="px-4 text-text-primary font-medium">{item.product_category}</Cell>

                                    <Cell width="80px" align="center" className="text-text-primary font-bold px-4">{item.quantity ? String(item.quantity).padStart(2, '0') : '00'}</Cell>
                                    
                                    <Cell width="100px" align="right" className="font-bold text-text-primary px-4 tabular-nums">{formatCurrency(item.final_amount)}</Cell>

                                     <Cell width="120px" className="px-4 text-text-secondary font-medium">
                                        {item.customer_region}
                                    </Cell>

                                     <Cell width="120px" className="px-4 text-text-secondary text-xs truncate" title={item.product_id}>{item.product_id}</Cell>
                                    
                                    <Cell width="140px" className="text-text-secondary px-4 text-xs truncate font-medium" title={item.employee_name}>{item.employee_name}</Cell>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const HeaderCell = ({ label, width, align = 'left' }) => (
    <th 
        className={`px-4 py-3 font-semibold text-text-secondary text-[11px] whitespace-nowrap text-${align} overflow-hidden`}
        style={{ width, minWidth: width, maxWidth: width }}
    >
        {label}
    </th>
);

const Cell = ({ children, width, align = 'left', className = '' }) => (
    <td 
        className={`py-2 text-xs whitespace-nowrap overflow-hidden text-ellipsis text-${align} ${className}`}
        style={{ width, minWidth: width, maxWidth: width }}
    >
        {children}
    </td>
);

const StatusBadge = ({ status }) => {
    const s = (status || '').toLowerCase();
    const styles = {
        completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        pending: 'bg-amber-50 text-amber-700 border-amber-100',
        cancelled: 'bg-red-50 text-red-700 border-red-100',
        default: 'bg-gray-50 text-gray-600 border-gray-100'
    };
    const style = styles[s] || styles.default;

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-medium capitalize ${style}`}>
            {s || 'Unknown'}
        </span>
    );
};

export default SalesTable;
