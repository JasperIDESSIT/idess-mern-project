import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

const Home = () => {
    const [tasks, setTasks] = useState(null)

    // fetch all Active tasks
    useEffect(() => {
        const fetchActiveTasks = async () => {
            const response = await fetch('/api/tasks/active/')
            const json = await response.json()

            if (response.ok) {
                setTasks(json)
            }
        }

        fetchActiveTasks()
    }, []) 

    return(
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
                        <TaskForm />
                    </div>
                </div>
               
            </div>
        </div>
    )
}

export default Home