// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();

const validate = require('../middleware/validate');
const {
  getAllExpenses,
  getExpenseStats,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  exportExpensesCSV,
} = require('../controllers/expenseController');

// NOTE: /stats and /export MUST be defined before /:id.
// If /:id came first, a request to /api/expenses/stats (or /export) would
// match /:id with "stats"/"export" treated as the id parameter, and these
// routes would never run.
router.get('/stats', getExpenseStats);
router.get('/export', exportExpensesCSV);

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);

router.post('/', validate('title', 'amount', 'category'), createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
