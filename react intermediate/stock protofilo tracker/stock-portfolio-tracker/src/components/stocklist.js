import React, { useState } from 'react';

function StockList({ onAddStock }) {
  const [stockName, setStockName] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState(1);

  const handleAdd = () => {
    if (stockName && stockSymbol && stockPrice && stockQuantity > 0) {
      const newStock = {
        name: stockName,
        symbol: stockSymbol,
        price: parseFloat(stockPrice),
        quantity: parseInt(stockQuantity),
      };
      onAddStock(newStock);
      setStockName('');
      setStockSymbol('');
      setStockPrice('');
      setStockQuantity(1);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>Add New Stock</h2>
      <input
        type="text"
        placeholder="Stock Name"
        value={stockName}
        onChange={(e) => setStockName(e.target.value)}
        style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
      />
      <input
        type="text"
        placeholder="Stock Symbol"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
        style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
      />
      <input
        type="number"
        placeholder="Stock Price"
        value={stockPrice}
        onChange={(e) => setStockPrice(e.target.value)}
        style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
        style={{ margin: '5px', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleAdd} style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Add Stock
      </button>
    </div>
  );
}

export default StockList;
