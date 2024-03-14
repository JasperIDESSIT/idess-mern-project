import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UpdateDetails from '../components/UpdateDetails';

const Update = () => {
    const [task, setTask] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchArchiveTask = async () => {
            try {
                const response = await fetch(`/api/tasks/view/${id}`);
                const json = await response.json();

                if (response.ok) {
                    setTask(json);
                } else {
                    console.error('Failed to fetch task:', json.error);
                }
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchArchiveTask();
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-center">
                    <div className="col-md-4">
                        
                        {task && <UpdateDetails key={task._id} task={task} />}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
