import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to='/'>
                    <span className="logo">Booking App</span>
                </Link>
                <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton" onClick={handleLoginClick}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
