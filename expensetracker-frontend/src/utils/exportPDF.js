// src/utils/exportPDF.js
// Bonus feature: generates a PDF report of the current expense list
// entirely in the browser using jsPDF + jspdf-autotable.

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportExpensesToPDF(expenses, stats) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('ExpenseTracker Report', 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US')}`, 14, 25);

  if (stats) {
    doc.setFontSize(11);
    doc.setTextColor(30);
    doc.text(`Total Expenses: ${stats.totalExpenses}`, 14, 34);
    doc.text(`Total Amount: PKR ${stats.totalAmount.toLocaleString('en-PK')}`, 14, 40);
  }

  const tableRows = expenses.map((expense) => [
    expense.title,
    expense.category,
    `PKR ${expense.amount.toLocaleString('en-PK')}`,
    expense.date,
    expense.description || '-',
  ]);

  autoTable(doc, {
    startY: 46,
    head: [['Title', 'Category', 'Amount', 'Date', 'Description']],
    body: tableRows,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [79, 70, 229] },
  });

  doc.save(`expenses_${new Date().toISOString().split('T')[0]}.pdf`);
}
