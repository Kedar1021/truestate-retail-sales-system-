const Sale = require('../models/Sale');
const { buildQuery } = require('../utils/queryBuilder');

const getSales = async (params) => {
    const q = buildQuery(params);
    const page = +params.page || 1;
    const limit = +params.limit || 10;
    const skip = (page - 1) * limit;

    const sort = { [params.sortBy || 'date']: params.sortOrder === 'desc' ? -1 : 1 };

    const [sales, total, stats] = await Promise.all([
        Sale.find(q).sort(sort).skip(skip).limit(limit).lean(),
        Sale.countDocuments(q),
        Sale.aggregate([
            { $match: q },
            {
                $group: {
                    _id: null,
                    totalUnits: { $sum: '$quantity' },
                    totalAmount: { $sum: '$final_amount' },
                    totalDiscount: { $sum: '$discount_percentage' }
                }
            }
        ])
    ]);

    return {
        sales,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        stats: stats[0] || { totalUnits: 0, totalAmount: 0, totalDiscount: 0 }
    };
};

const getFilters = async () => {
    const [regions, gender, categories, tags, paymentMethods, ageRange] = await Promise.all([
        Sale.distinct('customer_region'),
        Sale.distinct('gender'),
        Sale.distinct('product_category'),
        Sale.distinct('tags'),
        Sale.distinct('payment_method'),
        Sale.aggregate([
            {
                $group: {
                    _id: null,
                    min: { $min: '$age' },
                    max: { $max: '$age' }
                }
            }
        ])
    ]);

    return {
        regions,
        gender,
        categories,
        tags,
        paymentMethods,
        ageRange: ageRange[0] || { min: 0, max: 0 }
    };
};

module.exports = { getSales, getFilters };
