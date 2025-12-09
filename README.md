# Sales Management System

![Status](https://img.shields.io/badge/Status-Deployed-success)
![MERN](https://img.shields.io/badge/Stack-MERN-blue)
![MongoDB](https://img.shields.io/badge/DB-MongoDB_Atlas-green)

A comprehensive full-stack MERN application for managing and analyzing retail sales data. This system handles large datasets (performance tested with 220,000+ records) and provides real-time analytics, dynamic filtering, and a responsive dashboard.

## 🚀 Live Demo

- **Frontend (Vercel):** [https://truestate-retail-sales-system-pearl.vercel.app](https://truestate-retail-sales-system-pearl.vercel.app)
- **Backend (Render):** [https://truestate-retail-sales-system-52gb.onrender.com/api/health](https://truestate-retail-sales-system-52gb.onrender.com/api/health)
- **GitHub Repository:** [https://github.com/Kedar1021/truestate-retail-sales-system-](https://github.com/Kedar1021/truestate-retail-sales-system-)

---

## ✨ Key Features

- **📊 Dynamic Dashboard:** Real-time stats for Total Units, Revenue, and Discounts.
- **🔍 Advanced Filtering:** 
  - **Multi-select Support:** Select multiple Regions, Genders, Categories, and Tags simultaneously.
  - Combines multiple filter types (e.g., "Region: South, North" + "Gender: Female").
- **⚡ High Performance:** Optimized for large datasets using MongoDB Indexing and server-side pagination.
- **📱 Responsive Design:** Professional UI built with Tailwind CSS, matching the Figma design specifications.
- **📅 Range Filters:** Date range and Age range filters.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios, Context API
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas (Free Tier) with 220,000+ records
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📥 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Connection String

### 1. Clone the Repository
```bash
git clone https://github.com/Kedar1021/truestate-retail-sales-system-.git
cd truestate-retail-sales-system-
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```
Run the app:
```bash
npm run dev
```

---

## 📂 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/         # DB Connection
│   │   ├── controllers/    # API Controllers
│   │   ├── models/         # Mongoose Models
│   │   ├── routes/         # Express Routes
│   │   ├── services/       # Business Logic
│   │   └── utils/          # Query Builder & Import Scripts
│   └── index.js            # Server Entry Point
│
└── frontend/
    ├── src/
    │   ├── components/     # UI Components (Sidebar, Table, Filters)
    │   ├── context/        # Global State Management
    │   ├── hooks/          # Custom Hooks
    │   └── services/       # API Integration
    └── main.jsx
```

---

## 📈 Scalability & Performance

- **Database:** Hosted on MongoDB Atlas.
- **Indexing:** `transaction_id`, `customer_name`, and `phone_number` are indexed for fast searching.
- **Pagination:** Server-side pagination limits data transfer overhead.
- **Data Volume:** Successfully imported and tested with **220,000 records**, utilizing optimized queries to stay within free-tier limits while maximizing data volume.
