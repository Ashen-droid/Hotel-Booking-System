import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import karanawa
import api from '../services/api';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate(); // 2. Navigate function eka gannawa

    useEffect(() => {
        api.get('/rooms/')
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error("Rooms ganna giyama error ekak aawa:", error);
            });
    }, []);

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h2>Available Rooms</h2>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {rooms.length === 0 ? <p>No rooms available yet.</p> : null}

                {rooms.map((room) => (
                    <div key={room.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '250px', backgroundColor: '#f9f9f9' }}>
                        <h3>Room {room.room_number}</h3>
                        <p><strong>Type:</strong> {room.room_type}</p>
                        <p><strong>Price:</strong> Rs. {room.price_per_night} / night</p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span style={{ color: room.status === 'AVAILABLE' ? 'green' : 'red', fontWeight: 'bold' }}>
                                {room.status}
                            </span>
                        </p>

                        {/* 3. Room eka AVAILABLE nam witharak book karanna denawa */}
                        <button
                            onClick={() => navigate(`/book/${room.id}`)}
                            disabled={room.status !== 'AVAILABLE'}
                            style={{
                                padding: '10px',
                                backgroundColor: room.status === 'AVAILABLE' ? '#007BFF' : '#ccc',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: room.status === 'AVAILABLE' ? 'pointer' : 'not-allowed',
                                width: '100%'
                            }}
                        >
                            {room.status === 'AVAILABLE' ? 'Book Now' : 'Already Booked'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;