import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArchiveDetails = ({ task }) => {
    const formattedDate = new Date(task.createdAt).toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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

                {/* <div className='d-flex justify-content-start'>
                    <Link to={`/api/tasks/view/${task._id}`}>
                        <button className='btn btn-sm btn-secondary me-2'>Edit</button>
                    </Link>
                    <button className='btn btn-sm btn-danger' onClick={handleArchive}>Delete</button>
                </div> */}
            </div>
        </div>
    );
};

export default ArchiveDetails;