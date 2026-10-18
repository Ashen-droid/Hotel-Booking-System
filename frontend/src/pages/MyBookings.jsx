import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert("Bookings balanna kalin Register wenna oni!");
            navigate('/register');
            return;
        }

        api.get(`/bookings/${userId}/`)
            .then((response) => {
                setBookings(response.data);
            })
            .catch((error) => {
                console.error("Bookings ganna giyama error ekak aawa:", error);
            });
    }, [navigate]);

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2>My Bookings</h2>

            {bookings.length === 0 ? (
                <p>Oya thama kisima room ekak book karala naha.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            style={{
                                border: '1px solid #ddd',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                backgroundColor: '#fdfdfd',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Booking ID: #{booking.id}</h3>
                                <p style={{ margin: '5px 0' }}><strong>Room ID:</strong> {booking.room_id}</p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Check-in:</strong> {new Date(booking.check_in_date).toLocaleDateString()}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Check-out:</strong> {new Date(booking.check_out_date).toLocaleDateString()}
                                </p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745', margin: '0 0 10px 0' }}>
                                    Rs. {booking.total_amount}
                                </p>
                                <span style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#e7f1ff',
                                    color: '#007BFF',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;