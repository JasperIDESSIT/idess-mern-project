import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskDetails = ({ task }) => {
    const [archived, setArchived] = useState(false);
    // const [showModal, setShowModal] = useState(false); // New state for modal visibility

    const handleArchive = async () => {
        try {
            const response = await fetch(`/api/tasks/archive/${task._id}`, {
                method: 'PATCH'
            });
            const json = await response.json();
            console.log(json);
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
                });
            }
        });
    };

    if (archived) {
        return null;
    }

    return (
        <div className="card mb-2 shadow-sm bg-success bg-gradient text-dark bg-opacity-10">
            <div className='card-body'>
                <h4 className='card-title ml-2 fw-bold'>{task.title}</h4>
                <strong>Day/s: </strong>
                <p className='card-text text-capitalize' style={{ display: 'inline-block', margin: '0', whiteSpace: 'nowrap' }}>
                    {task.tags.map((tag, index) => (
                        <React.Fragment key={index}>
                            {tag.value}
                            {index !== task.tags.length - 1 && ', '}
                        </React.Fragment>
                    ))}
                </p>
                <p className='card-text mt-2'><strong>Content: </strong>{task.content}</p>
                <div className='d-flex justify-content-start'>
                    <Link to={`/api/tasks/view/${task._id}`}>
                        <button className='btn btn-sm btn-secondary me-2'>Edit</button>
                    </Link>
                    {/* Button trigger modal */}
                    {/* <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Edit Modal
                    </button> */}
                    {/* Modal */}
                    {/* <div className="modal" tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Task</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                   
                                    <p>Modal body text goes here.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <button className='btn btn-sm btn-danger' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
