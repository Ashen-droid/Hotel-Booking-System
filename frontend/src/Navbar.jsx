import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        alert("Successfully Logged Out!");
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem 2rem', backgroundColor: '#1a1a1a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <h2 style={{ margin: 0 }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>RDB Hotels</Link>
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/rooms" style={{ color: 'white', textDecoration: 'none' }}>Rooms</Link>

                {userId && (
                    <Link to="/my-bookings" style={{ color: 'white', textDecoration: 'none' }}>My Bookings</Link>
                )}

                {userRole === 'ADMIN' && (
                    <>
                        <Link to="/admin" style={{ color: '#17a2b8', textDecoration: 'none', fontWeight: 'bold' }}>Admin Dashboard</Link>
                        <Link to="/add-room" style={{ color: '#28a745', textDecoration: 'none', fontWeight: 'bold' }}>+ Add Room</Link>
                    </>
                )}

                {userId ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '10px' }}>
                        <span style={{ color: '#ffc107', fontWeight: 'bold' }}>
                            Hi, {userName || `User #${userId}`} {userRole === 'ADMIN' ? '(Admin)' : ''}
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to="/login" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
                        <Link to="/register" style={{ color: '#ffc107', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;