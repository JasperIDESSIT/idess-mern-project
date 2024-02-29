import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const UpdateDetails = ({ task, onUpdate }) => {
    const [title, setTitle] = useState(task.title || '');
    const [content, setContent] = useState(task.content || '');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        const updatedTask = { ...task, title, content };
    
        try {
            const response = await fetch(`/api/tasks/update/${task._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedTask),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                console.log('Task updated successfully!');
                console.log(updatedTask);

            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleSave = () => {
        Swal.fire({
            title: 'Changes have been saved!',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000 // Timer for auto-close (in milliseconds)
        });
    };    
    
    return (

    <div className='container'>

        <header className='mt-4'>
            <div>
                <Link className='nav-link' to="/">
                    <button className='btn btn-sm btn-success'>Back</button>
                </Link>
            </div>
        </header>

        <form className="card p-3 mt-2 bg-light bg-gradient shadow-sm" onSubmit={handleSubmit}>
            <h3>Edit Task</h3>
            <div className=''>
                <div className='form-floating mt-2'>
                    <input
                        className='form-control'
                        id="title-input"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                    <label htmlFor="title-input">Title</label>
                </div>

                <div className='form-floating mt-2'>
                    <textarea
                        className='form-control'
                        id="content-input"
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                        required
                    >{content}</textarea>
                    <label htmlFor="content-input">Content</label>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <button className='btn btn-sm btn-success w-50' onClick={handleSave}>Save</button>
            </div>
        </form>
    </div>
    );
};

export default UpdateDetails;
