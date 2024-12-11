// App.js
import React, { useState } from 'react';
import WorkoutForm from './component/workoutfrom';
import WorkoutList from './component/workoutlist';
import './App.css';  // Correct import syntax

function App() {
    const [workouts, setWorkouts] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const addWorkout = (workout) => {
        setWorkouts([...workouts, workout]);
    };

    const removeWorkout = (index) => {
        const updatedWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(updatedWorkouts);
    };

    const filteredWorkouts = workouts.filter(workout => {
        if (startDate && new Date(workout.date) < new Date(startDate)) return false;
        if (endDate && new Date(workout.date) > new Date(endDate)) return false;
        return true;
    });

    return (
        <div>
            <h1>Workout Tracker</h1>
            <WorkoutForm addWorkout={addWorkout} />
            <div>
                <label>Start Date: </label>
                <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                <label>End Date: </label>
                <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <WorkoutList workouts={filteredWorkouts} removeWorkout={removeWorkout} />
        </div>
    );
}

export default App;
