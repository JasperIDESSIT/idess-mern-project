import React from 'react';
import { Link } from 'react-router-dom';

const TaskDetails = ({ task }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleArchive = async () => {
        try {
            const response = await fetch(`/api/tasks/archive/${task._id}`, {
                method: 'PATCH'
            });
            const json = await response.json();
            // Handle response as needed
        } catch (error) {
            console.error('Error archiving task:', error);
        }
    };

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p><strong>Days: </strong>{task.tags.join(', ')}</p>
            <p><strong>Content: </strong>{task.content}</p>
            <p>{formattedDate}</p>

            {/* Updated Link with task._id as a parameter */}
            <Link to={`/api/tasks/view/${task._id}`}>
                <button className='link-button'>Edit</button>
            </Link>

            <span className='no-background' onClick={handleArchive}>
                <button className='delete-button' onClick={handleArchive}>Delete</button>
            </span>
        </div>
    );
};

export default TaskDetails;
