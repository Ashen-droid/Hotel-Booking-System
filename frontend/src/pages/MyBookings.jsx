import { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading]   = useState(true);
    const navigate = useNavigate();

    const fetchBookings = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Bookings balanna kalin Register wenna oni!');
            navigate('/register');
            return;
        }
        api.get(`/bookings/${userId}/`)
            .then((response) => { setBookings(response.data); setLoading(false); })
            .catch((error)   => { console.error('Bookings error:', error); setLoading(false); });
    };

    useEffect(() => { fetchBookings(); }, []);

    const handleCancel = (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        api.put(`/bookings/${bookingId}/cancel`)
            .then(() => { fetchBookings(); })
            .catch(() => alert('Booking eka cancel karanna bari una.'));
    };

    const getRoomTypeName = (roomId) => `Room #${roomId}`;

    const statusColor = (status) => ({
        bg:     status === 'CANCELLED' ? 'rgba(239,68,68,0.12)'    : status === 'CONFIRMED' ? 'rgba(16,185,129,0.12)' : 'rgba(201,168,76,0.1)',
        border: status === 'CANCELLED' ? 'rgba(239,68,68,0.3)'     : status === 'CONFIRMED' ? 'rgba(16,185,129,0.3)'  : 'rgba(201,168,76,0.3)',
        color:  status === 'CANCELLED' ? '#f87171'                  : status === 'CONFIRMED' ? '#34d399'               : '#c9a84c',
    });

    return (
        <>
            <style>{`
                .mybookings-page {
                    min-height: 100vh;
                    background: #0a0e1a;
                    font-family: 'Inter', sans-serif;
                    padding: 3rem 2rem 5rem;
                }
                .mybookings-header {
                    max-width: 860px;
                    margin: 0 auto 2.5rem;
                }
                .mybookings-eyebrow {
                    font-size: 0.65rem;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    color: #c9a84c;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }
                .mybookings-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #f1f5f9;
                    margin-bottom: 0.4rem;
                }
                .mybookings-sub { font-size: 0.85rem; color: rgba(255,255,255,0.35); }

                .booking-list {
                    max-width: 860px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }

                .booking-card {
                    background: linear-gradient(145deg, #111827, #0f1724);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 16px;
                    padding: 1.5rem 1.8rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
                }
                .booking-card:hover {
                    border-color: rgba(201,168,76,0.2);
                    box-shadow: 0 16px 40px rgba(0,0,0,0.35);
                    transform: translateY(-3px);
                }

                .booking-id-badge {
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    color: #c9a84c;
                    background: rgba(201,168,76,0.08);
                    border: 1px solid rgba(201,168,76,0.2);
                    padding: 3px 12px;
                    border-radius: 50px;
                    display: inline-block;
                    margin-bottom: 0.6rem;
                }
                .booking-room {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #f1f5f9;
                    margin-bottom: 0.5rem;
                }
                .booking-dates {
                    font-size: 0.82rem;
                    color: rgba(255,255,255,0.45);
                    display: flex;
                    gap: 1.2rem;
                    flex-wrap: wrap;
                }
                .booking-dates span { display: flex; align-items: center; gap: 5px; }

                .booking-right {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 10px;
                }
                .booking-amount {
                    font-size: 1.35rem;
                    font-weight: 800;
                    color: #c9a84c;
                }
                .booking-amount-sub { font-size: 0.72rem; color: rgba(255,255,255,0.3); }

                .status-badge {
                    font-size: 0.72rem;
                    font-weight: 700;
                    padding: 5px 14px;
                    border-radius: 50px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }

                .btn-cancel {
                    padding: 8px 16px;
                    background: rgba(239,68,68,0.1);
                    border: 1px solid rgba(239,68,68,0.25);
                    color: #f87171;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.8rem;
                    font-family: 'Inter', sans-serif;
                    transition: all 0.2s;
                }
                .btn-cancel:hover {
                    background: rgba(239,68,68,0.2);
                    border-color: rgba(239,68,68,0.4);
                }

                .bookings-empty {
                    text-align: center;
                    padding: 5rem 2rem;
                    color: rgba(255,255,255,0.3);
                }
                .bookings-empty-icon { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.4; }

                .bookings-loading {
                    text-align: center;
                    padding: 6rem 2rem;
                    color: rgba(255,255,255,0.3);
                }
                .spinner {
                    width: 44px; height: 44px;
                    border: 3px solid rgba(201,168,76,0.15);
                    border-top-color: #c9a84c;
                    border-radius: 50%;
                    animation: spin 0.9s linear infinite;
                    margin: 0 auto 1.2rem;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .booking-card { animation: fadeUp 0.4s ease both; }
            `}</style>

            <div className="mybookings-page">
                <div className="mybookings-header">
                    <div className="mybookings-eyebrow">✦ Velora Grand Hotel</div>
                    <h1 className="mybookings-title">My Reservations</h1>
                    <p className="mybookings-sub">Manage and track all your bookings in one place</p>
                </div>

                {loading ? (
                    <div className="bookings-loading">
                        <div className="spinner" />
                        <p>Loading your bookings…</p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bookings-empty">
                        <div className="bookings-empty-icon">🏨</div>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>No reservations yet</p>
                        <p style={{ fontSize: '0.85rem' }}>Explore our rooms and make your first booking!</p>
                    </div>
                ) : (
                    <div className="booking-list">
                        {bookings.map((booking, idx) => {
                            const sc = statusColor(booking.status);
                            const checkIn  = new Date(booking.check_in_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                            const checkOut = new Date(booking.check_out_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

                            return (
                                <div key={booking.id} className="booking-card" style={{ animationDelay: `${idx * 0.06}s` }}>
                                    <div>
                                        <div className="booking-id-badge">Booking #{booking.id}</div>
                                        <div className="booking-room">{getRoomTypeName(booking.room_id)}</div>
                                        <div className="booking-dates">
                                            <span>📅 Check-in: <strong style={{ color: '#f1f5f9' }}>{checkIn}</strong></span>
                                            <span>📅 Check-out: <strong style={{ color: '#f1f5f9' }}>{checkOut}</strong></span>
                                        </div>
                                    </div>

                                    <div className="booking-right">
                                        <div>
                                            <div className="booking-amount">Rs. {booking.total_amount}</div>
                                            <div className="booking-amount-sub">Total Amount</div>
                                        </div>

                                        <span
                                            className="status-badge"
                                            style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}
                                        >
                                            {booking.status}
                                        </span>

                                        {booking.status !== 'CANCELLED' && (
                                            <button className="btn-cancel" onClick={() => handleCancel(booking.id)}>
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyBookings;