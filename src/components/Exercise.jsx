import React, { useState, useEffect } from 'react';
import "./Exercises.css";
const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch('http://localhost:3000/exercises', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':   `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('Fetched data:', data);
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExercises();
  }, []);
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.exercise_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.exercise_type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="Exercises">
      <h2>Exercises</h2>
      <div className="Search-bar">
        <input
          type="text"
          placeholder="Search by name or workout type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="Exercises-cards">
        {filteredExercises.map((exercise) => (
          <div className="Exercises-card" key={exercise.id}>
            <img src={exercise.image} alt={exercise.exercise_name} />
            <h3>{exercise.exercise_name}</h3>
            <p>Exercise Type: {exercise.exercise_type}</p>
            {/* <p>Instructions: {exercise.exercise_description}</p> */}
            <p>{exercise.body_part}</p>
            <p>Duration: {exercise.duration || 'N/A'}</p>
            <p>Sets and Reps: {exercise.sets} sets, {exercise.reps} reps</p>
            <p>Calories Burned: {exercise.calories_burned}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Exercises;