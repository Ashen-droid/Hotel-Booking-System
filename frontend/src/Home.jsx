import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <div style={{
                backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.75)), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '75vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
            }}>
                <span style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600', marginBottom: '15px' }}>
                    ✨ 5-Star Luxury Experience in Sri Lanka
                </span>
                <h1 style={{ fontSize: '3.2rem', fontWeight: '700', maxWidth: '800px', lineHeight: '1.2', marginBottom: '20px' }}>
                    Discover Your Perfect Stay at <span style={{ color: '#38bdf8', fontFamily: "'Cinzel Decorative', serif", fontWeight: '700' }}>VELORA</span> Hotels
                </h1>
                <p style={{ fontSize: '1.15rem', maxWidth: '600px', color: '#cbd5e1', marginBottom: '30px' }}>
                    Book luxury single rooms, spacious double rooms, and ocean-view suites at the best rates with instant confirmation.
                </p>
                <button
                    onClick={() => navigate('/rooms')}
                    className="btn-primary"
                    style={{ fontSize: '1.1rem', padding: '14px 32px', borderRadius: '30px' }}
                >
                    Explore Available Rooms →
                </button>
            </div>

            <div style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2rem' }}>Why Book With Us?</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏊‍♂️</div>
                        <h3 style={{ marginBottom: '10px' }}>Infinity Pool & Spa</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Relax at our rooftop infinity pool with panoramic views and complimentary spa access.</p>
                    </div>

                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🍽️</div>
                        <h3 style={{ marginBottom: '10px' }}>Fine Dining & Buffet</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Enjoy authentic Sri Lankan and international cuisine prepared by world-class chefs.</p>
                    </div>

                    <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⚡</div>
                        <h3 style={{ marginBottom: '10px' }}>Instant Cancellation</h3>
                        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Plans changed? Cancel your booking anytime with a single click from your dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;