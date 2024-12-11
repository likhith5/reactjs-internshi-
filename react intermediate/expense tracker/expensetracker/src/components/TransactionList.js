import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Transaction } from './Transaction'; // Ensure correct path if in the same folder

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  // State to hold date range filter
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter transactions based on date range
  const filteredTransactions = transactions.filter((txn) => {
    const transactionDate = new Date(txn.date); // assuming txn.date is in 'YYYY-MM-DD' format
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      (!start || transactionDate >= start) &&
      (!end || transactionDate <= end)
    );
  });

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'transactions.xlsx');
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Transaction History', 20, 20);
    let y = 30;
    filteredTransactions.forEach((txn, index) => {
      doc.text(`Transaction ${index + 1}: ${txn.text} - $${txn.amount}`, 20, y);
      y += 10;
    });
    doc.save('transactions.pdf');
  };

  return (
    <div className="transaction-list-container">
      {/* Date range filter */}
      <div className="date-range-filter">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
      </div>

      <div className="export-buttons">
        <button onClick={exportToExcel} className="export-btn">Export to Excel</button>
        <button onClick={exportToPDF} className="export-btn">Export to PDF</button>
      </div>

      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions to display</p>
      ) : (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.description} - ${transaction.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
