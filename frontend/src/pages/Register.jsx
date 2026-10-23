import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole]         = useState('GUEST');
    const [loading, setLoading]   = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('/users/', { full_name: fullName, email, password, role })
            .then((response) => {
                localStorage.setItem('userId',   response.data.id);
                localStorage.setItem('userName', response.data.full_name);
                localStorage.setItem('userRole', response.data.role);
                navigate('/rooms');
            })
            .catch((error) => {
                console.error('Registration error:', error);
                alert('Registration failed. Email might already exist.');
                setLoading(false);
            });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-eyebrow">✦ Velora Grand Hotel</div>
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join Velora and unlock exclusive member rates</p>

                <hr className="auth-divider" />

                <form onSubmit={handleRegister}>
                    <div className="field-group">
                        <label className="field-label">Full Name</label>
                        <input
                            type="text"
                            className="field-input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Your full name"
                            required
                        />
                    </div>

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
                            placeholder="Min. 6 characters"
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Account Type (Demo)</label>
                        <select
                            className="field-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="GUEST">Guest (Customer)</option>
                            <option value="ADMIN">Hotel Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-gold" disabled={loading}>
                        {loading ? 'Creating account…' : '✦ Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.83rem', color: 'rgba(255,255,255,0.35)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#c9a84c', fontWeight: '600', textDecoration: 'none' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;