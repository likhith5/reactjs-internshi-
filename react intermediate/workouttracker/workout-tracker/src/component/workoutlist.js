
import React from 'react';

const WorkoutList = ({ workouts, removeWorkout }) => {
    return (
        <div>
            <h2>Workouts</h2>
            <ul>
                {workouts.map((workout, index) => (
                    <li key={index}>
                        <h3>{workout.workoutName}</h3>
                        <p>Duration: {workout.duration} minutes</p>
                        <p>Date: {workout.date}</p>
                        <button onClick={() => removeWorkout(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkoutList;
