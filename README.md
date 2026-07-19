# Service Management System (MERN Stack)

A service management system built with **MongoDB, Express, React, and Node.js**.

## Features

- Customer management (add customers, view details with service history)
- Service request management (create, start, complete, delete)
- Status tracking (Pending, In Progress, Completed) with sidebar filters
- Priority system (Low, Medium, High)
- Dashboard with live counts and recent service requests
- Reports: services by status, by priority, and by month
- Responsive design

## Project Structure

```
├── client/    React frontend (Vite)
├── server/    Express + Mongoose API
└── package.json    Root scripts (runs both apps together)
```

## Requirements

- Node.js 18.11+ (for `node --watch`)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

## Setup

### 1. MongoDB Atlas

1. Create a free cluster at https://cloud.mongodb.com
2. Create a database user (Database Access → Add New Database User)
3. Allow your IP (Network Access → Add IP Address → "Add Current IP Address")
4. Get your connection string: Database → Connect → Drivers (it looks like
   `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/`)

### 2. Configure the server

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and paste your connection string as `MONGODB_URI`.
Add `/service_management` before any `?` in the URI so data goes to that database, e.g.:

```
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/service_management
PORT=5000
```

> If your password contains special characters (`@`, `#`, `%`, etc.), URL-encode them.

### 3. Install and run

```bash
npm run install-all
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:5000/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List all customers (newest first) |
| POST | `/api/customers` | Add a customer (`name`, `email`, `phone`, `address`) |
| GET | `/api/services` | List all service requests (newest first) |
| POST | `/api/services` | Add a service (`customerId`, `serviceType`, `description`, `priority`) |
| PATCH | `/api/services/:id` | Update service status (`status`: pending / in-progress / completed) |
| DELETE | `/api/services/:id` | Delete a service |

## Troubleshooting

- **"MongoDB connection failed"** — check that your IP is allow-listed in Atlas
  (Network Access) and that the password in the URI is correct and URL-encoded.
- **Slow or failing `npm install`** — if this folder is synced by OneDrive, pause
  OneDrive syncing during installs (`node_modules` has thousands of small files).
- **API errors in the browser** — make sure the server is running on port 5000;
  the Vite dev server proxies `/api` requests to it.
