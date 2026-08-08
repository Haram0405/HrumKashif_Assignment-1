// controllers/expenseController.js
// Business logic for the /api/expenses resource.
// Data is stored in MongoDB through the Expense model.

const Expense = require('../models/Expense');
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
// Supports: category, search, minAmount, maxAmount, dateFrom, dateTo
const getAllExpenses = async (req, res, next) => {
  try {
    const {
      category,
      search,
      minAmount,
      maxAmount,
      dateFrom,
      dateTo,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category.toLowerCase();
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: 'i',
      };
    }

    if (minAmount || maxAmount) {
      filter.amount = {};

      if (minAmount) {
        filter.amount.$gte = Number(minAmount);
      }

      if (maxAmount) {
        filter.amount.$lte = Number(maxAmount);
      }
    }

    if (dateFrom || dateTo) {
      filter.date = {};

      if (dateFrom) {
        filter.date.$gte = new Date(dateFrom);
      }

      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        filter.date.$lte = endDate;
      }
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

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
const getExpenseStats = async (req, res, next) => {
  try {
    const expenses = await Expense.find();

    const totalExpenses = expenses.length;

    const totalAmount = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const byCategory = {};

    expenses.forEach((expense) => {
      if (!byCategory[expense.category]) {
        byCategory[expense.category] = {
          count: 0,
          total: 0,
        };
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

      highestExpense = {
        title: highestExpense.title,
        amount: highestExpense.amount,
      };

      lowestExpense = {
        title: lowestExpense.title,
        amount: lowestExpense.amount,
      };
    }

    // Monthly totals
    const byMonth = {};

    expenses.forEach((expense) => {
      const monthKey = expense.date
        ? expense.date.toISOString().slice(0, 7)
        : 'unknown';

      if (!byMonth[monthKey]) {
        byMonth[monthKey] = {
          count: 0,
          total: 0,
        };
      }

      byMonth[monthKey].count += 1;
      byMonth[monthKey].total += expense.amount;
    });

    const averageAmount =
      totalExpenses > 0 ? totalAmount / totalExpenses : 0;

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
const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return next(createError(404, 'Expense not found'));
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/expenses
const createExpense = async (req, res, next) => {
  try {
    const {
      title,
      amount,
      category,
      description,
      date,
    } = req.body;

    const newExpense = await Expense.create({
      title,
      amount: Number(amount),
      category,
      description: description || '',
      date: date || new Date(),
    });

    res.status(201).json({
      success: true,
      data: newExpense,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/expenses/:id
const updateExpense = async (req, res, next) => {
  try {
    if (
      req.body.category &&
      !VALID_CATEGORIES.includes(req.body.category)
    ) {
      return next(
        createError(
          400,
          `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`
        )
      );
    }

    if (
      req.body.amount !== undefined &&
      Number(req.body.amount) <= 0
    ) {
      return next(
        createError(400, 'Amount must be greater than 0')
      );
    }

    // Prevent changing MongoDB _id and timestamps manually.
    const {
      _id,
      id,
      createdAt,
      updatedAt,
      ...allowedUpdates
    } = req.body;

    if (allowedUpdates.amount !== undefined) {
      allowedUpdates.amount = Number(allowedUpdates.amount);
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return next(createError(404, 'Expense not found'));
    }

    res.status(200).json({
      success: true,
      data: updatedExpense,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res, next) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(
      req.params.id
    );

    if (!deletedExpense) {
      return next(createError(404, 'Expense not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/expenses/export
// Creates CSV from MongoDB data and downloads it.
const exportExpensesCSV = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    const headerRow = [
      'id',
      'title',
      'amount',
      'category',
      'date',
      'description',
      'createdAt',
    ];

    const csvRows = [headerRow.join(',')];

    expenses.forEach((expense) => {
      const row = [
        expense._id,
        `"${(expense.title || '').replace(/"/g, '""')}"`,
        expense.amount,
        expense.category,
        expense.date
          ? expense.date.toISOString().split('T')[0]
          : '',
        `"${(expense.description || '').replace(/"/g, '""')}"`,
        expense.createdAt
          ? expense.createdAt.toISOString()
          : '',
      ];

      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');

    res
      .status(200)
      .setHeader('Content-Type', 'text/csv')
      .setHeader(
        'Content-Disposition',
        'attachment; filename="expenses.csv"'
      )
      .send(csvContent);
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