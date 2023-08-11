import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFire, faChartLine, faDumbbell, faClock } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import './MyProfile.css';
import './Icons.css';
const Icons = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(null)
  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.user_id;
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
  };
  const calculateTotalCaloriesBurned = () => {
    if (!user || !user.workout_plans) return 0;
    return user.workout_plans.reduce((total, workoutPlan) => {
      const totalCaloriesBurned = workoutPlan.exercises.reduce((sum, exercise) => {
        return exercise.status ? sum + exercise.calories_burned : sum;
      }, 0);
      return total + totalCaloriesBurned;
    }, 0);
  };
  const calculateWeightChanges = () => {
    if (!user || !user.weight_trackings) return null;
    const latestWeightTrackings = user.weight_trackings
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 2);
    if (latestWeightTrackings.length < 2) return null;
    const latestWeight = latestWeightTrackings[0].weight;
    const secondLatestWeight = latestWeightTrackings[1].weight;
    const weightDifference = latestWeight - secondLatestWeight;
    return weightDifference > 0 ? `-${weightDifference.toFixed(0)} kg` : `+${Math.abs(weightDifference).toFixed(0)}kg`;
  };
  const calculateTotalWorkoutsCompleted = () => {
    if (!user || !user.workout_plans) return 0;
    return user.workout_plans.filter((workoutPlan) => {
      return workoutPlan.exercises.every((exercise) => exercise.status);
    }).length;
  };
  const calculateTotalCaloriesTaken = () => {
    if (!user || !user.calorie_intakes) return 0;
    const today = new Date().toISOString().slice(0, 10);
    const caloriesTakenToday = user.calorie_intakes.reduce((sum, intake) => {
      if (intake.date === today) {
        return sum + intake.calories;
      }
      return sum;
    }, 0);
    return caloriesTakenToday;
  };
  return (
    <div className="my-icons">
    <Card className="stat-card" style={{ background: '#FDE6FA' }}>
      <CardContent>
        <FontAwesomeIcon icon={faFire} size="3x" className="stat-icon" />
        <CardHeader title="Calories Burned" />
        <h2 className="stat-value">{calculateTotalCaloriesBurned()}kcal</h2>
      </CardContent>
    </Card>
    <Card className="stat-card" style={{ background: '#DCF4FC' }}>
      <CardContent>
        <FontAwesomeIcon icon={faChartLine} size="3x" className="stat-icon" />
        <CardHeader title="Weight Changes" />
        <h2 className="stat-value">{calculateWeightChanges()}</h2>
      </CardContent>
    </Card>
    <Card className="stat-card" style={{ background: '#DADAF7' }}>
      <CardContent>
        <FontAwesomeIcon icon={faDumbbell} size="3x" className="stat-icon" />
        <CardHeader title="Workouts Completed" />
        <h2 className="stat-value">{calculateTotalWorkoutsCompleted()}</h2>
      </CardContent>
    </Card>
    <Card className="stat-card" style={{ background: '#E6F8ED' }}>
      <CardContent>
        <FontAwesomeIcon icon={faClock} size="3x" className="stat-icon" />
        <CardHeader title="Calorie Taken" />
        <h2 className="stat-value">{calculateTotalCaloriesTaken()}kcal</h2>
      </CardContent>
    </Card>
  </div>
);
};
export default Icons;