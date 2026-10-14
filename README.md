# 🏛️ Aashapura Interior & Furniture (AIF) - MERN Stack Project

A fullstack **MERN (MongoDB, Express, React, Node.js)** enterprise application for Aashapura Interior & Furniture — an elite contract-based interior design atelier and bespoke luxury furniture manufacturer.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Dependencies are already installed in root, client, and server. If you ever clone fresh, run:
```bash
# In the root folder:
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Database (.env)
Check `server/.env`:
```env
PORT=5000
# For local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/aashapura_interiors

# For MongoDB Atlas (Free Cloud Database):
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/aashapura_interiors?retryWrites=true&w=majority

JWT_SECRET=cfi_luxury_interiors_super_secret_jwt_key_2026
ADMIN_EMAIL=admin@cfinteriors.com
ADMIN_PASSWORD=admin123
```

### 3. Seed Sample Luxury Projects into MongoDB
To populate the database with initial projects and the administrator account:
```bash
npm run seed
```

### 4. Run Both Frontend and Backend Concurrently
From the root directory:
```bash
npm run dev
```
- **Frontend (React + Vite)**: `http://localhost:5173`
- **Backend (Express REST API)**: `http://localhost:5000`

Or run separately:
```bash
npm run server   # Starts Express backend on port 5000
npm run client   # Starts React frontend on port 5173
```

---

## 🔐 Admin Control Portal

Visit `http://localhost:5173/admin`
- **Default Email**: `admin@cfinteriors.com`
- **Default Password**: `admin123`

### Admin Features:
1. **Client Inquiries & Leads**: Real-time table of contact form & consultation modal inquiries. Change status (New → Contacted → Closed) and delete leads.
2. **Cost Estimator Quotations**: View calculated budget requests with property specs, client phone, and estimated INR ranges.
3. **Live Portfolio CRUD**: Add new projects, set cover image & gallery URLs, manage materials, and delete live projects directly from MongoDB!

---

## 🛠️ REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Fetch all projects (Supports `?category=...&featured=true`) |
| `POST` | `/api/projects` | Create a new project in MongoDB |
| `PUT` | `/api/projects/:id` | Update project details |
| `DELETE` | `/api/projects/:id` | Delete a project |
| `POST` | `/api/inquiries` | Submit contact / VIP consultation inquiry |
| `GET` | `/api/inquiries` | Fetch all client inquiries |
| `PUT` | `/api/inquiries/:id` | Update inquiry status |
| `DELETE` | `/api/inquiries/:id` | Delete inquiry |
| `POST` | `/api/quotes` | Submit real-time cost calculation lead |
| `GET` | `/api/quotes` | Fetch all cost calculator quotation leads |
| `POST` | `/api/auth/login` | Admin login & JWT generation |
| `GET` | `/api/auth/me` | Check authenticated admin token |
| `GET` | `/api/health` | API Healthcheck status |

---

## 📂 Project Architecture

```
d:\premium-business-site\
├── client\                     # React + Vite Frontend
│   ├── public\images\          # Logos, luxury hero banners & project images
│   ├── src\
│   │   ├── components\
│   │   │   ├── Navbar.jsx       # Header with mobile drawer & VIP modal button
│   │   │   ├── Footer.jsx       # Editorial luxury footer
│   │   │   ├── CostEstimator.jsx# Interactive real-time budget calculator
│   │   │   ├── Chatbot.jsx      # AI Concierge with lead capture
│   │   │   ├── ProjectLightbox.jsx # High-res gallery modal
│   │   │   ├── ConsultationModal.jsx # VIP booking modal
│   │   │   └── WhatsAppPill.jsx # Floating WhatsApp CTA
│   │   ├── pages\
│   │   │   ├── HomePage.jsx     # Hero, Before/After Slider, Portfolio, FAQs
│   │   │   ├── AboutPage.jsx    # Heritage, On-Site Joinery & Custom Woodwork
│   │   │   ├── ServicesPage.jsx # Scope, Kitchens, Wardrobes, Commercial
│   │   │   ├── PortfolioPage.jsx# Live MongoDB dynamic projects & filter
│   │   │   ├── ContactPage.jsx  # Atelier coordinates & Live DB Form
│   │   │   └── AdminDashboard.jsx # Full management desk for leads & projects
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css            # Dark luxury gold palette & typography
│   ├── package.json
│   └── vite.config.js          # API proxy to localhost:5000
│
├── server\                     # Express + Node.js + Mongoose Backend
│   ├── config\db.js            # Resilient MongoDB connection
│   ├── models\
│   │   ├── Project.js          # Portfolio Mongoose Schema
│   │   ├── Inquiry.js          # Consultation Inquiries Schema
│   │   ├── Quote.js            # Cost Calculator Estimates Schema
│   │   └── Admin.js            # Admin Auth Schema with bcrypt hashing
│   ├── routes\
│   │   ├── projectRoutes.js    # Projects CRUD API
│   │   ├── inquiryRoutes.js    # Inquiries API
│   │   ├── quoteRoutes.js      # Quotes API
│   │   └── authRoutes.js       # Admin JWT Login API
│   ├── middleware\auth.js      # JWT Route Protection Middleware
│   ├── scripts\seed.js         # Database Initial Seeder
│   ├── server.js               # Express application entry
│   ├── .env                    # Environment variables
│   └── package.json
│
├── package.json                # Root Concurrently Orchestrator
└── README.md
```
