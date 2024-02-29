import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    
    return (
        <header>

            <nav class="navbar navbar-expand-lg bg-light">
                <div class="container">
               
                        <h4 class="navbar-brand fw-bold">Task Tracker</h4>
                   
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link className='active nav-link' to="/">
                                <div>Active Tasks</div>
                            </Link>
                        </li>
                        <li class="nav-item">
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