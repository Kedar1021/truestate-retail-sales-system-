import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: { 'Content-Type': 'application/json' }
});

export const getSales = async (params) => {
    try {
        const res = await api.get('/sales', { params });
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getFilters = async () => {
    try {
        const res = await api.get('/sales/filters');
        return res.data;
    } catch (err) {
        throw err;
    }
};

export default api;
