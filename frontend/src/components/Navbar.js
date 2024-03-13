import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    
    return (
        <header>

            <nav className="navbar navbar-expand-lg bg-light border-bottom shadow">
                <div className="container">
               
                        <h4 className="navbar-brand fw-bold">Task Tracker</h4>
                   
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='active nav-link' to="/">
                                <div>Active Tasks</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='archive nav-link' to="/api/tasks/archive/">
                                <div>Archived Tasks</div>
                            </Link>
                        </li>
                        {/* <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                        </li> */}
                    </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Navbar