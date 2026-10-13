import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/rooms/`);
            setRooms(response.data);
            setError(null);
        } catch (err) {
            setError('Backend server check');
            console.error('Error fetching rooms:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'AVAILABLE': return 'badge badge-available';
            case 'BOOKED': return 'badge badge-booked';
            case 'MAINTENANCE': return 'badge badge-maintenance';
            default: return 'badge';
        }
    };

    const getRoomTypeIcon = (type) => {
        switch (type) {
            case 'SINGLE': return '🛏️';
            case 'DOUBLE': return '🛏️🛏️';
            case 'SUITE': return '👑';
            default: return '🏨';
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Rooms load වෙනවා...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={fetchRooms}>
                        නැවත උත්සාහ කරන්න
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>🏨 Available Rooms</h1>
                <p> Choose your Room</p>
            </div>

            {rooms.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">🏗️</span>
                    <h2>No Rooms</h2>
                    <p>Not yet Rooms.</p>
                </div>
            ) : (
                <div className="rooms-grid">
                    {rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            <div className="room-card-header">
                                <span className="room-type-icon">{getRoomTypeIcon(room.room_type)}</span>
                                <span className={getStatusBadgeClass(room.status)}>
                                    {room.status}
                                </span>
                            </div>
                            <div className="room-card-body">
                                <h3>Room {room.room_number}</h3>
                                <p className="room-type">{room.room_type}</p>
                                <div className="room-price">
                                    <span className="price-amount">Rs. {room.price_per_night.toLocaleString()}</span>
                                    <span className="price-unit">/ night</span>
                                </div>
                            </div>
                            <div className="room-card-footer">
                                <button
                                    className={`btn ${room.status === 'AVAILABLE' ? 'btn-primary' : 'btn-disabled'}`}
                                    disabled={room.status !== 'AVAILABLE'}
                                >
                                    {room.status === 'AVAILABLE' ? 'Book Now' : 'Unavailable'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Rooms;
