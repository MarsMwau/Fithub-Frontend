import React, { useState } from "react";
import "./FitnessGoal.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const FitnessGoal = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const handleFilter = async (goal) => {
    try {
      // Get the authentication token from your user session or storage
      const token = localStorage.getItem("token");
      // Fetch exercises from the server with the authorization token
      const response = await fetch("http://127.0.0.1:3000/exercises", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      // Handle unauthorized error
      if (!response.ok) {
        throw new Error(
          "Unauthorized: You may need to provide correct authentication credentials."
        );
      }
      const data = await response.json();
      // Ensure the received data is an array
      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid data format: The server response should be an array of exercises."
        );
      }
      // Filter the exercises based on the selected goal
      const filteredExercises = data.filter(
        (exercise) => exercise.exercise_type === goal
      );
      setFilteredExercises(filteredExercises);
    } catch (error) {
      console.error("Error fetching exercises:", error.message);
    }
  };
  const handleButtonClick = async (goal) => {
    await handleFilter(goal);
    setSelectedGoal(goal);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="FitnessGoal">
      {/* <h2>Fitness Goal</h2> */}
      <div className="button-container">
        <button
          onClick={() => handleButtonClick("Build Muscle")}
          className="icon-button"
          data-content="Build Muscle"
        >
          <i className="fas fa-dumbbell"></i>
          <span>Build Muscle</span>
        </button>
        <button
          onClick={() => handleButtonClick("Lose Weight")}
          className="icon-button"
          data-content="Loose Weight"
        >
          <i className="fas fa-weight"></i>
          <span>Lose Weight</span>
        </button>
        <button
          onClick={() => handleButtonClick("Improve Endurance")}
          className="icon-button"
          data-content="Improve Endurance"
        >
          <i className="fas fa-running"></i>
          <span>Improve Endurance</span>
        </button>
      </div>
      {showPopup && (
        <div className="ExercisePopup">
          <div className="ExercisePopup-content">
            <div className="ExercisePopup-close-btn">
              <button onClick={handleClosePopup}>X</button>
            </div>
            <h3>Filtered Exercises for {selectedGoal}</h3>
            <div className="Exercise-cards">
              {filteredExercises.map((exercise) => (
                <div className="Exercise-card" key={exercise.id}>
                  <img src={exercise.image} alt={exercise.exercise_name} />
                  <p>{exercise.exercise_name}</p>
                  <p>Exercise Type: {exercise.exercise_type}</p>
                  <p>{exercise.body_part}</p>
                  <p>Duration: {exercise.duration || "N/A"}</p>
                  <p>
                    Sets and Reps: {exercise.sets} sets, {exercise.reps} reps
                  </p>
                  <p>Calories Burned: {exercise.calories_burned}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FitnessGoal;