import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // Bookings tika backend eken ganna function eka
    const fetchBookings = () => {
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
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Booking eka cancel karana function eka
    const handleCancel = (bookingId) => {
        if (!window.confirm("Oyata sure da me booking eka cancel karanna oni kiyala?")) {
            return;
        }

        api.put(`/bookings/${bookingId}/cancel`)
            .then((response) => {
                alert("Booking eka successfully cancel una! Room eka aith Available.");
                // List eka aluth karanawa
                fetchBookings();
            })
            .catch((error) => {
                console.error("Cancel error:", error);
                alert("Booking eka cancel karanna bari una.");
            });
    };

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

                            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#28a745', margin: 0 }}>
                                    Rs. {booking.total_amount}
                                </p>

                                {/* Status Badge Eka */}
                                <span style={{
                                    padding: '5px 10px',
                                    backgroundColor: booking.status === 'CANCELLED' ? '#ffe6e6' : '#e7f1ff',
                                    color: booking.status === 'CANCELLED' ? '#dc3545' : '#007BFF',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    {booking.status}
                                </span>

                                {/* Booking eka CANCELLED nattam witharak Cancel button eka pennanawa */}
                                {booking.status !== 'CANCELLED' && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#dc3545',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;