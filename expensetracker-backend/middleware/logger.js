// middleware/logger.js
// Logs every incoming request in the format: [ISO-timestamp] METHOD  /url

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const paddedMethod = req.method.padEnd(6);
  console.log(`[${timestamp}] ${paddedMethod} ${req.url}`);
  next();
};

module.exports = logger;
