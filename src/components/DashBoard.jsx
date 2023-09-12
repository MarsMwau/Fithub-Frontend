import React from 'react';
import Icons from './Icons';
import WeightTrackings from './WeightTrackings';
import CalorieIntakeChart from './CalorieIntakeChart';
import FitnessGoal from './FitnessGoal';
import './DashBoard.css';
const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Hey you!</p>
        <div className="dashboard-columns">
          <div className="dashboard-left">
            <div className="icons">
              <Icons />
            </div>
            <div className="fitness-goal">
              <FitnessGoal />
            </div>
          </div>
          <div className="dashboard-right">
            <div className="weight-trackings">
              <WeightTrackings />
            </div>
            <div className="calorie-intake-chart">
              <CalorieIntakeChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;