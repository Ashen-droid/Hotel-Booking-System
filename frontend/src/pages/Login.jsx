import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        api.post('/login/', { email, password })
            .then((response) => {
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userName', response.data.full_name);
                localStorage.setItem('userRole', response.data.role);

                alert(`Welcome back, ${response.data.full_name}!`);
                navigate('/rooms');
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("Invalid Email or Password! Karunakara aith check karanna.");
            });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '2rem auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login to Your Account</h2>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        style={{ padding: '10px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        style={{ padding: '10px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
                >
                    Login
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
                Thama account ekak nadda? <Link to="/register" style={{ color: '#007BFF' }}>Register here</Link>
            </p>
        </div>
    );
}

export default Login;