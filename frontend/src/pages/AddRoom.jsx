import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddRoom() {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType]     = useState('SINGLE');
    const [price, setPrice]           = useState('');
    const [loading, setLoading]       = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        api.post('/rooms/', { room_number: roomNumber, room_type: roomType, price_per_night: parseFloat(price) })
            .then(() => { navigate('/rooms'); })
            .catch((error) => {
                console.error('Error adding room:', error);
                alert('Failed to add room. Check terminal for errors.');
                setLoading(false);
            });
    };

    const typeDescriptions = {
        SINGLE: 'Cozy solo room · Standard amenities',
        DOUBLE: 'Spacious double · Couple / friends',
        SUITE:  'Luxury suite   · Pool & spa access',
    };

    return (
        <div className="auth-page">
            <div className="auth-card" style={{ maxWidth: '480px' }}>
                <div className="auth-eyebrow">📊 Admin Panel</div>
                <h1 className="auth-title">Add New Room</h1>
                <p className="auth-subtitle">Fill in the details to list a new room on Velora</p>

                <hr className="auth-divider" />

                <form onSubmit={handleSubmit}>
                    <div className="field-group">
                        <label className="field-label">Room Number</label>
                        <input
                            type="text"
                            className="field-input"
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            placeholder="e.g. 101, 202A"
                            required
                        />
                    </div>

                    <div className="field-group">
                        <label className="field-label">Room Type</label>
                        <select
                            className="field-input"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value="SINGLE">Single</option>
                            <option value="DOUBLE">Double</option>
                            <option value="SUITE">Suite</option>
                        </select>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
                            {typeDescriptions[roomType]}
                        </span>
                    </div>

                    <div className="field-group">
                        <label className="field-label">Price Per Night (Rs.)</label>
                        <input
                            type="number"
                            className="field-input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="e.g. 15000"
                            required
                            min="0"
                        />
                    </div>

                    {/* Preview pill */}
                    {roomNumber && price && (
                        <div style={{
                            background: 'rgba(201,168,76,0.07)',
                            border: '1px solid rgba(201,168,76,0.2)',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            marginBottom: '1rem',
                            fontSize: '0.82rem',
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Preview: <strong style={{ color: '#c9a84c' }}>Room #{roomNumber}</strong> · {roomType} · <strong style={{ color: '#c9a84c' }}>Rs. {parseFloat(price).toLocaleString()}/night</strong>
                        </div>
                    )}

                    <button type="submit" className="btn-gold" disabled={loading}>
                        {loading ? 'Saving…' : '✦ Save Room'}
                    </button>
                </form>

                <button
                    onClick={() => navigate('/admin')}
                    style={{
                        display: 'block', width: '100%', marginTop: '1rem',
                        background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.35)', padding: '11px', borderRadius: '8px',
                        cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'Inter', sans-serif",
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'rgba(255,255,255,0.6)'; }}
                    onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.color = 'rgba(255,255,255,0.35)'; }}
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default AddRoom;