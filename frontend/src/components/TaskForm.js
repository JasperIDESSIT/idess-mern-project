import React, { useState } from 'react';
import Select from 'react-select';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

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

    const handleSubmit = async () => {
      

        const task = { title, content, tags: selectedTags };

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (response.ok) {
            setTitle('');
            setContent('');
            setSelectedTags([]);
            console.log('New task added!');
        }
    };

    const handleTagChange = (selectedOptions) => {
        setSelectedTags(selectedOptions.map(option => option.value));
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create Task</h3>

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
                value={content}
                required
            />

            <button>Add Task</button>
        </form>
    );
};

export default TaskForm;