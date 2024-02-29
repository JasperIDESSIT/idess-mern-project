import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container">
            <div className='row'>
                <header className='mt-2'>
                    <div className='card p-5 bg-success bg-gradient text-white bg-opacity-75'>
                        <h1 className='fw-bold text-white'>Archived Tasks</h1>
                    </div>
                </header>
                <div className='d-flex justify-content-center'>
                    <div className="col-md-6 mb-2">
                        
                            <div>
                                {tasks && tasks.map((task) => (
                                    <ArchiveDetails key={task._id} task={task}/>
                                ))}
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Archive