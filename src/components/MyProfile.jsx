import React, { useEffect, useState } from 'react';
import './MyProfile.css';
import { FaEnvelope, FaUserAlt, FaRuler, FaWeight, FaGenderless, FaBirthdayCake } from 'react-icons/fa';
import WeightTrackings from './WeightTrackings'
import CalorieIntakeChart from './CalorieIntakeChart';
import CalorieIntakeTable from './CalorieIntakeTable';
const MyProfile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
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
    fetchUser();
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
  if (!user) {
    return <div>Loading...</div>;
  }
  const avatarUrl = 'https://image.pngaaa.com/432/5306432-middle.png';
  return (
    <div className="user-profile">
    <div className="my-profile">
  <div className="my-info">
    <div className="profile-container">
      <div className="my-avatar-container">
        <img src={avatarUrl} alt="avatar" className="my-avatar" />
      </div>
      <div className="user-details">
        <h2>Username: {user.username}</h2>
        <div className="details-row">
          <FaEnvelope className="d-icon" />
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
    <div className="user-detail">
      <div className="details-row">
        <FaBirthdayCake className="d-icon" />
        <p>Age: {user.age}</p>
      </div>
      <div className="details-row">
        <FaGenderless className="d-icon" />
        <p>Gender: {user.gender}</p>
      </div>
      <div className="details-row">
        <FaRuler className="d-icon" />
        <p>Height: {user.height}cm</p>
      </div>
      <div className="details-row">
        <FaWeight className="d-icon" />
        <p>Initial Weight: {user.initial_weight}kg</p>
      </div>
      <div className="details-row">
        <FaWeight className="d-icon" />
        <p>Target Weight: {user.target_weight}kg</p>
      </div>
    </div>
  </div>
</div>
<h3>My Fitness Journey</h3>
<div className="data-section">
    <div className="data-container">
      <WeightTrackings />
    </div>
    <div className="data-container">
      <CalorieIntakeChart />
    </div>
  </div>
  <div className="calorie-table">
    <CalorieIntakeTable />
  </div>
</div>
  );
};
export default MyProfile;