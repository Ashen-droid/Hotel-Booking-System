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
        navigate('/login');
    };

    return (
        <nav style={{
            padding: '1rem 3rem',
            background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* VELORA SVG Logo Icon */}
                <svg width="48" height="54" viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f5d07a" />
                            <stop offset="50%" stopColor="#c9922a" />
                            <stop offset="100%" stopColor="#f5d07a" />
                        </linearGradient>
                    </defs>
                    {/* Crown */}
                    <polyline points="8,20 14,10 20,17 24,8 28,17 34,10 40,20" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                    {/* Diamond body */}
                    <polygon points="24,50 6,26 12,20 36,20 42,26" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinejoin="round"/>
                    {/* Inner V */}
                    <polyline points="13,26 24,42 35,26" fill="none" stroke="url(#goldGrad)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
                    {/* Diamond top-middle line */}
                    <line x1="12" y1="20" x2="36" y2="20" stroke="url(#goldGrad)" strokeWidth="1.5"/>
                    {/* Diamond horizontal mid */}
                    <line x1="6" y1="26" x2="42" y2="26" stroke="url(#goldGrad)" strokeWidth="1.2" strokeOpacity="0.7"/>
                    {/* Left facet */}
                    <line x1="13" y1="26" x2="6" y2="26" stroke="url(#goldGrad)" strokeWidth="1.2" strokeOpacity="0.6"/>
                    <line x1="13" y1="26" x2="24" y2="20" stroke="url(#goldGrad)" strokeWidth="1.2" strokeOpacity="0.6"/>
                    {/* Right facet */}
                    <line x1="35" y1="26" x2="42" y2="26" stroke="url(#goldGrad)" strokeWidth="1.2" strokeOpacity="0.6"/>
                    <line x1="35" y1="26" x2="24" y2="20" stroke="url(#goldGrad)" strokeWidth="1.2" strokeOpacity="0.6"/>
                </svg>

                {/* Wordmark */}
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{
                        fontSize: '1.45rem',
                        fontWeight: '900',
                        letterSpacing: '3px',
                        color: '#f8fafc',
                        fontFamily: "'Cinzel Decorative', serif"
                    }}>VELORA</span>
                    <span style={{
                        fontSize: '0.58rem',
                        fontWeight: '400',
                        letterSpacing: '6px',
                        color: '#38bdf8',
                        marginTop: '4px',
                        fontFamily: "'Cinzel', serif"
                    }}>HOTELS</span>
                </div>
            </Link>


            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.95rem' }}>
                <Link to="/" style={{ color: location.pathname === '/' ? '#38bdf8' : '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
                <Link to="/rooms" style={{ color: location.pathname === '/rooms' ? '#38bdf8' : '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>Explore Rooms</Link>

                {userId && (
                    <Link to="/my-bookings" style={{ color: location.pathname === '/my-bookings' ? '#38bdf8' : '#e2e8f0', textDecoration: 'none', fontWeight: '500' }}>My Bookings</Link>
                )}

                {userRole === 'ADMIN' && (
                    <div style={{ display: 'flex', gap: '12px', backgroundColor: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '8px' }}>
                        <Link to="/admin" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>📊 Dashboard</Link>
                        <span style={{ color: '#475569' }}>|</span>
                        <Link to="/add-room" style={{ color: '#4ade80', textDecoration: 'none', fontWeight: '600' }}>+ Add Room</Link>
                    </div>
                )}

                {userId ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
                        <span style={{ backgroundColor: '#334155', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', color: '#f8fafc' }}>
                            👤 {userName || `User #${userId}`} {userRole === 'ADMIN' && <strong style={{ color: '#fbbf24' }}>(Admin)</strong>}
                        </span>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '7px 16px',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.85rem'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', border: '1px solid #475569', fontWeight: '500' }}>Login</Link>
                        <Link to="/register" style={{ backgroundColor: '#38bdf8', color: '#0f172a', textDecoration: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: '600' }}>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;