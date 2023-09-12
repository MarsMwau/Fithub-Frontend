import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout () {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(true);
  
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem('token');
        await fetch('http://127.0.0.1:3000/logout', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/home');
        window.alert('Logged out successfully!');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
  
    return (
        <div className="Logout">

        </div>

    )
}

export default Logout;