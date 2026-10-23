import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [filterType, setFilterType] = useState('ALL');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/rooms/')
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error("Rooms ganna giyama error ekak aawa:", error);
            });
    }, []);

    const getRoomImage = (type) => {
        const formattedType = type ? type.toUpperCase() : '';
        if (formattedType === 'SUITE') {
            return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80';
        } else if (formattedType === 'DOUBLE') {
            return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';
        } else {
            return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80';
        }
    };

    const filteredRooms = filterType === 'ALL'
        ? rooms
        : rooms.filter(r => r.room_type.toUpperCase() === filterType);

    return (
        <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem', gap: '15px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', color: '#0f172a' }}>Explore Our Luxury Rooms</h2>
                    <p style={{ color: '#64748b' }}>Choose from our curated selection of comfort and luxury</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {['ALL', 'SINGLE', 'DOUBLE', 'SUITE'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                backgroundColor: filterType === type ? '#1e3c72' : '#e2e8f0',
                                color: filterType === type ? 'white' : '#475569',
                                transition: 'all 0.2s'
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
                {filteredRooms.length === 0 ? (
                    <p style={{ color: '#64748b', fontSize: '1.1rem' }}>No rooms found for this category.</p>
                ) : null}

                {filteredRooms.map((room) => (
                    <div key={room.id} className="room-card">

                        <div style={{ position: 'relative', height: '210px' }}>
                            <img
                                src={getRoomImage(room.room_type)}
                                alt={room.room_type}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <span style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                padding: '5px 12px',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: '700',
                                backgroundColor: room.status === 'AVAILABLE' ? '#dcfce7' : '#fee2e2',
                                color: room.status === 'AVAILABLE' ? '#15803d' : '#b91c1c',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                            }}>
                                ● {room.status}
                            </span>
                        </div>

                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '3px 10px', borderRadius: '6px' }}>
                                        {room.room_type} ROOM
                                    </span>
                                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>
                                        Door #{room.room_number}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.3rem', margin: '8px 0', color: '#0f172a' }}>
                                    <span style={{ fontFamily: "'Cinzel Decorative', serif", fontWeight: '700' }}>VELORA</span> Deluxe {room.room_type}
                                </h3>

                                <div style={{ display: 'flex', gap: '12px', color: '#64748b', fontSize: '0.85rem', margin: '12px 0 18px 0' }}>
                                    <span>📶 Free Wi-Fi</span>
                                    <span>❄️ A/C</span>
                                    <span>☕ Breakfast</span>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0f172a' }}>
                                        Rs. {room.price_per_night.toLocaleString()}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}> / night</span>
                                </div>

                                <button
                                    onClick={() => navigate(`/book/${room.id}`)}
                                    disabled={room.status !== 'AVAILABLE'}
                                    className="btn-primary"
                                    style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                                >
                                    {room.status === 'AVAILABLE' ? 'Book Now' : 'Booked'}
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;