// server.js - Entry point for the ExpenseTracker backend

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// cors() must be registered before routes
app.use(cors({ origin: 'http://localhost:5173' }));

// express.json() must be registered before routes so req.body is populated
app.use(express.json());

// Custom request logger
app.use(logger);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Mount expense routes
app.use('/api/expenses', expenseRoutes);

// Global error handler - must be registered LAST, after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`ExpenseTracker backend running on http://localhost:${PORT}`);
});
