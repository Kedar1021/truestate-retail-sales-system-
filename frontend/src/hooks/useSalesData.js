import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { getSales, getFilters } from '../services/api';

export const useSalesData = () => {
    const { filters, sorting, pagination } = useData();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [stats, setStats] = useState({ totalUnits: 0, totalAmount: 0, totalDiscount: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [opts, setOpts] = useState({
        regions: [], gender: [], categories: [], tags: [], paymentMethods: [], ageRange: {}
    });

    useEffect(() => {
        getFilters().then(res => {
            if (res.success) setOpts(res.filters);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getSales({ ...filters, ...sorting, ...pagination });
                if (res.success) {
                    setData(res.sales);
                    setTotal(res.total);
                    setTotalPages(res.totalPages);
                    setStats(res.stats);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetch, 300);
        return () => clearTimeout(timer);
    }, [filters, sorting, pagination]);

    return { data, loading, error, total, totalPages, stats, availableFilters: opts };
};
