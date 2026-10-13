import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddRoom() {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('SINGLE');
    const [price, setPrice] = useState('');


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newRoom = {
            room_number: roomNumber,
            room_type: roomType,
            price_per_night: parseFloat(price)
        };

        api.post('/rooms/', newRoom)
            .then((response) => {
                alert("Room successfully added!");
                navigate('/rooms');
            })
            .catch((error) => {
                console.error("Error adding room:", error);
                alert("Failed to add room. Check terminal for errors.");
            });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Add a New Room (Admin)</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Room Number:</label><br />
                    <input
                        type="text"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%' }}
                    />
                </div>

                <div>
                    <label>Room Type:</label><br />
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        style={{ padding: '8px', width: '100%' }}
                    >
                        <option value="SINGLE">Single</option>
                        <option value="DOUBLE">Double</option>
                        <option value="SUITE">Suite</option>
                    </select>
                </div>

                <div>
                    <label>Price Per Night (Rs):</label><br />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Save Room
                </button>
            </form>
        </div>
    );
}

export default AddRoom;