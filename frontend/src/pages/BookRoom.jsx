import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function BookRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Try to fetch room details for display */
  useEffect(() => {
    api.get('/rooms/')
      .then(res => {
        const found = res.data.find(r => r.id === parseInt(roomId));
        if (found) setRoom(found);
      })
      .catch(() => {});
  }, [roomId]);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
    : 0;

  const total = room && nights > 0
    ? (room.price_per_night * nights).toLocaleString()
    : null;

  const handleBooking = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Booking ekak danna kalin Register wenna oni!');
      navigate('/register');
      return;
    }
    setLoading(true);
    const bookingData = {
      room_id: parseInt(roomId),
      check_in_date: new Date(checkIn).toISOString(),
      check_out_date: new Date(checkOut).toISOString(),
    };
    api.post(`/bookings/${userId}/`, bookingData)
      .then(response => {
        alert(`Booking Successful! Total Amount: Rs. ${response.data.total_amount}`);
        navigate('/rooms');
      })
      .catch(error => {
        console.error('Booking error:', error);
        alert('Booking failed. Please check the dates and try again.');
        setLoading(false);
      });
  };

  const getRoomImage = (type) => {
    const t = type ? type.toUpperCase() : '';
    if (t === 'SUITE')  return 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80';
    if (t === 'DOUBLE') return 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80';
    return 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap');

        .bookroom-page {
          min-height: 100vh;
          background: #0a0e1a;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: stretch;
        }

        /* Left panel – room preview */
        .bookroom-preview {
          flex: 1;
          position: relative;
          min-height: 100vh;
          display: none;
        }
        @media (min-width: 900px) {
          .bookroom-preview { display: block; }
        }
        .bookroom-preview-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.45);
        }
        .bookroom-preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 60%, #0a0e1a 100%),
                      linear-gradient(180deg, rgba(10,14,26,0.2) 0%, rgba(10,14,26,0.7) 100%);
        }
        .bookroom-preview-content {
          position: absolute;
          bottom: 3rem;
          left: 2.5rem;
          right: 2rem;
        }
        .preview-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .preview-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 0.5rem;
        }
        .preview-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.55);
          margin-bottom: 1.5rem;
        }
        .preview-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .preview-tag {
          font-size: 0.72rem;
          padding: 5px 13px;
          border-radius: 50px;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.3);
          color: #e8c97e;
        }

        /* Right panel – form */
        .bookroom-form-panel {
          width: 100%;
          max-width: 540px;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #0a0e1a;
        }
        @media (min-width: 900px) {
          .bookroom-form-panel { padding: 4rem 3rem; }
        }

        .form-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.4);
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          padding: 0;
          margin-bottom: 2.5rem;
          transition: color 0.2s;
        }
        .form-back-btn:hover { color: #c9a84c; }

        .form-heading-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #c9a84c;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .form-heading {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #f1f5f9;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }
        .form-subtext {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2.5rem;
        }

        /* Room ID pill */
        .room-id-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 50px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.25);
          color: #c9a84c;
          margin-bottom: 2rem;
        }

        /* Date inputs */
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 1.25rem;
        }
        .field-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .field-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: #f1f5f9;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          color-scheme: dark;
        }
        .field-input:focus {
          border-color: rgba(201,168,76,0.55);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
        }

        /* Summary card */
        .booking-summary {
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 1.2rem 1.5rem;
          margin: 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
        }
        .summary-row strong {
          color: #f1f5f9;
          font-weight: 600;
        }
        .summary-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0.2rem 0;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          font-weight: 700;
          color: #c9a84c;
        }

        /* Submit button */
        .btn-confirm {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #c9a84c, #e8c97e);
          color: #0a0e1a;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
          box-shadow: 0 6px 24px rgba(201,168,76,0.35);
          margin-top: 0.5rem;
        }
        .btn-confirm:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(201,168,76,0.5);
        }
        .btn-confirm:active:not(:disabled) { transform: translateY(0); }
        .btn-confirm:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .secure-note {
          text-align: center;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.25);
          margin-top: 1.2rem;
        }
      `}</style>

      <div className="bookroom-page">
        {/* Left – Room Preview */}
        <div className="bookroom-preview">
          <img
            className="bookroom-preview-img"
            src={getRoomImage(room?.room_type)}
            alt="Room preview"
          />
          <div className="bookroom-preview-overlay" />
          <div className="bookroom-preview-content">
            <div className="preview-eyebrow">✦ Velora Grand Hotel</div>
            <div className="preview-title">
              {room
                ? `Velora ${room.room_type.charAt(0) + room.room_type.slice(1).toLowerCase()} Experience`
                : `Room #${roomId}`}
            </div>
            <div className="preview-subtitle">
              {room?.price_per_night
                ? `Rs. ${room.price_per_night.toLocaleString()} per night`
                : 'Luxury awaits you'}
            </div>
            <div className="preview-tags">
              <span className="preview-tag">📶 Free Wi-Fi</span>
              <span className="preview-tag">❄️ A/C</span>
              <span className="preview-tag">☕ Breakfast</span>
              {room?.room_type?.toUpperCase() === 'SUITE' && (
                <span className="preview-tag">🏊 Pool</span>
              )}
            </div>
          </div>
        </div>

        {/* Right – Form */}
        <div className="bookroom-form-panel">
          <button className="form-back-btn" onClick={() => navigate('/rooms')}>
            ← Back to Rooms
          </button>

          <div className="form-heading-eyebrow">Step 1 of 1</div>
          <h1 className="form-heading">Complete Your<br />Reservation</h1>
          <p className="form-subtext">Select your stay dates and confirm booking.</p>

          <div className="room-id-pill">
            🏨 Room #{roomId}
            {room && ` · ${room.room_type} · Rs. ${room.price_per_night?.toLocaleString()}/night`}
          </div>

          <form onSubmit={handleBooking}>
            <div className="field-group">
              <label className="field-label">Check-in Date</label>
              <input
                type="date"
                className="field-input"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="field-group">
              <label className="field-label">Check-out Date</label>
              <input
                type="date"
                className="field-input"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Live summary */}
            {nights > 0 && room && (
              <div className="booking-summary">
                <div className="summary-row">
                  <span>Room type</span>
                  <strong>{room.room_type}</strong>
                </div>
                <div className="summary-row">
                  <span>Duration</span>
                  <strong>{nights} {nights === 1 ? 'night' : 'nights'}</strong>
                </div>
                <div className="summary-row">
                  <span>Rate</span>
                  <strong>Rs. {room.price_per_night.toLocaleString()} / night</strong>
                </div>
                <hr className="summary-divider" />
                <div className="summary-total">
                  <span>Total Estimate</span>
                  <span>Rs. {total}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn-confirm"
              disabled={loading}
            >
              {loading ? 'Confirming…' : '✦ Confirm Booking'}
            </button>
          </form>

          <p className="secure-note">🔒 Secure booking · No hidden charges</p>
        </div>
      </div>
    </>
  );
}

export default BookRoom;