import { useEffect, useState } from 'react'

// components
import ArchiveDetails from '../components/ArchiveDetails'

const Archive = () => {
    const [tasks, setTasks] = useState(null)

    // fetch all Archived tasks
    useEffect(() => {
        const fetchArchiveTasks = async () => {
            const response = await fetch('/api/tasks/archive/')
            const json = await response.json()

            if (response.ok) {
                setTasks(json)
                
            }
        }

        fetchArchiveTasks()
    }, []) 

    return(
        <div className="Home">
            <div className="tasks">
                {tasks && tasks.map((task) => (
                    <ArchiveDetails key={task._id} task={task}/>
                ))}
            </div>
        </div>
    )
}

export default Archive