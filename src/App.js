import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import CaloriesForm from './components/CaloriesForm';
import LandingPage from './components/LandingPage';
import MyProfile from './components/MyProfile';
import Exercises from './components/Exercises';
import Logout from './components/Logout';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import './App.css';
import WeightChanges from './components/WeightChanges';
import SignUp from './components/SignUpForm';
import WorkoutPlan from './components/WorkoutPlan';

const ProtectedRoute = ({ children }) => {
  const excludedRoutes = [
    '/',
    '/home',
    '/login',
    '/signup',
    '/logout'
  ];

  const isExcludedRoute = excludedRoutes.includes(window.location.pathname);

  return (
    <>
      {!isExcludedRoute && (
        <div className="sidebar">
          <SideBar />
        </div>
      )}
      <Routes>{children}</Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Wrap all the routes in the ProtectedRoute component */}
        <ProtectedRoute>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard/*" element={<DashBoard />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/weight" element={<WeightChanges />} />
          <Route path="/calorie-intake" element={<CaloriesForm />} />
          <Route path="/workout-plan" element={<WorkoutPlan />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </ProtectedRoute>
      </div>
    </Router>
  );
};

export default App;
