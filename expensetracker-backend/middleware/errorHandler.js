// middleware/errorHandler.js
// Global error handler. Express recognizes this as an error handler because
// it takes exactly 4 parameters: (err, req, res, next).
// This must be registered LAST in server.js, after every route.

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
