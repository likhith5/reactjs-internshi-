import React from 'react';

function Portfolio({ portfolio, onRemoveStock }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Your Portfolio</h2>
      {portfolio.length === 0 ? (
        <p>No stocks in your portfolio. Add some stocks!</p>
      ) : (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Symbol</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((stock) => (
              <tr key={stock.symbol}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{stock.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{stock.symbol}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Rs{stock.price}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{stock.quantity}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Rs{(stock.price * stock.quantity).toFixed(2)}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button
                    onClick={() => onRemoveStock(stock.symbol)}
                    style={{ padding: '5px 10px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Portfolio;
