import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, formatDate } from './formatters';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportTransactionsToPDF = (transactions: any[], filename: string) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Transaction Report', 14, 22);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on ${formatDate(new Date())}`, 14, 30);

  const tableData = transactions.map((transaction) => [
    formatDate(transaction.date),
    transaction.type.toUpperCase(),
    transaction.categories?.name || 'Uncategorized',
    formatCurrency(transaction.amount),
    transaction.notes || '',
  ]);

  autoTable(doc, {
    startY: 35,
    head: [['Date', 'Type', 'Category', 'Amount', 'Notes']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
  });

  doc.save(filename);
};
