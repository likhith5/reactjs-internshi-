import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/jokes');
      const { setup, delivery, joke } = response.data;

      
      if (joke) {
        setJoke(joke);
      } else {
        setJoke(`${setup} ... ${delivery}`);
      }
    } catch (error) {
      setJoke("Oops! Couldn't fetch a joke.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Random Joke Generator</h1>
      <div style={{ margin: '20px 0', fontSize: '1.2em' }}>
        {loading ? 'Loading...' : joke || 'Click the button to get a joke!'}
      </div>
      <button onClick={fetchJoke} style={buttonStyle}>
        Get a Random Joke
      </button>
    </div>
  );
}


const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1em',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

export default App;
