import React, { useState } from 'react';
import CalorieIntakeTable from './CalorieIntakeTable'
import './CaloriesForm.css'
const CaloriesForm = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      // Replace YOUR_API_KEY with your actual API key for the CalorieNinjas API
      const apiKey = 'HeLUbBGkPNN3mx90ykjIGA==EDITX0LqcYUVZYwQ';
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch search results.');
      }
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };
  const handleAddCalorieIntake = async (food) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(`http://127.0.0.1:3000/users/${userId}/calorie_intakes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          calorie_intake: {
            calories: food.calories,
            date: new Date().toISOString().split('T')[0],
          },
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add calorie intake.');
      }
      const data = await response.json();
      console.log('Calorie intake added:', data);
    } catch (error) {
      console.error('Error adding calorie intake:', error);
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
  return (
    <div className="container">
    <div className='Calories-Form'>
      <h2>What have you eaten today?</h2>
      <div className='search'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for any meal that you have taken today to get the amount of calories in it.."
      />
      <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
      {/* <h3>Search Results:</h3> */}
      <ul>
        {searchResults.map((food) => (
          <li key={food.name}>
            {food.name} - {food.calories} calories
            <button onClick={() => handleAddCalorieIntake(food)}>Add</button>
          </li>
        ))}
      </ul>
      </div>
      <CalorieIntakeTable />
    </div>
    </div>
  );
};
export default CaloriesForm;