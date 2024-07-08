import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUtensils,faWeightScale,faListUl, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FaTh, FaBars, FaUserAlt} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './SideBar.css';

const SideBar = ({ children }) => {
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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

  const menuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: '/exercises',
      name: 'Exercises',
      icon: <FontAwesomeIcon icon={faDumbbell} />,
    },
    {
        path: '/calorie-intake',
        name: 'Calories',
        icon: <FontAwesomeIcon icon={faUtensils} />,
    },
    {
        path: '/weight',
        name: 'Weight',
        icon: <FontAwesomeIcon icon={faWeightScale} />,
    },
    {
      path: '/workout-plan',
      name: 'Workout Plans',
      icon: <FontAwesomeIcon icon={faListUl} />,
    },
    {
      path: '/my-profile',
      name: 'My Profile',
      icon: <FaUserAlt />,
    },
    {
      name: 'Logout',
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      onClick: handleLogout,
    },
  ];
  
  return (
    <div className="container">
      <div style={{ width: isOpen ? '230px' : '80px'  }} className="sidebar">
        <div className="top_section">
  <div className="logo">
    <img
      style={{ display: isOpen ? 'block' : 'none'}}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl1RYLYKC9wt9okF4uRLMlWxHDhQkqt8XlMw&usqp=CAU"
      alt="Logo"
      width="50"
      height="50"
    />
    <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
      FITHUB
    </h1>
  </div>
  <div style={{ marginLeft: isOpen ? '80px' : '2px' }} className="bars">
    <FaBars onClick={toggle} />
  </div>
</div>
        <div className="menu">
          {menuItem.map((item, index) =>
            item.path ? (
              <NavLink
                to={item.path}
                key={index}
                className={selected === index ? 'menuItem active' : 'menuItem'}
                onClick={() => setSelected(index)}
              >
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </NavLink>
            ) : (
              <button key={index} className="menuItem" onClick={item.onClick}>
                <div className="icon">{item.icon}</div>
                <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
                  {item.name}
                </div>
              </button>
            )
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
export default SideBar;