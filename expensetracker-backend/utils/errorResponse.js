// utils/errorResponse.js
// Small reusable helper so controllers don't repeat
// "const err = new Error(...); err.status = ...;" everywhere.
// Keeps error creation consistent and easy to read during a viva.

function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

module.exports = { createError };
