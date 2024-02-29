import { useEffect, useState } from 'react'

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
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskDetails key={task._id} task={task}/>
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home