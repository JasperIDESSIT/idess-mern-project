import React, { useState } from 'react';
import Select from 'react-select';

const UpdateDetails = ({ task, onUpdate }) => {
    const [title, setTitle] = useState(task.title || ''); // Initialize state with task title
    const [content, setContent] = useState(task.content || ''); // Initialize state with task content
    const [selectedTags, setSelectedTags] = useState(task.tags || []);

    const options = [
        { label: 'Weekdays', options: [
            { value: 'monday', label: 'Monday' },
            { value: 'tuesday', label: 'Tuesday' },
            { value: 'wednesday', label: 'Wednesday' },
            { value: 'thursday', label: 'Thursday' },
            { value: 'friday', label: 'Friday' }
        ]},
        { label: 'Weekend', options: [
            { value: 'saturday', label: 'Saturday' },
            { value: 'sunday', label: 'Sunday' }
        ]}
    ];

    // Function to handle tag change
    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions); // Update selectedTags state
    };

    const handleSubmit = async () => {

        const updatedTask = { 
            ...task, title, content, selectedTags 
        }; // Merge updated values with existing task

        try {
            const response = await fetch(`/api/tasks/update/${task._id}`, {
                method: 'PATCH', // Use PATCH method to update existing task
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
            <div>
                <h3>Edit Task</h3>

                <label>Title</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />

                <label>Days:</label>
                <Select
                    options={options.map(group => ({
                        label: group.label,
                        options: group.options.map(option => ({
                            value: option.value,
                            label: option.label
                        }))
                    }))}
                    isMulti
                    value={selectedTags}
                    onChange={handleTagChange} // Assign handleTagChange function to onChange
                />

                <label>Content</label>
                <textarea
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    required
                >{content}</textarea>

                <div className="button">
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
};

export default UpdateDetails;
