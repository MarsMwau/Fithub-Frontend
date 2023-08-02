import React, {useState, useEffect} from 'react'

function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
          try {
            const token = localStorage.getItem("token");
            const decodedToken = decodeToken(token);
            const userId = decodedToken.user_id;
            const response = await fetch(`http://localhost:3000/users/${userId}/workout_plans`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
              setWorkouts(data);
            } else {
              console.error('Invalid response: Workout data is not an array');
            }
          }
          catch (error) {
            console.error('Error fetching workouts:', error);
          }
        };
    
        fetchWorkouts();
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


  return (
    <div>
      <h1>Your Workout Plans</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <h2>{workout.date}</h2>
            <h3>Exercises:</h3>
            <ul>
              {workout.exercises.map((exercise) => (
                <li key={exercise.id}>{exercise.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutList