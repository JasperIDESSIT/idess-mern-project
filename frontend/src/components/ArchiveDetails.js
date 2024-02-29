import React from 'react';

const ArchiveDetails = ({ task }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="task-details">
            <h4>{task.title}</h4>
            <p><strong>Days: </strong>{task.tags.join(', ')}</p>
            <p><strong>Content: </strong>{task.content}</p>
            <p>{formattedDate}</p>
            {/* <span className="">Update</span> */}
        </div>
    );
};

export default ArchiveDetails;