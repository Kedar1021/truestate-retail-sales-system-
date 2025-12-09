import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import { useSalesData } from '../hooks/useSalesData';
import { useData } from '../context/DataContext';
import clsx from 'clsx';
import SortDropdown from './SortDropdown';

const FilterRow = () => {
    const { availableFilters, loading } = useSalesData();
    const { filters, updateFilters, clearFilters } = useData();

    const handleMultiSelect = (key, value) => {
        const current = filters[key] || [];
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        updateFilters({ [key]: updated });
    };

    if (loading && !availableFilters.regions?.length) return <div className="h-10 w-full animate-pulse bg-gray-100 rounded-lg"></div>;

    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            {/* Filter Group */}
            <div className="flex items-center gap-2">
                <FilterDropdown 
                    label="Region" 
                    options={availableFilters.regions} 
                    selected={filters.regions} 
                    onChange={(val) => handleMultiSelect('regions', val)}
                />
                <FilterDropdown 
                    label="Gender" 
                    options={availableFilters.gender} 
                    selected={filters.gender} 
                    onChange={(val) => handleMultiSelect('gender', val)}
                />
                <FilterDropdown 
                    label="Category" 
                    options={availableFilters.categories} 
                    selected={filters.categories} 
                    onChange={(val) => handleMultiSelect('categories', val)}
                />
                <FilterDropdown 
                    label="Tags" 
                    options={availableFilters.tags || []} 
                    selected={filters.tags} 
                    onChange={(val) => handleMultiSelect('tags', val)}
                />
            </div>

            <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            {/* Date Range - Unified Box */}
            <div className="flex items-center bg-white border border-border rounded-lg px-3 h-9 shadow-sm hover:border-gray-300 transition-colors gap-2">
                <FiCalendar className="text-gray-400" size={14} />
                <input 
                    type="date" 
                    className="outline-none border-none bg-transparent text-text-primary text-xs p-0 font-medium w-24 placeholder-gray-400 uppercase tracking-wide"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilters({ dateFrom: e.target.value })}
                />
                <span className="text-gray-300 text-[10px]">TO</span>
                <input 
                    type="date" 
                    className="outline-none border-none bg-transparent text-text-primary text-xs p-0 font-medium w-24 placeholder-gray-400 uppercase tracking-wide"
                    value={filters.dateTo}
                    onChange={(e) => updateFilters({ dateTo: e.target.value })}
                />
            </div>

            {/* Age Range - Unified Box */}
             <div className="flex items-center bg-white border border-border rounded-lg px-3 h-9 shadow-sm hover:border-gray-300 transition-colors w-36 gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">AGE</span>
                <input 
                    type="number" 
                    placeholder="-1" 
                    className="w-full outline-none bg-transparent border-none text-xs p-0 text-text-primary font-medium text-center"
                    value={filters.ageMin}
                    onChange={(e) => updateFilters({ ageMin: e.target.value })}
                />
                <span className="text-gray-300">-</span>
                <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full outline-none bg-transparent border-none text-xs p-0 text-text-primary font-medium text-center"
                    value={filters.ageMax}
                    onChange={(e) => updateFilters({ ageMax: e.target.value })}
                />
            </div>

            <div className="flex-1"></div>

            {/* Clear Filters */}
            {(filters.regions?.length > 0 || filters.categories?.length > 0 || filters.tags?.length > 0 || filters.gender?.length > 0 || filters.dateFrom || filters.ageMin) && (
                <button 
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary hover:text-red-500 transition-colors uppercase tracking-wider mr-4"
                >
                    <FiX size={12} />
                    CLEAR ALL
                </button>
            )}

            {/* Sort Dropdown - Integrated */}
            <SortDropdown />
        </div>
    );
};

const FilterDropdown = ({ label, options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const count = selected?.length || 0;

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium border shadow-sm transition-all h-9 whitespace-nowrap",
                    count > 0 
                        ? "bg-indigo-600 text-white border-indigo-600 ring-1 ring-indigo-600 ring-offset-1" 
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
                )}
            >
                <span>{label}</span>
                {count > 0 && (
                    <span className={clsx(
                        "flex items-center justify-center text-[10px] font-bold h-5 min-w-[20px] px-1 rounded-full bg-white/20 text-white"
                    )}>
                        {count}
                    </span>
                )}
                <FiChevronDown 
                    size={14} 
                    className={clsx("transition-transform duration-200 ml-0.5", isOpen && "rotate-180")} 
                />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 min-w-[14rem] bg-white rounded-xl shadow-xl border border-border py-1.5 z-40 max-h-80 overflow-y-auto ring-1 ring-black/5 mx-1">
                    {options?.map((opt) => (
                        <div 
                            key={opt} 
                            onClick={() => onChange(opt)}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-text-primary group transition-colors"
                        >
                            <div className={clsx(
                                "w-4 h-4 rounded border flex items-center justify-center transition-all bg-white",
                                selected.includes(opt) 
                                    ? "bg-indigo-600 border-indigo-600 text-white" 
                                    : "border-gray-300 group-hover:border-indigo-500"
                            )}>
                                {selected.includes(opt) && <FiCheck size={10} strokeWidth={4} />}
                            </div>
                            <span className={clsx("truncate font-medium", selected.includes(opt) ? "text-indigo-600" : "text-gray-700")}>
                                {opt}
                            </span>
                        </div>
                    ))}
                    {!options?.length && (
                        <div className="px-4 py-3 text-sm text-gray-400 text-center italic">No options available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterRow;
