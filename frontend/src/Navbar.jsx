import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '1rem', backgroundColor: '#1a1a1a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>RDB Hotels</h2>
            <div>
                <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
                <Link to="/rooms" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Rooms</Link>
                <Link to="/add-room" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Room</Link>
                <Link to="/register" style={{ color: '#ffc107', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;