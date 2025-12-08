const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sale = require('../models/Sale');
const connectDB = require('../config/database');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MAX_MB = 450;
const MAX_BYTES = MAX_MB * 1024 * 1024;

const importStream = async () => {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error('Please provide the path to the file.');
        process.exit(1);
    }

    try {
        await connectDB();
        console.log('Connected to MongoDB.');
    } catch (err) {
        console.error('DB Connection Failed:', err);
        process.exit(1);
    }

    let batch = [];
    const batchSize = 1000;
    let totalImported = 0;
    let totalRead = 0;

    console.log(`Starting stream import: ${filePath}`);
    console.log(`Safety Limit: ${MAX_MB} MB (Storage + Indexes)`);

    const stream = fs.createReadStream(filePath)
        .pipe(csv());

    for await (const row of stream) {
        // Periodically check DB size (every 5000 rows)
        if (totalImported > 0 && totalImported % 5000 === 0) {
            try {
                const stats = await mongoose.connection.db.stats();
                const totalSize = (stats.storageSize || 0) + (stats.indexSize || 0);

                if (totalSize >= MAX_BYTES) {
                    console.log(`\n⚠️  Reached Storage Limit of ${MAX_MB} MB.`);
                    console.log(`Current Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
                    console.log('Stopping import to protect Free Tier status.');
                    break;
                }
            } catch (err) {
                console.error('Warning: Could not check DB stats:', err.message);
            }
        }

        totalRead++;

        const parseDate = (d) => {
            const date = new Date(d);
            return isNaN(date.getTime()) ? new Date() : date;
        };
        const parseNum = (n) => parseFloat(n) || 0;

        batch.push({
            transaction_id: row['Transaction ID'] || `TXN-${Math.random().toString(36).substr(2, 9)}`,
            customer_id: row['Customer ID'],
            customer_name: row['Customer Name'],
            phone_number: String(row['Phone Number'] || '').replace(/\D/g, ''),
            gender: row['Gender'],
            age: parseNum(row['Age']),
            customer_region: row['Customer Region'],
            customer_type: row['Customer Type'],
            product_id: row['Product ID'],
            product_name: row['Product Name'],
            brand: row['Brand'],
            product_category: row['Product Category'],
            tags: row['Tags'] ? String(row['Tags']).split(',').map(t => t.trim()) : [],
            date: parseDate(row['Date']),
            quantity: parseNum(row['Quantity']),
            price_per_unit: parseNum(row['Price Per Unit']),
            discount_percentage: parseNum(row['Discount Percentage']),
            total_amount: parseNum(row['Total Amount']),
            final_amount: parseNum(row['Final Amount']),
            payment_method: row['Payment Method'],
            order_status: row['Order Status'],
            delivery_type: row['Delivery Type'],
            store_id: row['Store ID'],
            store_location: row['Store Location'],
            salesperson_id: row['Salesperson ID'],
            employee_name: row['Employee Name']
        });

        if (batch.length >= batchSize) {
            try {
                await Sale.insertMany(batch, { ordered: false });
                totalImported += batch.length;
                process.stdout.write(`\rImported: ${totalImported} rows...`);
                batch = [];
            } catch (err) {
                // Ignore duplicate key errors, log others
                if (err.code !== 11000) {
                    console.error('\nBatch Error:', err.message);
                }
                batch = [];
            }
        }
    }

    // Insert remaining
    if (batch.length > 0) {
        try {
            await Sale.insertMany(batch, { ordered: false });
            totalImported += batch.length;
            console.log(`\nImported final batch. Total: ${totalImported}`);
        } catch (err) {
            if (err.code !== 11000) {
                console.error('\nFinal Batch Error:', err.message);
            }
        }
    }

    console.log('\nImport Process Finished.');
    process.exit(0);
};

importStream();
