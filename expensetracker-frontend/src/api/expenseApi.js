// src/api/expenseApi.js
// Every fetch call in the whole frontend lives in this one file.
// Components never call fetch() directly - they import these functions.

const BASE_URL = 'http://localhost:3000/api/expenses';

// GET /api/expenses with optional filters { category, search, minAmount, maxAmount }
export async function getAllExpenses(filters = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }
  return response.json();
}

// GET /api/expenses/stats
export async function getStats() {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  return response.json();
}

// POST /api/expenses
export async function createExpense(expenseData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to create expense');
  }
  return response.json();
}

// PUT /api/expenses/:id
export async function updateExpense(id, expenseData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to update expense');
  }
  return response.json();
}

// DELETE /api/expenses/:id
export async function deleteExpense(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to delete expense');
  }
  return response.json();
}
