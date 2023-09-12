import React, { useState, useEffect, useRef } from 'react';
import 'chart.js';
import 'chart.js/auto';
import moment from 'moment';
import './WeightTrackings.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const WeightTrackings = () => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null); // Maintain a reference to the chart instance
    const [user, setUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

  const fetchWeightTrackings = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      const response = await fetch(`http://127.0.0.1:3000/users/${userId}/weight_trackings`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching weight trackings:', error);
    }
  };

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

  useEffect(() => {
    fetchWeightTrackings();
    fetchUserData();
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

  const generateInitialData = () => {
    if (user) {
      const initialWeight = user.initial_weight;
      const accountCreatedDate = moment(user.created_at).startOf('month');
      const currentDate = moment().startOf('month');

      const generatedData = [];
      while (currentDate.isSameOrAfter(accountCreatedDate, 'month')) {
        generatedData.unshift({
          date: currentDate.format('YYYY-MM-DD'),
          weight: initialWeight,
        });
        currentDate.subtract(1, 'month');
      }

      return generatedData;
    }
    return [];
  };

  useEffect(() => {
    setData((prevData) => {
      const initialData = generateInitialData();
      return [...initialData, ...prevData];
    });
  }, [user]);

  const chartData = {
    labels: data.map((entry) => moment(entry.date).format('MMM D')),
    datasets: [
      {
        label: 'Weight',
        data: data.map((entry) => entry.weight),
        fill: true,
        borderColor: 'orange',
        borderWidth: 3, // Set the borderWidth to 3 to remove lines
        pointStyle: 'circle', // Use circle as the point style
        pointRadius: 5, // Set the point radius to make it more visible
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, // Hide the x-axis grid lines
        },
        ticks: {
          display: true, // Show the x-axis ticks
          color: 'white', // Set the color of the x-axis ticks to purple
          font: {
            size: 16, // Adjust the font size of the x-axis ticks
          },
        },
      },
      y: {
        grid: {
          display: false, // Show the y-axis grid lines
          color: 'red', // Set the color of the y-axis grid lines to orange
        },
        ticks: {
          display: true, // Show the y-axis ticks
          color: 'white', // Set the color of the y-axis ticks to orange
          font: {
            size: 16, // Adjust the font size of the y-axis ticks
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    elements: {
      line: {
        borderColor: 'rgba(128, 0, 128, 0.8)', // Set the border color for the line (purple)
        borderWidth: 3, // Set the border width
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          // Create a gradient for the line chart (purple to orange)
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.top,
            chartArea.right,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(128, 0, 128, 0.8)'); // Start color (purple)
          gradient.addColorStop(1, 'rgba(255, 165, 0, 0.8)'); // End color (orange)
          return gradient;
        },
        tension: 0.2,
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous chart instance
    }

    chartRef.current = new Chart(document.getElementById('weightChart'), {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  }, [chartData]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };



  return (
    <div className="weight-chart-container">
      <h2>Weight Trackings</h2>
      <div className="chart-navigation">
          <FaChevronLeft onClick={handlePrevious} className="nav-icon" />
          <FaChevronRight onClick={handleNext} className="nav-icon" />
        </div>
      <div className="chart-wrapper">
        <canvas id="weightChart"></canvas>
      </div>
    </div>
  );
};

export default WeightTrackings;