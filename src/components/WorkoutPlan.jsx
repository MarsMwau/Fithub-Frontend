import React, { useState, useEffect } from "react";
import "./WorkoutPlan.css";
import WorkoutList from "./WorkoutList";
const WorkoutPlan = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSearchResults, setExerciseSearchResults] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const handleSearchExercise = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:3000/exercises?exercise_name=${exerciseName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setExerciseSearchResults(data);
      setShowPopup(true); // Show the popup when search results are available
    } catch (error) {
      console.error("Error searching exercise:", error);
    }
  };
  const handleAddExerciseToSelection = (exercise) => {
    setSelectedExercises((prevExercises) => [...prevExercises, exercise]);
  };
  const handleCreateWorkoutPlan = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(
        `http://127.0.0.1:3000/users/${userId}/workout_plans`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: selectedDate,
            exercise_ids: selectedExercises.map((exercise) => exercise.id),
          }),
        }
      );
      const result = await response.json();
      console.log(result.message);
      // Clear selectedExercises array and selectedDate
      setSelectedExercises([]);
      setSelectedDate("");
    } catch (error) {
      console.error("Error creating workout plan:", error);
    }
  };
  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  const handleClosePopup = () => {
    setExerciseSearchResults([]);
    setShowPopup(false); // Close the popup
  };
  return (
    <div className="workout-plan">
      <h1>Feeling like doing something fun?..</h1>
      <div className="workout-plan-container">
        <h2>Create a Workout Plan</h2>
        <div className="form-container">
          <div className="input-group">
            <label>Date</label>
            <input
              className="input-field"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <button
            className="search-button"
            type="button"
            onClick={handleSearchExercise}
          >
            <span className="icon">Add Exercise:mag:</span>
          </button>
          </div>
        </div>
        {showPopup && exerciseSearchResults.length > 0 && (
          <div className="exercise-workoutplan-popup">
            <div className="exercise-workoutplan-content">
              <button className="close-button" onClick={handleClosePopup}>
                Close
              </button>
              <h2>Click on an exercise to add it</h2>
              <div className="exercise-cards">
                {exerciseSearchResults.map((exercise) => (
                  <div
                    className="exercise-card"
                    key={exercise.id}
                    onClick={() => handleAddExerciseToSelection(exercise)}
                  >
                    <img src={exercise.image} alt={exercise.exercise_name} />
                    <h3>{exercise.exercise_name}</h3>
                    <p>Exercise Type: {exercise.exercise_type}</p>
                    <p>Body Part: {exercise.body_part}</p>
                    <p>Sets: {exercise.sets}</p>
                    <p>Reps: {exercise.reps}</p>
                    <p>Duration: {exercise.duration} seconds</p>
                    <p>Calories Burned: {exercise.calories_burned}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {selectedExercises.length > 0 && (
          <div className="selected-exercises">
            <h3>Selected Exercises</h3>
            <ul>
              {selectedExercises.map((exercise) => (
                <li key={exercise.id}>{exercise.exercise_name}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="create-button"
          type="button"
          onClick={handleCreateWorkoutPlan}
        >
          <span className="icon">✓</span> Create Workout Plan
        </button>
      </div>
      <WorkoutList />
    </div>
  );
};
export default WorkoutPlan;