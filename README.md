# Service Management System (MERN Stack)

A service management system built with **MongoDB, Express, React, and Node.js** (MERN).
Manage customers, create and track service requests, and generate reports — all from a clean dashboard.

## Features

- **Dashboard** — live counts of pending / in-progress / completed services and total customers, plus the 5 most recent service requests
- **Customer Management** — add customers, view details and full service history in a popup
- **Service Request Management** — create, start, complete, and delete service requests
- **Status Tracking** — Pending, In Progress, Completed (with sidebar quick-filters)
- **Priority System** — Low, Medium, High
- **Reports** — services by status, by priority, and by month
- **Responsive Design** — works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Backend | Node.js + Express 4 |
| Database | MongoDB Atlas (cloud) with Mongoose 8 |

## Project Structure

```
service-management-system/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx          # Main app: navigation, shared state, data loading
│   │   ├── api.js           # Fetch helpers for all API calls
│   │   ├── utils.js         # Display formatters (status, priority, short IDs)
│   │   ├── index.css        # All styling
│   │   └── components/      # Header, Sidebar, Dashboard, forms, tables, modal, reports
│   └── vite.config.js       # Dev server + /api proxy to the backend
├── server/                  # Express backend
│   ├── server.js            # App entry: middleware, routes, DB connection
│   ├── models/              # Mongoose schemas (Customer, Service)
│   ├── routes/              # API route handlers (customers, services)
│   ├── .env                 # Your MongoDB connection string (NOT committed to git)
│   └── .env.example         # Template for .env
├── package.json             # Root scripts — run both apps with one command
└── README.md
```

---

## Installation & Setup

### Step 1 — Install Node.js

1. Download Node.js **18.11 or newer** (LTS recommended) from https://nodejs.org
2. Install it, then verify in a terminal:

```bash
node --version    # should print v18.11.0 or higher
npm --version
```

### Step 2 — Get the project

If you received the project as a folder, just open a terminal inside it. If it's on GitHub:

```bash
git clone <repository-url>
cd service-management-system
```

### Step 3 — Set up MongoDB Atlas (free cloud database)

1. Create a free account at https://cloud.mongodb.com
2. Create a **free (M0) cluster** — any name and region is fine
3. **Create a database user:**
   - Go to **Database Access** → *Add New Database User*
   - Choose a username and password (avoid special characters, or URL-encode them later)
   - Give it **Read and write to any database** access
4. **Allow your IP address:**
   - Go to **Network Access** → *Add IP Address* → *Add Current IP Address*
   - (If your IP changes often, you can allow `0.0.0.0/0` for development — less secure)
5. **Get the connection string:**
   - Go to **Database** → *Connect* → *Drivers*
   - Copy the string, which looks like:
     `mongodb+srv://youruser:<password>@yourcluster.xxxxx.mongodb.net/?appName=YourCluster`

### Step 4 — Configure the server

Create the environment file by copying the template:

```bash
# Windows (Git Bash / macOS / Linux)
cp server/.env.example server/.env

# Windows (Command Prompt)
copy server\.env.example server\.env
```

Open `server/.env` in any editor and set:

```env
MONGODB_URI=mongodb+srv://youruser:yourpassword@yourcluster.xxxxx.mongodb.net/service_management?appName=YourCluster
PORT=5000
```

**Important details:**
- Replace `<password>` with your actual database user password
- Add **`/service_management`** after `.mongodb.net` and **before the `?`** — this makes the app use its own database (named `service_management`) instead of the default `test` database. The database and its collections are created automatically on first use.
- If your password contains special characters (`@`, `#`, `%`, `&`, etc.), URL-encode them (e.g. `@` → `%40`, `#` → `%23`)

### Step 5 — Install dependencies

From the **project root folder**, run:

```bash
npm run install-all
```

This installs packages for the root, the server, and the client (may take a few minutes the first time).

### Step 6 — Run the project

From the project root:

```bash
npm run dev
```

This starts **both** apps together:

| App | URL |
|-----|-----|
| Frontend (open this in your browser) | http://localhost:5173 |
| Backend API | http://localhost:5000/api |

You should see `MongoDB connected` and `Server running on http://localhost:5000` in the terminal.
Press **Ctrl+C** in the terminal to stop both apps.

<details>
<summary>Run the apps separately (optional)</summary>

```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend
cd client
npm run dev
```
</details>

---

## How to Use

1. **Add a customer first** — Sidebar → *Add New Customer* → fill name, email, phone, address
2. **Add a service request** — Sidebar → *Add New Service* → pick the customer, enter service type, description, and priority
3. **Manage services** — Sidebar → *View All Services* → use **Start** / **Complete** / **Delete** on each row
4. **Filter by status** — Sidebar → *Service Status* links (All / Pending / In Progress / Completed)
5. **View customer details** — Sidebar → *View All Customers* → **View** button shows details + service history
6. **Generate reports** — Header → *Reports* → choose a report type → **Generate Report**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List all customers (newest first) |
| POST | `/api/customers` | Add a customer — body: `name`, `email`, `phone`, `address` |
| GET | `/api/services` | List all service requests (newest first) |
| POST | `/api/services` | Add a service — body: `customerId`, `serviceType`, `description`, `priority` (`low`/`medium`/`high`) |
| PATCH | `/api/services/:id` | Update status — body: `status` (`pending`/`in-progress`/`completed`) |
| DELETE | `/api/services/:id` | Delete a service request |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoDB connection failed` | Check your IP is allow-listed in Atlas (**Network Access**) and the password in `MONGODB_URI` is correct and URL-encoded. |
| `MONGODB_URI is not set` | You haven't created `server/.env` — see Step 4. |
| Data appears in the `test` database | Your URI is missing `/service_management` before the `?` — see Step 4. |
| `npm install` is slow or fails | If the project folder is synced by OneDrive, pause OneDrive syncing during install (`node_modules` has thousands of small files). |
| Browser shows "Error loading data" | The backend isn't running or crashed — check the terminal for errors; the frontend proxies `/api` calls to port 5000. |
| Port 5000 or 5173 already in use | Stop the other program using it, or change `PORT` in `server/.env` (also update the proxy target in `client/vite.config.js` to match). |
| `node --watch` not recognized | Your Node.js is older than 18.11 — update Node.js (Step 1). |
