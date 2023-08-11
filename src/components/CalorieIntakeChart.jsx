import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import moment from 'moment';
import './CalorieIntakeChart.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalorieIntakeChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(moment());
  const [selectedInstances, setSelectedInstances] = useState([]);

  useEffect(() => {
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
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching calorie intakes:', error);
      }
    };

    fetchCalorieIntakes();
  }, [startDate, endDate]);

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

  // Helper function to calculate the total calories for each day
  const calculateTotalCaloriesByDay = () => {
    const totalCaloriesByDay = {};
    data.forEach((entry) => {
      const date = moment(entry.date).format('YYYY-MM-DD');
      if (totalCaloriesByDay[date]) {
        totalCaloriesByDay[date] += entry.calories;
      } else {
        totalCaloriesByDay[date] = entry.calories;
      }
    });
    return totalCaloriesByDay;
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white', // Set the x-axis label color to orange
          font: {
            size: 16, // Set the x-axis label font size to 16px
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'white', // Set the color of the y-axis ticks to orange
          font: {
            size: 16, // Adjust the font size of the y-axis ticks
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const getChartData = () => {
    const totalCaloriesByDay = calculateTotalCaloriesByDay();
    const orangeColor = '#ca4203';
    const purpleColor = 'rgba(128, 0, 128, 0.5)';
    const chartData = {
      labels: Object.keys(totalCaloriesByDay).map((date) => moment(date).format('MMM D')),
      datasets: [
        {
          label: 'Calories',
          data: Object.values(totalCaloriesByDay),
          backgroundColor: Object.values(totalCaloriesByDay).map((calories) =>
            calories > 0 ? orangeColor : purpleColor
          ),
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      ],
    };
    return chartData;
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous chart instance
    }
  
    if (data.length > 0) {
      const chartData = getChartData();
      chartRef.current = new Chart(document.getElementById('calorieIntakesChart'), {
        type: 'bar',
        data: chartData,
        options: {
          ...chartOptions,
          onClick: handleChartClick, // Add click event handler
        },
      });
    }
  
    // Clean up the chart instance when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, chartOptions]);
  
  const handleChartClick = (event) => {
    const activeBars = chartRef.current.getElementsAtEventForMode(event, 'index', {
      intersect: true,
    });

    if (activeBars && activeBars.length > 0) {
      const dataIndex = activeBars[0].index;
      const clickedDate = moment(data[dataIndex].date).format('YYYY-MM-DD');
      const instancesOfDay = data.filter((entry) => moment(entry.date).format('YYYY-MM-DD') === clickedDate);

      // Set the selected instances to the state
      setSelectedInstances(instancesOfDay);
    }
  };

  const handlePrevious = () => {
    setEndDate(startDate);
    setStartDate(moment(startDate).subtract(1, 'month'));
  };

  const handleNext = () => {
    setStartDate(endDate);
    setEndDate(moment(endDate).add(1, 'month'));
  };

  return (
    <div className="calorie-intake-chart">
    <h2>Calorie Intakes</h2>
    <div className="chart-buttons">
    <FaChevronLeft onClick={handlePrevious} className="nav-icon" />
          <FaChevronRight onClick={handleNext} className="nav-icon" />
    </div>
    <div className="chart-container">
      <canvas id="calorieIntakesChart"></canvas>
    </div>

    {selectedInstances.length > 0 && (
      <div>
        <ul>
          {selectedInstances.map((instance) => (
            <li key={instance.id}>
              Date: {moment(instance.date).format('MMM D')} | Calories: {instance.calories}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
};

export default CalorieIntakeChart;
