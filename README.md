# ExpenseTracker Pro

**Name:** [Your Full Name Here]
**Bootcamp:** TechnerLab Bootcamp · MERN Stack + AI Engineering
**Assignment:** Assignment 2 — Personal Expense Tracker (Node.js + Express + fs + React + Tailwind)

A full-stack personal expense tracker, redesigned as a premium SaaS-style dashboard with dark mode, charts, CSV/PDF export, inline editing, and animated interactions — built on top of the original Express + fs + React assignment core.

---

## 1. Project Overview

ExpenseTracker Pro lets you log, filter, sort, edit, and analyze your personal spending. The backend is a small Express API that persists data to a JSON file (`data/expenses.json`) using Node's `fs` module — no database required. The frontend is a React (Vite) + Tailwind CSS dashboard that talks to that API.

The original assignment requirements (MVC structure, middleware, REST endpoints, fs-based storage, React + Tailwind frontend) are all intact and untouched in spirit — this version adds a visual redesign and a set of bonus features on top.

---

## 2. Features

### Core Features (Original Assignment)
- Add, view, edit, and delete expenses
- Filter by category, search text, and amount range
- Live statistics: total expenses, total amount, category breakdown
- Custom logging, validation, and global error-handling middleware
- MVC folder structure (routes / controllers / middleware / utils)
- JSON file storage via the `fs` module — no MongoDB

### Bonus Features (This Version)
- ✅ **Edit Expense** — click the pencil icon to edit any expense in place using the same form
- ✅ **Dark / Light Mode** — toggle in the header, preference saved in `localStorage`
- ✅ **CSV Export** — `GET /api/expenses/export`, generated with the `fs` module and downloaded from the header
- ✅ **PDF Export** — generated in the browser with `jsPDF` + `jspdf-autotable`
- ✅ **Charts** — Pie chart (spending by category) and bar chart (spending by month) using Recharts
- ✅ **Delete Confirmation Modal** — animated modal instead of the plain browser `confirm()`
- ✅ **Toast Notifications** — success/error toasts via `react-toastify` for every add/update/delete/error
- ✅ **Loading Skeletons** — pulsing placeholder cards while expenses are being fetched
- ✅ **Empty State Illustration** — friendly message when there are no expenses to show
- ✅ **Search Highlight** — matching search text is highlighted inside expense titles
- ✅ **Sorting** — newest, oldest, highest amount, lowest amount, alphabetical
- ✅ **Advanced Filters** — category, search, amount range, and **date range**, all combinable
- ✅ **Premium Dashboard UI** — gradient header, animated stat cards, glassmorphism touches, Framer Motion animations throughout

---

## 3. Tech Stack

| Layer            | Technology                                      |
|-------------------|--------------------------------------------------|
| Backend runtime   | Node.js                                          |
| Web framework     | Express.js                                       |
| Data storage      | `fs` module → `expenses.json` (no database)      |
| Frontend          | React (Vite)                                     |
| Styling           | Tailwind CSS v3 (dark mode via the `class` strategy) |
| Icons             | Lucide React                                     |
| Animations        | Framer Motion                                    |
| Charts            | Recharts                                         |
| Toasts            | React Toastify                                   |
| PDF generation    | jsPDF + jspdf-autotable                          |

---

## 4. Folder Structure

```
YourName_Assignment2/
├── README.md
├── expensetracker-backend/
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── data/                       (expenses.json & expenses_export.csv auto-created here)
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── middleware/
│   │   ├── logger.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   └── utils/
│       ├── fileHelper.js           (all fs logic lives here — reads/writes JSON + CSV)
│       └── errorResponse.js        (reusable createError() helper for controllers)
└── expensetracker-frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx                 (all top-level state lives here)
        ├── index.css
        ├── api/
        │   └── expenseApi.js       (every fetch call lives here)
        ├── constants/
        │   └── categories.js       (shared category icons/colors/labels + formatters)
        ├── hooks/
        │   └── useTheme.js         (dark/light mode + localStorage)
        ├── utils/
        │   └── exportPDF.js        (client-side PDF generation)
        └── components/
            ├── Header.jsx
            ├── Hero.jsx
            ├── StatsPanel.jsx
            ├── ChartsSection.jsx
            ├── ExpenseForm.jsx
            ├── FilterBar.jsx
            ├── ExpenseList.jsx
            ├── ExpenseItem.jsx
            ├── EmptyState.jsx
            ├── SkeletonLoader.jsx
            ├── ConfirmModal.jsx
            └── Footer.jsx
```

---

## 5. Installation & Running

### Backend

```bash
cd expensetracker-backend
npm install
npm run dev
```

- Runs on **http://localhost:3000**
- Health check: `GET http://localhost:3000/api/health`
- `expenses.json` is created automatically in `data/` the first time you add an expense.

`.env`:
```
PORT=3000
```

### Frontend

```bash
cd expensetracker-frontend
npm install
npm run dev
```

- Runs on **http://localhost:5173**
- Make sure the backend is running first, since the frontend calls `http://localhost:3000/api/expenses`.

---

## 6. API Endpoints

| Method | Endpoint                | Description                                              |
|--------|--------------------------|------------------------------------------------------------|
| GET    | `/api/expenses`          | Get all expenses. Supports `category`, `search`, `minAmount`, `maxAmount`, `dateFrom`, `dateTo` — all combinable |
| GET    | `/api/expenses/stats`    | Spending summary: totals, average, by-category, by-month, highest/lowest |
| GET    | `/api/expenses/export`   | Downloads all expenses as a `.csv` file (built with `fs`)  |
| GET    | `/api/expenses/:id`      | Get a single expense                                       |
| POST   | `/api/expenses`          | Create a new expense (validated: `title`, `amount`, `category`) |
| PUT    | `/api/expenses/:id`      | Partially update an expense (`id`/`createdAt` can't change) |
| DELETE | `/api/expenses/:id`      | Delete an expense                                           |

> `stats` and `export` are both registered **before** `/:id` in the router — otherwise Express would treat `"stats"`/`"export"` as an `:id` value and the routes would never be reached.

---

## 7. Screenshots

*(Add screenshots here before submission, e.g.:)*

`![Dashboard - Light Mode](./screenshots/dashboard-light.png)`
`![Dashboard - Dark Mode](./screenshots/dashboard-dark.png)`

---

## 8. Future Improvements

- User authentication (multiple people, multiple expense sets)
- Recurring expenses / budgets with alerts
- Backend-driven pagination for very large expense lists
- Deploy backend (Railway/Render) and frontend (Vercel/Netlify) for a live demo link

---

## 9. Notes for Viva

- **fs isolation:** all file-system access (JSON read/write, CSV export) is in `utils/fileHelper.js` only — controllers never call `fs` directly.
- **Error flow:** every controller catches its own errors and calls `next(err)`; `middleware/errorHandler.js` is the single place that formats error responses, using the `createError()` helper from `utils/errorResponse.js` for consistent messages/status codes.
- **State ownership:** `App.jsx` is still the single source of truth for state (expenses, stats, filters, sort, editing expense, delete confirmation, error) — all components below it are presentational and receive data/handlers via props.
- **Backward compatibility:** the stats endpoint gained new fields (`averageAmount`, `categoriesUsed`, `byMonth`) but kept every original field, so nothing that used the old shape breaks.
