import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('GUEST');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            full_name: fullName,
            email: email,
            password: password,
            role: role
        };

        api.post('/users/', newUser)
            .then((response) => {
                alert("Registration Successful!");
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userName', response.data.full_name);
                localStorage.setItem('userRole', response.data.role);

                navigate('/rooms');
            })
            .catch((error) => {
                console.error("Registration error:", error);
                alert("Registration failed. Email might already exist.");
            });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '2rem auto', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create an Account</h2>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Full Name:</label><br />
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
                    />
                </div>

                <div>
                    <label>Account Role (For Demo):</label><br />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ padding: '8px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
                    >
                        <option value="GUEST">Guest (Customer)</option>
                        <option value="ADMIN">Hotel Admin</option>
                    </select>
                </div>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;