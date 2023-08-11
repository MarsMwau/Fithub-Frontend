import React, { useState, useEffect } from 'react';
import './CalorieIntakeTable.css';
const CalorieIntakeTable = () => {
    const [calorieIntakes, setCalorieIntakes] = useState([]);
    const fetchCalorieIntakes = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        const userId = decodedToken.user_id;
        const response = await fetch(`http://127.0.0.1:3000/users/${userId}/calorie_intakes`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch calorie intakes.');
        }
        const data = await response.json();
        setCalorieIntakes(data);
      } catch (error) {
        console.error('Error fetching calorie intakes:', error);
      }
    };
    useEffect(() => {
      fetchCalorieIntakes(); // Fetch data when the component mounts
      // Set up a timer to fetch data every 10 seconds (adjust the interval as needed)
      const intervalId = setInterval(() => {
        fetchCalorieIntakes();
      }, 10000);
      // Clean up the interval when the component is unmounted
      return () => {
        clearInterval(intervalId);
      };
    }, []);
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
  return (
    <div className="CalorieIntakeTable">
            <h3>My Calorie Intake Table</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Calories</th>
                    </tr>
                </thead>
                <tbody>
                    {calorieIntakes.map((intake) => (
                        <tr key={intake.id}>
                            <td>{intake.date}</td>
                            <td>{intake.calories}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};
export default CalorieIntakeTable;