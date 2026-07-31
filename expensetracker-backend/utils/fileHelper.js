// utils/fileHelper.js
// This is the ONLY file in the entire backend that is allowed to touch the
// file system. Controllers must always go through readExpenses/writeExpenses
// instead of requiring 'fs' themselves.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'expenses.json');

/**
 * Reads the expenses.json file and returns the parsed array.
 * Returns an empty array if the file does not exist or cannot be parsed.
 */
function readExpenses() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(rawData);
  } catch (err) {
    return [];
  }
}

/**
 * Writes the given expenses array to expenses.json as pretty-printed JSON.
 * Creates the data/ directory first if it does not already exist.
 */
function writeExpenses(expenses) {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

const CSV_FILE = path.join(__dirname, '..', 'data', 'expenses_export.csv');

/**
 * Writes the given CSV text to disk (bonus: CSV export feature) and
 * returns the absolute path so the controller can stream it back to
 * the client with res.download(). This keeps ALL fs access inside
 * this one helper file, same as readExpenses/writeExpenses above.
 */
function writeCSVExport(csvContent) {
  const dataDir = path.dirname(CSV_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(CSV_FILE, csvContent);
  return CSV_FILE;
}

module.exports = { readExpenses, writeExpenses, writeCSVExport };
