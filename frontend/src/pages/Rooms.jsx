import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const amenityIcons = {
  wifi: '📶',
  ac: '❄️',
  breakfast: '☕',
  pool: '🏊',
  spa: '💆',
  gym: '🏋️',
  tv: '📺',
  safe: '🔒',
};

const roomAmenities = {
  SINGLE: ['wifi', 'ac', 'tv'],
  DOUBLE: ['wifi', 'ac', 'breakfast', 'tv'],
  SUITE:  ['wifi', 'ac', 'breakfast', 'pool', 'spa', 'safe'],
};

const roomDescriptions = {
  SINGLE: 'Cozy and elegant space for solo travelers seeking comfort.',
  DOUBLE: 'Spacious room with premium amenities for couples or friends.',
  SUITE:  'Ultimate luxury experience with panoramic views and exclusive services.',
};

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/rooms/')
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Rooms ganna giyama error ekak aawa:', error);
        setLoading(false);
      });
  }, []);

  const getRoomImage = (type) => {
    const t = type ? type.toUpperCase() : '';
    if (t === 'SUITE')  return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80';
    if (t === 'DOUBLE') return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80';
    return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80';
  };

  const filteredRooms = filterType === 'ALL'
    ? rooms
    : rooms.filter(r => r.room_type.toUpperCase() === filterType);

  const filterBtns = ['ALL', 'SINGLE', 'DOUBLE', 'SUITE'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap');

        .rooms-page {
          min-height: 100vh;
          background: #0a0e1a;
          font-family: 'Inter', sans-serif;
        }

        .rooms-hero {
          position: relative;
          height: 420px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .rooms-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.35);
          transform: scale(1.05);
          transition: transform 8s ease;
        }
        .rooms-hero:hover .rooms-hero-bg { transform: scale(1); }

        .rooms-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,14,26,0.1) 0%, rgba(10,14,26,0.7) 100%);
        }

        .rooms-hero-content {
          position: relative;
          z-index: 2;
          padding: 0 1rem;
        }
        .rooms-hero-eyebrow {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.35em;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 1rem;
          padding: 6px 18px;
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 50px;
          backdrop-filter: blur(8px);
        }
        .rooms-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .rooms-hero-title span { color: #c9a84c; }
        .rooms-hero-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          max-width: 500px;
          margin: 0 auto 2rem;
        }
        .rooms-hero-stats {
          display: flex;
          gap: 2.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .stat-item { text-align: center; }
        .stat-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: #c9a84c;
          display: block;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
        }

        .rooms-filter-bar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10,14,26,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tab {
          padding: 8px 22px;
          border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.55);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.04em;
        }
        .filter-tab:hover {
          border-color: rgba(201,168,76,0.5);
          color: #c9a84c;
          background: rgba(201,168,76,0.06);
        }
        .filter-tab.active {
          background: linear-gradient(135deg, #c9a84c, #e8c97e);
          border-color: transparent;
          color: #0a0e1a;
          box-shadow: 0 4px 16px rgba(201,168,76,0.35);
        }
        .filter-count {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
        }
        .filter-count span { color: #c9a84c; font-weight: 700; }

        .rooms-grid-wrap {
          padding: 3rem 2rem 5rem;
          max-width: 1300px;
          margin: 0 auto;
        }
        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
        }

        .room-card-v2 {
          background: linear-gradient(145deg, #111827, #0f1724);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(.25,.8,.25,1),
                      box-shadow 0.35s cubic-bezier(.25,.8,.25,1),
                      border-color 0.35s ease;
          animation: fadeUp 0.5s ease both;
        }
        .room-card-v2:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.25);
          border-color: rgba(201,168,76,0.2);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-image-wrap {
          position: relative;
          height: 230px;
          overflow: hidden;
        }
        .card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .room-card-v2:hover .card-image-wrap img { transform: scale(1.08); }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(10,14,26,0.7) 0%, transparent 60%);
        }

        .card-badges {
          position: absolute;
          top: 14px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .badge-type {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 13px;
          border-radius: 50px;
          backdrop-filter: blur(12px);
          background: rgba(201,168,76,0.2);
          border: 1px solid rgba(201,168,76,0.4);
          color: #e8c97e;
        }
        .badge-status {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 50px;
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .badge-status.available {
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.4);
          color: #34d399;
        }
        .badge-status.booked {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.35);
          color: #f87171;
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        .card-room-num {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.08em;
        }

        .card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #f1f5f9;
          line-height: 1.3;
        }
        .card-desc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          margin-top: -0.3rem;
        }

        .card-amenities {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .amenity-pill {
          font-size: 0.72rem;
          padding: 4px 11px;
          border-radius: 50px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.55);
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
        }
        .room-card-v2:hover .amenity-pill {
          background: rgba(201,168,76,0.07);
          border-color: rgba(201,168,76,0.2);
          color: rgba(201,168,76,0.85);
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: auto;
        }
        .price-amount {
          font-size: 1.45rem;
          font-weight: 800;
          color: #f1f5f9;
        }
        .price-per { font-size: 0.75rem; color: rgba(255,255,255,0.35); }

        .btn-book {
          padding: 10px 22px;
          border-radius: 50px;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .btn-book.available {
          background: linear-gradient(135deg, #c9a84c, #e8c97e);
          color: #0a0e1a;
          box-shadow: 0 4px 18px rgba(201,168,76,0.3);
        }
        .btn-book.available:hover {
          transform: scale(1.06);
          box-shadow: 0 8px 28px rgba(201,168,76,0.45);
        }
        .btn-book.unavailable {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.25);
          cursor: not-allowed;
          border: 1px solid rgba(255,255,255,0.07);
        }

        .rooms-loading {
          text-align: center;
          padding: 6rem 2rem;
          color: rgba(255,255,255,0.3);
        }
        .spinner {
          width: 48px; height: 48px;
          border: 3px solid rgba(201,168,76,0.15);
          border-top-color: #c9a84c;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
          margin: 0 auto 1.5rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .rooms-empty {
          text-align: center;
          padding: 5rem 2rem;
          color: rgba(255,255,255,0.3);
        }
        .rooms-empty-icon { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.5; }
      `}</style>

      <div className="rooms-page">
        {/* Hero */}
        <section className="rooms-hero">
          <div className="rooms-hero-bg" />
          <div className="rooms-hero-overlay" />
          <div className="rooms-hero-content">
            <span className="rooms-hero-eyebrow">✦ Velora Grand Hotel</span>
            <h1 className="rooms-hero-title">
              Discover Your <span>Perfect</span><br />Retreat
            </h1>
            <p className="rooms-hero-sub">
              Handcrafted experiences in rooms designed for those who appreciate the finest things in life.
            </p>
            <div className="rooms-hero-stats">
              <div className="stat-item">
                <span className="stat-number">{rooms.length || '–'}+</span>
                <span className="stat-label">Rooms</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5★</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Room Types</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Filter Bar */}
        <div className="rooms-filter-bar">
          <span className="filter-label">Filter by type</span>
          <div className="filter-tabs">
            {filterBtns.map(type => (
              <button
                key={type}
                className={`filter-tab${filterType === type ? ' active' : ''}`}
                onClick={() => setFilterType(type)}
              >
                {type === 'ALL' ? '✦ All Rooms' : type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
          <span className="filter-count">
            Showing <span>{filteredRooms.length}</span> {filteredRooms.length === 1 ? 'room' : 'rooms'}
          </span>
        </div>

        {/* Grid */}
        <div className="rooms-grid-wrap">
          {loading ? (
            <div className="rooms-loading">
              <div className="spinner" />
              <p>Loading luxury rooms…</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="rooms-empty">
              <div className="rooms-empty-icon">🏨</div>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.5)' }}>No rooms found</p>
              <p style={{ fontSize: '0.85rem' }}>Try a different filter.</p>
            </div>
          ) : (
            <div className="rooms-grid">
              {filteredRooms.map((room, idx) => {
                const type = room.room_type ? room.room_type.toUpperCase() : 'SINGLE';
                const isAvailable = room.status === 'AVAILABLE';
                const amenities = roomAmenities[type] || roomAmenities['SINGLE'];
                const description = roomDescriptions[type] || roomDescriptions['SINGLE'];

                return (
                  <div
                    key={room.id}
                    className="room-card-v2"
                    style={{ animationDelay: `${idx * 0.07}s` }}
                  >
                    <div className="card-image-wrap">
                      <img src={getRoomImage(room.room_type)} alt={room.room_type} />
                      <div className="card-image-overlay" />
                      <div className="card-badges">
                        <span className="badge-type">{type}</span>
                        <span className={`badge-status ${isAvailable ? 'available' : 'booked'}`}>
                          <span className="status-dot" />
                          {isAvailable ? 'Available' : 'Booked'}
                        </span>
                      </div>
                      <span className="card-room-num">Room #{room.room_number}</span>
                    </div>

                    <div className="card-body">
                      <div>
                        <h3 className="card-title">
                          Velora {type.charAt(0) + type.slice(1).toLowerCase()} Experience
                        </h3>
                        <p className="card-desc">{description}</p>
                      </div>

                      <div className="card-amenities">
                        {amenities.map(key => (
                          <span key={key} className="amenity-pill">
                            {amenityIcons[key]} {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                        ))}
                      </div>

                      <div className="card-footer">
                        <div>
                          <div className="price-amount">Rs. {room.price_per_night.toLocaleString()}</div>
                          <div className="price-per">per night</div>
                        </div>
                        <button
                          className={`btn-book ${isAvailable ? 'available' : 'unavailable'}`}
                          onClick={() => isAvailable && navigate(`/book/${room.id}`)}
                          disabled={!isAvailable}
                        >
                          {isAvailable ? '→ Book Now' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Rooms;