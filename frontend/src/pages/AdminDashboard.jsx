import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminDashboard() {
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = () => {
        setLoading(true);
        Promise.all([
            api.get('/rooms/'),
            api.get('/bookings/')
        ])
            .then(([roomsRes, bookingsRes]) => {
                setRooms(roomsRes.data);
                setBookings(bookingsRes.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Dashboard data ganna giyama error ekak aawa:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleAdminCancel = (bookingId) => {
        if (!window.confirm("Admin: Me booking eka cancel karanna onida?")) return;

        api.put(`/bookings/${bookingId}/cancel`)
            .then(() => {
                alert("Booking Cancelled Successfully!");
                fetchDashboardData();
            })
            .catch((error) => {
                console.error("Cancel error:", error);
                alert("Failed to cancel booking.");
            });
    };

    // --- ANALYTICS & KPI CALCULATIONS ---
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.status === 'AVAILABLE').length;
    const bookedRooms = rooms.filter(r => r.status === 'BOOKED').length;

    const activeBookings = bookings.filter(b => b.status !== 'CANCELLED');
    const totalRevenue = activeBookings.reduce((sum, b) => sum + b.total_amount, 0);

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Dashboard...</div>;
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#1a1a1a' }}>Hotel Admin Dashboard</h2>

            {/* 1. KPI Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '2.5rem' }}>

                <div style={{ backgroundColor: '#e8f5e9', padding: '1.5rem', borderRadius: '10px', borderLeft: '5px solid #28a745' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Total Revenue</h4>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
                        Rs. {totalRevenue.toLocaleString()}
                    </p>
                </div>

                <div style={{ backgroundColor: '#e3f2fd', padding: '1.5rem', borderRadius: '10px', borderLeft: '5px solid #007BFF' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Active Bookings</h4>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#007BFF' }}>
                        {activeBookings.length} <span style={{ fontSize: '1rem', color: '#666' }}>/ {bookings.length} Total</span>
                    </p>
                </div>

                <div style={{ backgroundColor: '#fff8e1', padding: '1.5rem', borderRadius: '10px', borderLeft: '5px solid #ffc107' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Available Rooms</h4>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#d39e00' }}>
                        {availableRooms} <span style={{ fontSize: '1rem', color: '#666' }}>/ {totalRooms} Rooms</span>
                    </p>
                </div>

                <div style={{ backgroundColor: '#fce4ec', padding: '1.5rem', borderRadius: '10px', borderLeft: '5px solid #dc3545' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Occupied Rooms</h4>
                    <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, color: '#dc3545' }}>
                        {bookedRooms}
                    </p>
                </div>

            </div>

            {/* 2. All Bookings Master Table */}
            <h3 style={{ marginBottom: '1rem' }}>All Hotel Bookings</h3>
            {bookings.length === 0 ? (
                <p>No bookings found in the system.</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#343a40', color: 'white', textAlign: 'left' }}>
                                <th style={{ padding: '12px' }}>Booking ID</th>
                                <th style={{ padding: '12px' }}>User ID</th>
                                <th style={{ padding: '12px' }}>Room ID</th>
                                <th style={{ padding: '12px' }}>Check-In</th>
                                <th style={{ padding: '12px' }}>Check-Out</th>
                                <th style={{ padding: '12px' }}>Amount (Rs.)</th>
                                <th style={{ padding: '12px' }}>Status</th>
                                <th style={{ padding: '12px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>#{b.id}</td>
                                    <td style={{ padding: '12px' }}>User #{b.user_id}</td>
                                    <td style={{ padding: '12px' }}>Room #{b.room_id}</td>
                                    <td style={{ padding: '12px' }}>{new Date(b.check_in_date).toLocaleDateString()}</td>
                                    <td style={{ padding: '12px' }}>{new Date(b.check_out_date).toLocaleDateString()}</td>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{b.total_amount.toLocaleString()}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                            backgroundColor: b.status === 'CANCELLED' ? '#ffe6e6' : '#e7f1ff',
                                            color: b.status === 'CANCELLED' ? '#dc3545' : '#007BFF'
                                        }}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {b.status !== 'CANCELLED' ? (
                                            <button
                                                onClick={() => handleAdminCancel(b.id)}
                                                style={{
                                                    padding: '5px 10px',
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <span style={{ color: '#999', fontSize: '0.85rem' }}>No Action</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;