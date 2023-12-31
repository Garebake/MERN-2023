import { useEffect, useState } from 'react';
import WorkoutDetails from '../Components/WorkoutDetails';

const Home = () => {
    const [ workouts, setWorkouts ] = useState(null);

    //Fires once when component is rendered
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        }

        fetchWorkouts();
    }, []);

    return (
        <div className="home"> 
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
    )
}

export default Home;