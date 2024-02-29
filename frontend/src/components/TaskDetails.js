import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TaskDetails = ({ task }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [archived, setArchived] = useState(false);

    const handleArchive = async () => {
        try {
            const response = await fetch(`/api/tasks/archive/${task._id}`, {
                method: 'PATCH'
            });
            const json = await response.json();

            setArchived(true);
        } catch (error) {
            console.error('Error archiving task:', error);
        }
    };

    if (archived) {
        return null;
    }

    return (
        <div className="task-details">
            <p>{formattedDate}</p>
            <h4>{task.title}</h4>

            <p style={{ display: 'inline-block', margin: '0', whiteSpace: 'nowrap' }}>
                <strong>Days: </strong>
                {task.tags.map((tag, index) => (
                    <React.Fragment key={index}>
                        {tag}
                        {index !== task.tags.length - 1 && ', '}
                    </React.Fragment>
                ))}
            </p>

            <p><strong>Content: </strong>{task.content}</p>

            <Link to={`/api/tasks/view/${task._id}`}>
                <button className='link-button'>Edit</button>
            </Link>

            <span className='no-background'>
                <button className='delete-button' onClick={handleArchive}>Delete</button>
            </span>
        </div>
    );
};

export default TaskDetails;
