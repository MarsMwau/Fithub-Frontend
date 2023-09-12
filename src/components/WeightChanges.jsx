import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './WeightChanges.css';
const WeightChanges = () => {
  const [user, setUser] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(`http://127.0.0.1:3000/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  const handleChangeWeight = (event) => {
    setCurrentWeight(event.target.value);
  };
  const handleSubmitWeight = async () => {
    const currentWeightNum = parseFloat(currentWeight);
    if (isNaN(currentWeightNum)) {
      setMessage('Please enter a valid weight.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const currentDate = moment().format('YYYY-MM-DD'); // Get the current date in the desired format
      const response = await fetch(`http://127.0.0.1:3000/users/${userId}/weight_trackings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight: currentWeightNum, date: currentDate }), // Include the current date in the request body
      });
      if (response.ok) {
        // The weight was successfully saved to the backend
        setCurrentWeight(''); // Clear the input field after submission
        fetchUserData();
        setMessage('Weight saved successfully!');
        calculateWeightChange(); // Update the message after successful submission
      } else {
        // There was an error saving the weight to the backend
        setMessage('Failed to save weight. Please try again.');
      }
    } catch (error) {
      console.error('Error saving weight:', error);
    }
  };
  const calculateWeightChange = () => {
    const initialWeight = user.initial_weight;
    const targetWeight = user.target_weight;
    if (currentWeight === '') {
      setMessage('');
    } else {
      const currentWeightNum = parseFloat(currentWeight);
      if (!isNaN(currentWeightNum)) {
        const weightDifference = initialWeight - currentWeightNum;
        const kilosToGo = targetWeight - currentWeightNum;
        if (targetWeight > initialWeight) {
          // User's goal is to gain weight
          if (weightDifference > 0) {
            setMessage(`Ooops! You lost ${weightDifference.toFixed(2)} kg! You need to add ${kilosToGo.toFixed(2)} kg.`);
          } else if (weightDifference < 0) {
            setMessage(`Congratulations! You added ${Math.abs(weightDifference).toFixed(2)} kg! ${Math.abs(kilosToGo).toFixed(2)} kilos to go!`);
          } else {
            setMessage(`Keep it up! You reached your target weight of ${targetWeight.toFixed(2)} kg!`);
          }
        } else {
          // User's goal is to lose weight
          if (weightDifference > 0) {
            setMessage(`Congratulations! You lost ${weightDifference.toFixed(2)} kg! ${kilosToGo.toFixed(2)} more kilos to go!`);
          } else if (weightDifference < 0) {
            setMessage(`Ooops! You added ${Math.abs(weightDifference).toFixed(2)} kg! ${Math.abs(kilosToGo).toFixed(2)} kilos to go!`);
          } else {
            // User reached their target weight
            setMessage(`Congratulations! You reached your target weight of ${targetWeight.toFixed(2)} kg!`);
          }
        }
      }
    }
  };
  useEffect(() => {
    if (user) {
      calculateWeightChange();
    }
  }, [user, currentWeight]);
  return (
    <div className="weight-changes-container">
      <h2>Weight Changes</h2>
      <p>Enter your current weight:</p>
      <input type="number" value={currentWeight} onChange={handleChangeWeight} />
      <button onClick={handleSubmitWeight}>Submit</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
};
export default WeightChanges;