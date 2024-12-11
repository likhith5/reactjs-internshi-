import React, { useState } from 'react';
import StockList from './components/stocklist';
import Portfolio from './components/protofilo';
import { Pie, Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {
  const [portfolio, setPortfolio] = useState([]);

  const handleAddStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleRemoveStock = (stockSymbol) => {
    setPortfolio(portfolio.filter((stock) => stock.symbol !== stockSymbol));
  };

  const calculateTotalValue = () => {
    return portfolio
      .reduce((total, stock) => total + stock.price * stock.quantity, 0)
      .toFixed(2);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(portfolio);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Portfolio');
    XLSX.writeFile(wb, 'portfolio.xlsx');
  };

  const importFromExcel = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet);
      setPortfolio(importedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const chartContainer = document.getElementById('charts-container');

    domToImage.toPng(chartContainer).then((imgData) => {
      doc.text('Portfolio Report', 15, 10);
      doc.addImage(imgData, 'PNG', 10, 20, 190, 120);
      doc.save('portfolio.pdf');
    });
  };

  const generatePieChartData = () => {
    const labels = portfolio.map((stock) => stock.symbol);
    const data = portfolio.map((stock) => stock.price * stock.quantity);
    return {
      labels,
      datasets: [
        {
          label: 'Portfolio Composition',
          data,
          backgroundColor: [
            '#3498db',
            '#2ecc71',
            '#e74c3c',
            '#9b59b6',
            '#f1c40f',
            '#e67e22',
            '#34495e',
          ],
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    };
  };

  const generateLineChartData = () => {
    const labels = portfolio.map((stock) => stock.symbol);
    const data = portfolio.map((stock) => stock.price * stock.quantity);
    return {
      labels,
      datasets: [
        {
          label: 'Stock Performance',
          data,
          fill: false,
          backgroundColor: '#3498db',
          borderColor: '#3498db',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
      <h1
        style={{
          fontFamily: 'Trebuchet MS, sans-serif',
          color: '#212529',
          textAlign: 'center',
        }}
      >
        Stock Portfolio Tracker
      </h1>
      <StockList onAddStock={handleAddStock} />
      <Portfolio portfolio={portfolio} onRemoveStock={handleRemoveStock} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Total Portfolio Value: ₹{calculateTotalValue()}</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={importFromExcel}
          style={{ marginBottom: '10px' }}
        />
        <div>
          <button
            onClick={exportToExcel}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Export to Excel
          </button>
          <button
            onClick={exportToPDF}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Export to PDF
          </button>
        </div>
      </div>
      <div
        id="charts-container"
        style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}
      >
        {portfolio.length > 0 && (
          <>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#212529' }}>Portfolio Composition (Pie Chart)</h2>
              <div style={{ width: '400px', height: '400px' }}>
                <Pie data={generatePieChartData()} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#212529' }}>Stock Performance (Line Chart)</h2>
              <div style={{ width: '600px', height: '400px' }}>
                <Line data={generateLineChartData()} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
