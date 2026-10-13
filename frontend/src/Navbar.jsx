import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="brand-icon">🏨</span>
                <h2>RDB Hotels</h2>
            </Link>
            <div className="navbar-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                    Home
                </Link>
                <Link to="/rooms" className={location.pathname === '/rooms' ? 'active' : ''}>
                    Rooms
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;