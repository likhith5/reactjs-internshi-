import React, { useState } from 'react';
import './App.css';

function App() {
  // Initialize state for the counter
  const [count, setCount] = useState(0);

  // Functions to handle increment, decrement, and reset
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <div className="counter-container">
      <h1>Counterapp</h1>
      <div className="counter-display">{count}</div>
      <div className="button-group">
        <button onClick={handleIncrement} className="btn increment">increment</button>
        <button onClick={handleDecrement} className="btn decrement">decrement</button>
        <button onClick={handleReset} className="btn reset">Reset</button>
      </div>
    </div>
  );

}
export default App
