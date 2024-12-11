// src/components/ExportHistory.js
import React, { useContext } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GlobalContext } from '../context/GlobalState';

export const ExportHistory = () => {
  const { transactions } = useContext(GlobalContext);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'transaction_history.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction History', 14, 10);
    const tableColumn = ['ID', 'Text', 'Amount'];
    const tableRows = transactions.map(transaction => [
      transaction.id,
      transaction.text,
      transaction.amount,
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save('transaction_history.pdf');
  };

  return (
    <div className="export-buttons">
      <button onClick={exportToExcel} className="export-btn">Export to Excel</button>
      <button onClick={exportToPDF} className="export-btn">Export to PDF</button>
    </div>
  );
};
