// controllers/expenseController.js
// All business logic for the /api/expenses resource lives here.
// This file NEVER imports 'fs' directly - it only uses the helpers
// exported from utils/fileHelper.js.

const { readExpenses, writeExpenses, writeCSVExport } = require('../utils/fileHelper');
const { createError } = require('../utils/errorResponse');

const VALID_CATEGORIES = [
  'food',
  'transport',
  'shopping',
  'utilities',
  'health',
  'other',
];

// GET /api/expenses
// Supports ?category, ?search, ?minAmount, ?maxAmount - all combinable.
const getAllExpenses = (req, res, next) => {
  try {
    const { category, search, minAmount, maxAmount, dateFrom, dateTo } = req.query;
    let expenses = readExpenses();

    if (category) {
      expenses = expenses.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      expenses = expenses.filter((expense) =>
        expense.title.toLowerCase().includes(searchTerm)
      );
    }

    if (minAmount) {
      const minValue = Number(minAmount);
      expenses = expenses.filter((expense) => expense.amount >= minValue);
    }

    if (maxAmount) {
      const maxValue = Number(maxAmount);
      expenses = expenses.filter((expense) => expense.amount <= maxValue);
    }

    // Bonus: date range filter (additive, does not affect existing filters above)
    if (dateFrom) {
      expenses = expenses.filter((expense) => expense.date >= dateFrom);
    }

    if (dateTo) {
      expenses = expenses.filter((expense) => expense.date <= dateTo);
    }

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/expenses/stats
// IMPORTANT: this route must be registered before GET /:id in the router,
// otherwise "stats" would be parsed as an :id value.
const getExpenseStats = (req, res, next) => {
  try {
    const expenses = readExpenses();

    const totalExpenses = expenses.length;
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const byCategory = {};
    expenses.forEach((expense) => {
      if (!byCategory[expense.category]) {
        byCategory[expense.category] = { count: 0, total: 0 };
      }
      byCategory[expense.category].count += 1;
      byCategory[expense.category].total += expense.amount;
    });

    let highestExpense = null;
    let lowestExpense = null;

    if (totalExpenses > 0) {
      highestExpense = expenses.reduce((highest, expense) =>
        expense.amount > highest.amount ? expense : highest
      );
      lowestExpense = expenses.reduce((lowest, expense) =>
        expense.amount < lowest.amount ? expense : lowest
      );
      highestExpense = { title: highestExpense.title, amount: highestExpense.amount };
      lowestExpense = { title: lowestExpense.title, amount: lowestExpense.amount };
    }

    // Bonus: monthly totals, used by the frontend bar chart.
    // Additive field - existing consumers of this endpoint are unaffected.
    const byMonth = {};
    expenses.forEach((expense) => {
      const monthKey = expense.date ? expense.date.slice(0, 7) : 'unknown'; // "YYYY-MM"
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = { count: 0, total: 0 };
      }
      byMonth[monthKey].count += 1;
      byMonth[monthKey].total += expense.amount;
    });

    const averageAmount = totalExpenses > 0 ? totalAmount / totalExpenses : 0;
    const categoriesUsed = Object.keys(byCategory).length;

    res.status(200).json({
      success: true,
      data: {
        totalExpenses,
        totalAmount,
        averageAmount,
        categoriesUsed,
        byCategory,
        byMonth,
        highestExpense,
        lowestExpense,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/expenses/:id
const getExpenseById = (req, res, next) => {
  try {
    const expenseId = parseInt(req.params.id, 10);
    const expenses = readExpenses();
    const foundExpense = expenses.find((expense) => expense.id === expenseId);

    if (!foundExpense) {
      return next(createError(404, 'Expense not found'));
    }

    res.status(200).json({
      success: true,
      data: foundExpense,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/expenses
const createExpense = (req, res, next) => {
  try {
    // Note: title, amount, and category are already guaranteed to be present
    // and valid at this point because the 'validate' middleware ran first.
    const { title, amount, category, description, date } = req.body;

    const expenses = readExpenses();

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date: date || new Date().toISOString().split('T')[0],
      description: description || '',
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);
    writeExpenses(expenses);

    res.status(201).json({
      success: true,
      data: newExpense,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/expenses/:id
const updateExpense = (req, res, next) => {
  try {
    const expenseId = parseInt(req.params.id, 10);
    const expenses = readExpenses();
    const expenseIndex = expenses.findIndex((expense) => expense.id === expenseId);

    if (expenseIndex === -1) {
      return next(createError(404, 'Expense not found'));
    }

    if (req.body.category && !VALID_CATEGORIES.includes(req.body.category)) {
      return next(
        createError(400, `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`)
      );
    }

    if (req.body.amount !== undefined && Number(req.body.amount) <= 0) {
      return next(createError(400, 'Amount must be greater than 0'));
    }

    // id and createdAt must never change, regardless of what is sent.
    const { id, createdAt, ...allowedUpdates } = req.body;

    const updatedExpense = {
      ...expenses[expenseIndex],
      ...allowedUpdates,
    };

    if (updatedExpense.amount !== undefined) {
      updatedExpense.amount = Number(updatedExpense.amount);
    }

    expenses[expenseIndex] = updatedExpense;
    writeExpenses(expenses);

    res.status(200).json({
      success: true,
      data: updatedExpense,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/expenses/:id
const deleteExpense = (req, res, next) => {
  try {
    const expenseId = parseInt(req.params.id, 10);
    const expenses = readExpenses();
    const expenseIndex = expenses.findIndex((expense) => expense.id === expenseId);

    if (expenseIndex === -1) {
      return next(createError(404, 'Expense not found'));
    }

    expenses.splice(expenseIndex, 1);
    writeExpenses(expenses);

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/expenses/export
// Bonus feature: builds a CSV file from all expenses and sends it as a
// download. Must be registered BEFORE /:id in the router, same reason as /stats.
const exportExpensesCSV = (req, res, next) => {
  try {
    const expenses = readExpenses();

    const headerRow = ['id', 'title', 'amount', 'category', 'date', 'description', 'createdAt'];
    const csvRows = [headerRow.join(',')];

    expenses.forEach((expense) => {
      const row = [
        expense.id,
        `"${(expense.title || '').replace(/"/g, '""')}"`,
        expense.amount,
        expense.category,
        expense.date,
        `"${(expense.description || '').replace(/"/g, '""')}"`,
        expense.createdAt,
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const filePath = writeCSVExport(csvContent);

    res.download(filePath, 'expenses.csv', (err) => {
      if (err) next(err);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllExpenses,
  getExpenseStats,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  exportExpensesCSV,
};
