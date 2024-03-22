import { NavLink } from 'react-router-dom';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Home.js'; 
import './pages/about.js'; 

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/tabicon2.png" alt="Logo" width="40" height="40" className="d-inline-block align-top" />
                    <span className="ms-2">Innfinity</span>
                </NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/about">About Us</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

