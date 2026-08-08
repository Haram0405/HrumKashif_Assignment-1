# 💰 ExpenseTracker Pro

> A modern full-stack Expense Tracker built with **React, Tailwind CSS, Node.js, Express.js, and MongoDB (Mongoose)** featuring an interactive dashboard, analytics, smart filtering, and a clean SaaS-inspired user interface.

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

# 📖 Overview

ExpenseTracker Pro is a modern full-stack web application designed to help users manage daily expenses efficiently. It provides real-time expense tracking, interactive analytics, powerful filtering, and data export features within a clean and responsive dashboard.

The application is backed by **MongoDB Atlas** for persistent, cloud-hosted data storage, with **Mongoose** handling schema modeling and data access on the backend.

---

# ✨ Features

| Module | Description |
|----------|-------------|
| 📊 Dashboard | Interactive dashboard with summary cards, financial overview, and spending insights |
| 💰 Expense Management | Add, edit, delete, and organize expenses with category and date support |
| 📈 Analytics | Monthly expense trends, category-wise statistics, highest, lowest, and average expenses |
| 🔍 Smart Filters | Search by title, filter by category, amount range, date range, and sorting options |
| 📁 Export | Export expenses to CSV and dashboard reports to PDF |
| 🎨 User Experience | Responsive design, dark mode, toast notifications, smooth animations, and modern SaaS-inspired UI |
| ⚙️ Backend | RESTful API, Express MVC architecture, middleware, validation, and MongoDB (Mongoose) data storage |

---

# 🌟 Project Highlights

- ✅ Full-Stack Expense Tracker
- ✅ CRUD Operations
- ✅ RESTful API Integration
- ✅ Express MVC Architecture
- ✅ MongoDB Atlas + Mongoose Integration
- ✅ Interactive Charts & Analytics
- ✅ CSV Export
- ✅ PDF Export
- ✅ Smart Search & Filters
- ✅ Responsive Design
- ✅ Dark Mode Support
- ✅ Modern SaaS Dashboard
- ✅ Clean & Maintainable Code

---

# 🛠 Tech Stack

| Frontend | Backend | Database |
|-----------|----------|-----------|
| React.js | Node.js | MongoDB Atlas |
| Vite | Express.js | Mongoose (ODM) |
| Tailwind CSS | REST API | |
| Axios | Middleware | |
| React Toastify | Validation | |
| Framer Motion | Error Handling | |
| Recharts | dotenv & CORS | |
| Lucide React | | |

---

# 🏗 Architecture / Data Flow

The application follows a clean, layered architecture:

```
React (Frontend) → Axios → Express REST API → Mongoose (ODM) → MongoDB Atlas
```

1. **React (Frontend)** — Users interact with the dashboard, forms, and filters. UI state and requests are managed via Axios.
2. **Express API (Backend)** — Receives HTTP requests, applies middleware (validation, error handling), and routes them through the MVC-based controllers.
3. **Mongoose (ODM)** — Controllers use Mongoose models/schemas to validate and structure data before interacting with the database.
4. **MongoDB Atlas (Database)** — Cloud-hosted MongoDB cluster stores all expense documents persistently, replacing the previous JSON file-based storage.

This flow ensures a clear separation of concerns between presentation, business logic, and data persistence.

---

# 📂 Project Structure

```bash
ExpenseTracker-Pro/
│
├── expensetracker-frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── expensetracker-backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/          # Mongoose schemas
│   ├── routes/
│   ├── utils/
│   ├── config/           # MongoDB connection setup
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ExpenseTracker-Pro.git
```

```bash
cd ExpenseTracker-Pro
```

---

## 2. Backend Setup

```bash
cd expensetracker-backend
```

Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file inside `expensetracker-backend/` with the following variables (use your own values — do not commit real credentials):

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file. Make sure it is included in `.gitignore`.

Run the backend

```bash
npm run dev
```

Server

```
http://localhost:3000
```

---

## 3. Frontend Setup

```bash
cd expensetracker-frontend
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

Application

```
http://localhost:5173
```

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/health` | Health Check |
| GET | `/api/expenses` | Retrieve all expenses (supports search, category, amount range, date range, and sort filters) |
| GET | `/api/expenses/stats` | Expense statistics (totals, category-wise breakdown, highest/lowest/average) |
| POST | `/api/expenses` | Create a new expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |

All expense records are persisted in **MongoDB Atlas** via **Mongoose** models.

---

# 📸 Screenshots

## 🏠 Dashboard

<img width="894" height="590" alt="image" src="https://github.com/user-attachments/assets/72eb12cc-842d-4839-85a7-c8260eaf1b98" />

---

## 📊 Analytics

<img width="1234" height="490" alt="image" src="https://github.com/user-attachments/assets/47734e0d-3d32-4af0-b894-10494dac3296" />

---

## 📱 Responsive Designs

<img width="254" height="520" alt="image" src="https://github.com/user-attachments/assets/22e949a1-803a-4493-8e60-c7823030bb02" />

---

<img width="384" height="470" alt="image" src="https://github.com/user-attachments/assets/f46cecca-ae00-48e6-8417-c6101e994842" />

---

## 🔅 Dark Theme Toggle

<img width="1351" height="638" alt="image" src="https://github.com/user-attachments/assets/50b09c56-10ab-4c38-9270-ab1ecdf8adaa" />

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

- React Component-Based Architecture
- REST API Development
- Express.js MVC Pattern
- CRUD Operations
- MongoDB Atlas & Mongoose Schema Design
- State Management
- API Integration
- Data Visualization
- Responsive Web Design
- Clean Code & Project Organization

---

# 🚀 Future Improvements

- User Authentication
- User Accounts
- Budget Planning
- Expense Goals
- Recurring Expenses
- Cloud Synchronization
- Email Reports

---

# 👨‍💻 Author

**Hrum Kashif**

**Frontend Developer | MERN Stack Learner | React Enthusiast**

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

Your support is always appreciated!

---
