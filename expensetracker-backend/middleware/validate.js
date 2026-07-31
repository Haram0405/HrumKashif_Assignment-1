// middleware/validate.js
// A middleware factory. Call it with the field names that must be present
// in req.body, e.g. validate('title', 'amount', 'category').

const VALID_CATEGORIES = ['food', 'transport', 'shopping', 'utilities', 'health', 'other'];

const validate = (...requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.filter((field) => {
    const value = req.body[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  // Extra checks for fields that are present but hold invalid values.
  if (requiredFields.includes('amount') && Number.isNaN(Number(req.body.amount))) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be a valid number',
    });
  }

  if (requiredFields.includes('amount') && Number(req.body.amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0',
    });
  }

  if (requiredFields.includes('category') && !VALID_CATEGORIES.includes(req.body.category)) {
    return res.status(400).json({
      success: false,
      message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`,
    });
  }

  next();
};

module.exports = validate;
