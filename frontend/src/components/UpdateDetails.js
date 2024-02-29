import React, { useState } from 'react';
import Select from 'react-select';

const UpdateDetails = ({ task, onUpdate }) => {
    const [title, setTitle] = useState(task.title || ''); // Initialize state with task title
    const [content, setContent] = useState(task.content || ''); // Initialize state with task content
    const [selectedTags, setSelectedTags] = useState([]);

    const options = [
        { value: 'sunday', label: 'Sunday' },
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' }
    ];


    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const updatedTask = { 
            ...task, title, content, selectedTags 
        }; 

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
                // onUpdate(updatedTask); // Update task in parent component
            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <form className="update" onSubmit={handleSubmit}>
            <div className='update-form'>
                <h3>Edit Task</h3>

                <label>Title</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />

                {/* <label>Days:</label>
                <Select
                    options={options}
                    isMulti
                    onChange={handleTagChange}
                /> */}

                <label>Content</label>
                <textarea
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    required
                >{content}</textarea>

                <div className="button">
                    <button >Save</button>
                </div>
            </div>
        </form>
    );
};

export default UpdateDetails;
