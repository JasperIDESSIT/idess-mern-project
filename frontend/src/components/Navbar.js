import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Task Tracker</h1>
                </Link>
                <Link to="/">
                    <h4>Active Tasks</h4>
                </Link>
                <Link to="/api/tasks/archive/">
                    <h4>Archived Tasks</h4>
                </Link>
            </div>

        </header>
    )
}

export default Navbar