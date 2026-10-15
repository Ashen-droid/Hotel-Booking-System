import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function BookRoom() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const handleBooking = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert("Booking ekak danna kalin Register wenna oni!");
            navigate('/register');
            return;
        }

        const bookingData = {
            room_id: parseInt(roomId),
            check_in_date: new Date(checkIn).toISOString(),
            check_out_date: new Date(checkOut).toISOString()
        };

        api.post(`/bookings/${userId}/`, bookingData)
            .then((response) => {
                alert(`Booking Successful! Total Amount: Rs. ${response.data.total_amount}`);
                navigate('/rooms');
            })
            .catch((error) => {
                console.error("Booking error:", error);
                alert("Booking failed. Please check the dates and try again.");
            });
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Book Room (ID: {roomId})</h2>

            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Check-in Date:</label><br />
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%' }}
                    />
                </div>

                <div>
                    <label>Check-out Date:</label><br />
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        required
                        style={{ padding: '8px', width: '100%' }}
                    />
                </div>

                <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Confirm Booking
                </button>
            </form>
        </div>
    );
}

export default BookRoom;