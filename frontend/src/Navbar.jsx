import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const userId   = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <style>{`
                .navbar {
                    padding: 0 2.5rem;
                    height: 68px;
                    background: rgba(10,14,26,0.92);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(201,168,76,0.12);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.35);
                }
                .navbar-logo { text-decoration: none; display: flex; align-items: center; gap: 12px; }
                .navbar-wordmark { display: flex; flex-direction: column; line-height: 1; }
                .navbar-brand {
                    font-size: 1.4rem; font-weight: 900; letter-spacing: 3px;
                    color: #f8fafc; font-family: 'Cinzel Decorative', serif;
                }
                .navbar-sub {
                    font-size: 0.55rem; font-weight: 400; letter-spacing: 6px;
                    color: #c9a84c; margin-top: 4px; font-family: 'Cinzel', serif;
                }

                .navbar-links { display: flex; align-items: center; gap: 6px; }

                .nav-link {
                    color: rgba(255,255,255,0.55);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.88rem;
                    padding: 7px 14px;
                    border-radius: 8px;
                    transition: color 0.2s, background 0.2s;
                }
                .nav-link:hover { color: #c9a84c; background: rgba(201,168,76,0.08); }
                .nav-link.active { color: #c9a84c; background: rgba(201,168,76,0.1); }

                .nav-admin-group {
                    display: flex; gap: 6px; align-items: center;
                    background: rgba(201,168,76,0.06);
                    border: 1px solid rgba(201,168,76,0.18);
                    padding: 4px 10px; border-radius: 10px;
                }

                .nav-user-pill {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 6px 14px;
                    border-radius: 50px;
                    font-size: 0.82rem;
                    color: rgba(255,255,255,0.8);
                    display: flex; align-items: center; gap: 6px;
                }
                .nav-user-pill .admin-badge {
                    color: #c9a84c; font-weight: 700; font-size: 0.75rem;
                }

                .nav-btn-login {
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    padding: 7px 16px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.15);
                    font-weight: 500;
                    font-size: 0.88rem;
                    transition: all 0.2s;
                }
                .nav-btn-login:hover { border-color: rgba(201,168,76,0.4); color: #c9a84c; }

                .nav-btn-register {
                    background: linear-gradient(135deg, #c9a84c, #e8c97e);
                    color: #0a0e1a;
                    text-decoration: none;
                    padding: 8px 18px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 0.88rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 4px 14px rgba(201,168,76,0.3);
                }
                .nav-btn-register:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(201,168,76,0.4);
                }

                .nav-btn-logout {
                    padding: 7px 14px;
                    background: rgba(239,68,68,0.12);
                    border: 1px solid rgba(239,68,68,0.25);
                    color: #f87171;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.82rem;
                    font-family: 'Inter', sans-serif;
                    transition: all 0.2s;
                }
                .nav-btn-logout:hover {
                    background: rgba(239,68,68,0.22);
                    border-color: rgba(239,68,68,0.45);
                }
                .nav-sep { color: rgba(255,255,255,0.15); padding: 0 2px; }
            `}</style>

            <nav className="navbar">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <svg width="42" height="48" viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%"   stopColor="#f5d07a" />
                                <stop offset="50%"  stopColor="#c9922a" />
                                <stop offset="100%" stopColor="#f5d07a" />
                            </linearGradient>
                        </defs>
                        <polyline points="8,20 14,10 20,17 24,8 28,17 34,10 40,20" fill="none" stroke="url(#goldGrad2)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                        <polygon  points="24,50 6,26 12,20 36,20 42,26"              fill="none" stroke="url(#goldGrad2)" strokeWidth="2" strokeLinejoin="round"/>
                        <polyline points="13,26 24,42 35,26"                          fill="none" stroke="url(#goldGrad2)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
                        <line x1="12" y1="20" x2="36" y2="20" stroke="url(#goldGrad2)" strokeWidth="1.5"/>
                        <line x1="6"  y1="26" x2="42" y2="26" stroke="url(#goldGrad2)" strokeWidth="1.2" strokeOpacity="0.6"/>
                    </svg>
                    <div className="navbar-wordmark">
                        <span className="navbar-brand">VELORA</span>
                        <span className="navbar-sub">HOTELS</span>
                    </div>
                </Link>

                {/* Links */}
                <div className="navbar-links">
                    <Link to="/"      className={`nav-link${isActive('/')       ? ' active' : ''}`}>Home</Link>
                    <Link to="/rooms" className={`nav-link${isActive('/rooms')  ? ' active' : ''}`}>Explore Rooms</Link>

                    {userId && (
                        <Link to="/my-bookings" className={`nav-link${isActive('/my-bookings') ? ' active' : ''}`}>My Bookings</Link>
                    )}

                    {userRole === 'ADMIN' && (
                        <div className="nav-admin-group">
                            <Link to="/admin"    className={`nav-link${isActive('/admin')    ? ' active' : ''}`} style={{ padding: '4px 10px' }}>📊 Dashboard</Link>
                            <span className="nav-sep">|</span>
                            <Link to="/add-room" className={`nav-link${isActive('/add-room') ? ' active' : ''}`} style={{ padding: '4px 10px', color: '#34d399' }}>+ Add Room</Link>
                        </div>
                    )}

                    {userId ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
                            <span className="nav-user-pill">
                                👤 {userName || `User #${userId}`}
                                {userRole === 'ADMIN' && <span className="admin-badge">(Admin)</span>}
                            </span>
                            <button className="nav-btn-logout" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
                            <Link to="/login"    className="nav-btn-login">Login</Link>
                            <Link to="/register" className="nav-btn-register">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;