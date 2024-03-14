import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const ArchiveDetails = ({ task }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        // second: 'numeric'
    });

    const [activate, setActiveTask] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const setActive = async () => {
        try {
            const response = await fetch(`/api/tasks/active/${task._id}`, {
                method: 'PATCH'
            });
            const json = await response.json();
            console.log(json)

            Swal.fire({
                icon: 'success',
                title: 'Task Activated!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
            });

            setActiveTask(true);
        } catch (error) {
            console.error('Error activating task:', error);
        }
    };

    if (activate) {
        return null;
    }

    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/tasks/delete/${task._id}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        setDeleted(true);
                        Swal.fire({
                            icon: 'success',
                            title: 'Task Deleted!',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                    } else {
                        throw new Error('Failed to delete task');
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Action canceled, do nothing
            }
        });
    };
    

    if (deleted) {
        return null;
    }

    return (
        <div className="card mt-2 shadow-sm bg-danger bg-gradient p-2 text-dark bg-opacity-10">
            <div className='card-body'>
                <p className='card-subtitle text-muted'>{formattedDate}</p>

                <h4 className='card-title ml-2 fw-bold'>{task.title}</h4>

                <p className='card-text text-capitalize' style={{ display: 'inline-block', margin: '0', whiteSpace: 'nowrap' }}>
                    {task.tags.map((tag, index) => (
                        <React.Fragment key={index}>
                            {tag.value}
                            {index !== task.tags.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </p>

                <p className='card-text mt-2'><strong>Content: </strong>{task.content}</p>

                <button className='btn btn-sm btn-success' onClick={setActive}>Activate</button>
                <button className='ms-3 btn btn-sm btn-danger' onClick={handleDelete}>DELETE</button>
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