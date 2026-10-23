import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading]   = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('/login/', { email, password })
            .then((response) => {
                localStorage.setItem('userId',   response.data.id);
                localStorage.setItem('userName', response.data.full_name);
                localStorage.setItem('userRole', response.data.role);
                navigate('/rooms');
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('Invalid Email or Password! Karunakara aith check karanna.');
                setLoading(false);
            });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-eyebrow">✦ Velora Grand Hotel</div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to manage your reservations</p>

                <hr className="auth-divider" />

                <form onSubmit={handleLogin}>
                    <div className="field-group">
                        <label className="field-label">Email Address</label>
                        <input
                            type="email"
                            className="field-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Password</label>
                        <input
                            type="password"
                            className="field-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-gold" disabled={loading}>
                        {loading ? 'Signing in…' : '→ Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.35)' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#c9a84c', fontWeight: '600', textDecoration: 'none' }}>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;