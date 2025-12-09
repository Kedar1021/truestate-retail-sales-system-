# TruEstate Backend

Retail Sales Management System Backend.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Setup:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` with your connection string

3. Run Application:
   - Development: `npm run dev`
   - Production: `npm start`

4. Import Data:
   ```bash
   node src/utils/importExcel.js path/to/dataset.xlsx
   ```

## API Endpoints

- GET `/api/sales`: List sales with filters
- GET `/api/sales/filters`: Get available filter options
- GET `/api/health`: System health check
