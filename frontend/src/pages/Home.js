import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from '../components/TaskForm';
import TaskDetails from '../components/TaskDetails';

const Home = () => {
    const [tasks, setTasks] = useState(null);

    const fetchActiveTasks = async () => {
        try {
            const response = await fetch('/api/tasks/active/');
            if (response.ok) {
                const json = await response.json();
                setTasks(json);
            } else {
                console.error('Failed to fetch active tasks');
            }
        } catch (error) {
            console.error('Error fetching active tasks:', error);
        }
    };

    useEffect(() => {
        fetchActiveTasks();
    }, []);

    return (
        <div className="container">
            <header className='mt-2'>
                <div className='card p-5 bg-success bg-gradient text-white bg-opacity-75'>
                    <h1 className='fw-bold text-white'>Active Tasks</h1>
                </div>
            </header>

            <div className="row">
                <div className="col-md-8 mt-2">
                    {tasks && tasks.map((task) => (
                        <TaskDetails key={task._id} task={task}/>
                    ))}
                </div>
                <div className="col-md-4"> 
                    <div className='sticky-top pt-1'>
                        <TaskForm fetchActiveTasks={fetchActiveTasks} /> {/* Pass fetchActiveTasks function as a prop */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
