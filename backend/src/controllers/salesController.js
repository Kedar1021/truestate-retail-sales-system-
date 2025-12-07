const service = require('../services/salesService');

const mongoose = require('mongoose');
const Sale = require('../models/Sale');

const getSales = async (req, res) => {
    try {
        const data = await service.getSales(req.query);
        res.json({ success: true, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFilters = async (req, res) => {
    try {
        const filters = await service.getFilters();
        res.json({ success: true, filters });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getHealth = async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState;
        const dbName = mongoose.connection.name;
        const count = dbStatus === 1 ? await Sale.countDocuments() : 'N/A';

        res.json({
            status: 'ok',
            timestamp: new Date(),
            database: {
                state: dbStatus, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
                stateName: ['disconnected', 'connected', 'connecting', 'disconnecting'][dbStatus],
                name: dbName,
                host: mongoose.connection.host,
                collectionCount: count
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
};

module.exports = { getSales, getFilters, getHealth };
