const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    transaction_id: { type: String, required: true, unique: true },
    customer_id: { type: String, required: true },
    customer_name: { type: String, required: true, index: true },
    phone_number: { type: String, required: true, index: true },
    gender: { type: String },
    age: { type: Number },
    customer_region: { type: String, index: true },
    customer_type: { type: String },
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    brand: { type: String },
    product_category: { type: String, index: true },
    tags: [String],
    date: { type: Date, required: true, index: true },
    quantity: { type: Number, required: true },
    price_per_unit: { type: Number, required: true },
    discount_percentage: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    final_amount: { type: Number, required: true },
    payment_method: { type: String },
    order_status: { type: String },
    delivery_type: { type: String },
    store_id: { type: String },
    store_location: { type: String },
    salesperson_id: { type: String },
    employee_name: { type: String }
}, {
    timestamps: true
});

SaleSchema.index({ customer_name: 'text', phone_number: 'text' });

module.exports = mongoose.model('Sale', SaleSchema);
