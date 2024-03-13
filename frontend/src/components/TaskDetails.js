import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskDetails = ({ task }) => {
    // const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
    //     timeZone: 'Asia/Manila',
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    // });

    const [archived, setArchived] = useState(false);

    const handleArchive = async () => {
        try {
            const response = await fetch(`/api/tasks/archive/${task._id}`, {
                method: 'PATCH'
            });
            const json = await response.json();
            console.log(json)
            setArchived(true);
        } catch (error) {
            console.error('Error archiving task:', error);
        }
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This task will be moved to Archives',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                handleArchive();
                Swal.fire({
                    title: 'Archived!',
                    text: 'Task Archived',
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });            }
        });
    };

    if (archived) {
        return null;
    }

    return (
        <div className="card mb-2 shadow-sm bg-success bg-gradient text-dark bg-opacity-10">
            <div className='card-body'>
                {/* <p className='card-subtitle text-muted'>{formattedDate}</p> */}

                <h4 className='card-title ml-2 fw-bold'>{task.title}</h4>

                <strong>Day/s: </strong>
                <p className='card-text text-capitalize' style={{ display: 'inline-block', margin: '0', whiteSpace: 'nowrap' }}>
    
                    {task.tags.map((tag, index) => (
                        <React.Fragment key={index}>
                            {tag}
                            {index !== task.tags.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </p>

                <p className='card-text mt-2'><strong>Content: </strong>{task.content}</p>

                <div className='d-flex justify-content-start'>
                    <Link to={`/api/tasks/view/${task._id}`}>
                        <button className='btn btn-sm btn-secondary me-2'>Edit</button>
                    </Link>
                    <button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
