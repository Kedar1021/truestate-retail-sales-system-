# Deployment Guide

This guide details the steps to deploy the TruEstate Sales Management System to production using **Render** (for the backend) and **Vercel** (for the frontend).

## 1. MongoDB Atlas Setup

Before deploying the code, you need a live database.

1.  **Create Account:** Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2.  **Create Cluster:** detailed guides exist, but generally:
    *   Create a **Shared Cluster** (Free Tier M0).
    *   Select your preferred provider and region (choose one close to you).
3.  **Database User:**
    *   Go to **Database Access**.
    *   Add a new database user (e.g., `admin`).
    *   create a strong password and save it completely (you will need it later).
4.  **Network Access:**
    *   Go to **Network Access**.
    *   Click "Add IP Address".
    *   Select **"Allow Access from Anywhere"** (`0.0.0.0/0`). This is required for Render/Vercel to connect.
5.  **Get Connection String:**
    *   Go to **Database** > **Connect**.
    *   Select **"Drivers"**.
    *   Copy the string (e.g., `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    *   **Important:** Replace `<password>` with your actual password.

---

## 2. Backend Deployment (Render)

We will use Render to host the Node.js/Express API.

1.  **Push to GitHub:** Ensure your project is pushed to a public or private GitHub repository.
2.  **Create Web Service:**
    *   Log in to [dashboard.render.com](https://dashboard.render.com).
    *   Click **"New +"** and select **"Web Service"**.
    *   Connect your GitHub repository.
3.  **Configure Service:**
    *   **Name:** `truestate-api` (or similar).
    *   **Root Directory:** `backend` (Important: This tells Render where the API code lives).
    *   **Environment:** `Node`.
    *   **Build Command:** `npm install`.
    *   **Start Command:** `npm start` (or `node src/index.js`).
4.  **Environment Variables:**
    *   Scroll down to "Environment Variables".
    *   Add `MONGODB_URI`: Paste your connection string from Step 1.
    *   Add `NODE_ENV`: `production`.
5.  **Deploy:** Click "Create Web Service". Render will build your app. Once finished, you will get a URL (e.g., `https://truestate-api.onrender.com`). **Copy this URL.**

---

## 3. Frontend Deployment (Vercel)

We will use Vercel to host the React frontend.

1.  **Import Project:**
    *   Log in to [vercel.com](https://vercel.com).
    *   Click **"Add New..."** > **"Project"**.
    *   Import your GitHub repository.
2.  **Configure Project:**
    *   **Framework Preset:** Select **Vite**.
    *   **Root Directory:** Click "Edit" and select `frontend`.
3.  **Build Settings:**
    *   **Build Command:** `npm run build` (Default).
    *   **Output Directory:** `dist` (Default).
    *   **Install Command:** `npm install` (Default).
4.  **Environment Variables:**
    *   Expand the "Environment Variables" section.
    *   Key: `VITE_API_URL`
    *   Value: Paste your Render Backend URL (e.g., `https://truestate-api.onrender.com/api`).
    *   *Note: Ensure you include the `/api` suffix if your routes are defined that way.*
5.  **Deploy:** Click **"Deploy"**. Vercel will build the frontend and provide you with a live URL.

---

## 4. Post-Deployment Steps

1.  **Health Check:** Visit `https://your-backend-url.onrender.com/api/health`. You should see `{"status":"ok"}`.
2.  **Import Data:**
    *   Since your production DB is empty, you need to populate it.
    *   You can run the import script locally but point it to the production DB:
        ```bash
        # In your local terminal, temporarily set the env var
        # Windows (Powershell)
        $env:MONGODB_URI="your_production_connection_string"
        node backend/src/utils/importStream.js path/to/data.csv
        ```
    *   Or, use MongoDB Compass to connect to your remote cluster and import the CSV manually.
3.  **Verify Frontend:** Open your Vercel URL. The dashboard should load, and data should appear.

## Common Issues & Troubleshooting

*   **CORS Errors:** If the frontend cannot talk to the backend, check `backend/src/index.js` (or app.js). Ensure the `cors` middleware is enabled and allows connections from your Vercel domain.
    ```javascript
    app.use(cors({
        origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
        credentials: true
    }));
    ```
    *Make sure to add `FRONTEND_URL` to your Render environment variables if you use this strict config.*

*   **"Page Not Found" on Refresh:** In Vercel, if you refresh a page and get a 404, you might need a `vercel.json` rewrite rule for Single Page Apps (SPA), though Vite usually handles this well with Vercel's default settings.

*   **Database Connection Fail:** Double-check that your IP address is whitelisted in MongoDB Atlas (0.0.0.0/0).
