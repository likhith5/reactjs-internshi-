
import React, { useState } from 'react';
// Correct the component name to start with an uppercase letter
const WorkoutForm = ({ addWorkout }) => {
    const [workoutName, setWorkoutName] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!workoutName || !duration || !date) return;

        const newWorkout = { workoutName, duration, date };
        addWorkout(newWorkout);
        setWorkoutName('');
        setDuration('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Workout Name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Duration (in minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Add Workout</button>
        </form>
    );
};

export default WorkoutForm;

