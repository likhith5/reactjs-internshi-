import React, { useState, useEffect, useRef } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0); 
  const [isActive, setIsActive] = useState(false);
  const [alarmTime, setAlarmTime] = useState(null); 
  const alarmSound = useRef(new Audio('D:/assignments/stopwatch/stopwatch-app/public/.mp3'));

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (alarmTime && time === alarmTime) {
      alarmSound.current.play();
    }
  }, [time, alarmTime]);

  const startStopwatch = () => {
    setIsActive(true);
  };

  const stopStopwatch = () => {
    setIsActive(false);
  };

  const resetStopwatch = () => {
    setIsActive(false);
    setTime(0);
  };

  const handleAlarmTimeChange = (e) => {
    setAlarmTime(parseInt(e.target.value, 10));
  };

  return (
    <div style={styles.container}>
      <h1>Stopwatch</h1>
      <div style={styles.timer}>
        {new Date(time * 1000).toISOString().substr(11, 8)}
      </div>
      <div style={styles.controls}>
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
      <div style={styles.alarm}>
        <label>
          Set Alarm (seconds): 
          <input type="number" onChange={handleAlarmTimeChange} />
        </label>
      </div>
    </div>
  );
}
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
    color: 'skyblue',
    width: '300px',
  },
  timer: {
    fontSize: '48px',
    margin: '20px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    margin: '20px 0',
  },
  alarm: {
    marginTop: '20px',
  },
};


  
  
  
  
  
  
  
  
  
  
  
  
  
  

export default Stopwatch;
