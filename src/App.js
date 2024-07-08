import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/navigation/SideBar/SideBar';
import CaloriesForm from './components/Pages/CalorieCount/CaloriesForm/CaloriesForm';
import LandingPage from './components/Pages/Landingpage/LandingPage';
import MyProfile from './components/Pages/MyProfile/MyProfile';
import Exercises from './components/Pages/Exercises/Exercises';
import Logout from './components/auth/Logout';
import Login from './components/auth/Login/Login';
import DashBoard from './components/Pages/Home/DashBoard/DashBoard';
import './App.css';
import WeightChanges from './components/Pages/Weight/WeightChanges/WeightChanges';
import SignUp from './components/auth/SignUpForm/SignUpForm';
import WorkoutPlan from './components/Pages/Workout/WorkoutPlan/WorkoutPlan';

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
