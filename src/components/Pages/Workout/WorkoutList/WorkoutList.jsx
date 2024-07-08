import React, { useState, useEffect } from "react";
import "./WorkoutList.css";
import { FaPlus, FaTrashAlt, FaEye } from "react-icons/fa";
function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);
  const [showAddExercisePopup, setShowAddExercisePopup] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showWorkoutPlanPopup, setShowWorkoutPlanPopup] = useState(false);
  const [selectedWorkoutPlanExercises, setSelectedWorkoutPlanExercises] =
    useState([]);
  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(
        `http://localhost:3000/users/${userId}/workout_plans`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setWorkouts(data);
      } else {
        console.error("Invalid response: Workout data is not an array");
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };
  useEffect(() => {
    fetchWorkouts();
  }, []);
  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  };
  const sortedWorkouts = workouts
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const openAddExercisePopup = () => {
    setShowAddExercisePopup(true);
  };
  const closeAddExercisePopup = () => {
    setShowAddExercisePopup(false);
  };
  const selectWorkoutPlan = (workoutId) => {
    setSelectedWorkoutPlan(workoutId);
    openAddExercisePopup();
  };
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/exercises", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
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
  const handleAddExercise = async (exerciseId) => {
    try {
      if (selectedWorkoutPlan === null) {
        console.error("No workout plan selected");
        return;
      }
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(
        `http://localhost:3000/users/${userId}/workout_plans/${selectedWorkoutPlan}/add_exercise`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ exercise_id: exerciseId }),
        }
      );
      if (response.ok) {
        fetchWorkouts();
      } else {
        console.error("Failed to add exercise to workout plan");
      }
    } catch (error) {
      console.error("Error adding exercise to workout plan:", error);
    }
  };
  const handleRemoveExercise = async (exerciseId) => {
    if (!selectedWorkoutPlan) {
      console.error("No workout plan selected");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(
        `http://localhost:3000/users/${userId}/workout_plans/${selectedWorkoutPlan.id}/remove_exercise`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ exercise_id: exerciseId }),
        }
      );
      if (response.ok) {
        setSelectedWorkoutPlanExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise.id !== exerciseId)
        );
      } else {
        console.error("Failed to remove exercise from workout plan");
      }
    } catch (error) {
      console.error("Error removing exercise from workout plan:", error);
    }
  };
  const handleDeleteWorkout = async (workoutPlanId) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(
        `http://localhost:3000/users/${userId}/workout_plans/${workoutPlanId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setWorkouts((prevWorkouts) =>
          prevWorkouts.filter((workout) => workout.id !== workoutPlanId)
        );
      } else {
        console.error("Failed to delete workout plan");
      }
    } catch (error) {
      console.error("Error deleting workout plan:", error);
    }
  };
  const openWorkoutPlanPopup = (workoutPlan) => {
    setSelectedWorkoutPlan(workoutPlan);
    setSelectedWorkoutPlanExercises(workoutPlan.exercises);
    setShowWorkoutPlanPopup(true);
  };
  const closeWorkoutPlanPopup = () => {
    setSelectedWorkoutPlanExercises([]);
    setShowWorkoutPlanPopup(false);
  };
  const handleClosePopup = () => {
    setShowAddExercisePopup(false);
  };
  return (
    <div className="workout-list">
      <h1 className="head">My Workout Plans</h1>
      <div className="workout-container">
        {sortedWorkouts.map((workout) => (
          <div key={workout.id} className="box">
            <span className="title">{formatDate(workout.date)}</span>
            <div className="workout-details">
              <strong>{workout.exercises.length} exercises</strong>
              <button
                className="view-exercises-button"
                onClick={() => openWorkoutPlanPopup(workout)}
              >
                <FaEye /> View
              </button>
              <button
                className="add-exercise-button"
                onClick={() => selectWorkoutPlan(workout.id)}
              >
                <FaPlus /> Exercise
              </button>
            </div>
          </div>
        ))}
      </div>
      {showWorkoutPlanPopup && (
        <div className="workout-plan-details-popup">
          <div className="popup-content">
            <button className="close-button" onClick={closeWorkoutPlanPopup}>
              X
            </button>
            <h2>Workout Plan Details</h2>
            <div className="exercise-cards">
              {selectedWorkoutPlanExercises.map((exercise) => (
                <div className="exercise-card" key={exercise.id}>
                  <img src={exercise.image} alt={exercise.exercise_name} />
                  <h3>{exercise.exercise_name}</h3>
                  <p>Exercise Type: {exercise.exercise_type}</p>
                  <p>Body Part: {exercise.body_part}</p>
                  <p>Sets: {exercise.sets}</p>
                  <p>Reps: {exercise.reps}</p>
                  <p>Duration: {exercise.duration} seconds</p>
                  <p>Calories Burned: {exercise.calories_burned}</p>
                  <button className="delete-workout-button" onClick={() => handleRemoveExercise(exercise.id)}>
                    Remove Exercise
                  </button>
                </div>
              ))}
            </div>
            <div className="workout-buttons">
            <button
              className="delete-workout-button"
              onClick={() => handleDeleteWorkout(selectedWorkoutPlan.id)}
            >
              <FaTrashAlt /> Delete Workout
            </button>
            </div>
          </div>
        </div>
      )}
{showAddExercisePopup && (
        <div className="add-exercise-popup">
          <div className="Exercises-content">
            <div className="ExercisePopup-close-btn">
              <button onClick={handleClosePopup}>X</button>
            </div>
            <h2>Exercises</h2>
            <div className="Search-bar">
              <input
                type="text"
                placeholder="Search by name or workout type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="Exercise-cards">
              {filteredExercises.map((exercise) => (
                <div className="Exercise-card" key={exercise.id}>
                  <button onClick={() => handleAddExercise(exercise.id)}>
                    Add
                  </button>
                  <img src={exercise.image} alt={exercise.exercise_name} />
                  <h3>{exercise.exercise_name}</h3>
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
          <button
            className="add-exercise-button"
            onClick={closeAddExercisePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
export default WorkoutList;