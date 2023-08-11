import React, { useState } from 'react';
import "./UserForm.css";
const UserForm = ({ user, onUpdate, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState({
    age: user.age,
    email: user.email,
    username: user.username,
    height: user.height,
    gender: user.gender,
    initial_weight: user.initial_weight,
    target_weight: user.target_weight,
  });
  const handleInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: updatedUser }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user profile.');
      }
  
      const updatedUserData = await response.json();
      const updatedUser = updatedUserData.user;
      onUpdate(updatedUser);
      console.log(updatedUserData.message);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };  
  return (
    <form className="user-form" onSubmit={handleFormSubmit}>
      <label className="form-label">Age:</label>
      <textarea
        className="form-input"
        name="age"
        value={updatedUser.age}
        onChange={handleInputChange}
      ></textarea>
      <label className="form-label">Email:</label>
      <input
        className="form-input"
        type="email"
        name="email"
        value={updatedUser.email}
        onChange={handleInputChange}
      />
      <label className="form-label">Username:</label>
      <input
        className="form-input"
        type="text"
        name="username"
        value={updatedUser.username}
        onChange={handleInputChange}
      />
      <label className="form-label">Height:</label>
      <input
        className="form-input"
        type="text"
        name="height"
        value={updatedUser.height}
        onChange={handleInputChange}
        />
        <label className="form-label">Gender:</label>
      <input
        className="form-input"
        type="text"
        name="gender"
        value={updatedUser.gender}
        onChange={handleInputChange}
        />
        <label className="form-label">Initial_weight:</label>
      <input
        className="form-input"
        type="text"
        name="initial_weight"
        value={updatedUser.initial_weight}
        onChange={handleInputChange}
        />
        <label className="form-label">Target_weight:</label>
      <input
        className="form-input"
        type="text"
        name="target_weight"
        value={updatedUser.target_weight}
        onChange={handleInputChange}
        />
      <div className="form-buttons">
        <button className="form-button" type="submit">Save</button>
        <button className="form-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default UserForm;