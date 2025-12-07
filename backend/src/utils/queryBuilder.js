const buildQuery = (p) => {
    const q = {};

    if (p.search) {
        q.$or = [
            { customer_name: { $regex: p.search, $options: 'i' } },
            { phone_number: { $regex: p.search, $options: 'i' } }
        ];
    }

    const lists = ['regions', 'gender', 'categories', 'tags', 'paymentMethods'];
    const fields = ['customer_region', 'gender', 'product_category', 'tags', 'payment_method'];

    lists.forEach((k, i) => {
        if (p[k]?.length) q[fields[i]] = { $in: p[k] };
    });

    if (p.ageMin || p.ageMax) {
        q.age = {};
        if (p.ageMin) q.age.$gte = +p.ageMin;
        if (p.ageMax) q.age.$lte = +p.ageMax;
    }

    if (p.dateFrom || p.dateTo) {
        q.date = {};
        if (p.dateFrom) q.date.$gte = new Date(p.dateFrom);
        if (p.dateTo) q.date.$lte = new Date(p.dateTo);
    }

    return q;
};

module.exports = { buildQuery };
