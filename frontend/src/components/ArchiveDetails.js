import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert

const ArchiveDetails = ({ task }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [activate, setActiveTask] = useState(false);

    const setActive = async () => {
        try {
            const response = await fetch(`/api/tasks/active/${task._id}`, {
                method: 'PATCH'
            });
            const json = await response.json();

            Swal.fire({
                icon: 'success',
                title: 'Task Activated!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });

            setActiveTask(true);
        } catch (error) {
            console.error('Error activating task:', error);
        }
    };

    if (activate) {
        return null;
    }

    return (
        <div className="card mt-2 shadow-sm bg-danger bg-gradient p-2 text-dark bg-opacity-10">
            <div className='card-body'>
                <p className='card-subtitle text-muted'>{formattedDate}</p>

                <h4 className='card-title ml-2 fw-bold'>{task.title}</h4>

                <p className='card-text' style={{ display: 'inline-block', margin: '0', whiteSpace: 'nowrap' }}>
                    <strong>Days: </strong>
                    {task.tags.map((tag, index) => (
                        <React.Fragment key={index}>
                            {tag}
                            {index !== task.tags.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </p>

                <p className='card-text mt-2'><strong>Content: </strong>{task.content}</p>

                <button className='btn btn-sm btn-success' onClick={setActive}>Activate</button>
                <button className='btn btn-sm btn-danger'>DELETE</button>
                {/* <div className='d-flex justify-content-start'>
                    <Link to={`/api/tasks/view/${task._id}`}>
                        <button className='btn btn-sm btn-secondary me-2'>Edit</button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default ArchiveDetails;