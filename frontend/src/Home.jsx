import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#0a0e1a', minHeight: '100vh' }}>

            {/* ── Hero ── */}
            <div style={{
                position: 'relative',
                backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 20px',
                overflow: 'hidden',
            }}>
                {/* Overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(10,14,26,0.5) 0%, rgba(10,14,26,0.82) 100%)'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(201,168,76,0.12)',
                        border: '1px solid rgba(201,168,76,0.4)',
                        color: '#c9a84c',
                        padding: '7px 20px',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '1.5rem',
                        backdropFilter: 'blur(8px)',
                    }}>
                        ✦ 5-Star Luxury Experience in Sri Lanka
                    </span>

                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                        fontWeight: '700',
                        color: '#ffffff',
                        maxWidth: '820px',
                        lineHeight: '1.2',
                        marginBottom: '1.2rem',
                    }}>
                        Discover Your Perfect Stay at{' '}
                        <span style={{ color: '#c9a84c', fontFamily: "'Cinzel Decorative', serif" }}>VELORA</span> Hotels
                    </h1>

                    <p style={{
                        fontSize: '1.05rem',
                        maxWidth: '560px',
                        color: 'rgba(255,255,255,0.65)',
                        marginBottom: '2.2rem',
                        lineHeight: 1.7,
                    }}>
                        Book luxury single rooms, spacious double rooms, and ocean-view suites at the best rates with instant confirmation.
                    </p>

                    <button
                        onClick={() => navigate('/rooms')}
                        style={{
                            background: 'linear-gradient(135deg, #c9a84c, #e8c97e)',
                            color: '#0a0e1a',
                            border: 'none',
                            padding: '15px 36px',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: '0.04em',
                            boxShadow: '0 8px 28px rgba(201,168,76,0.4)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 14px 36px rgba(201,168,76,0.55)'; }}
                        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 28px rgba(201,168,76,0.4)'; }}
                    >
                        Explore Available Rooms →
                    </button>
                </div>
            </div>

            {/* ── Features ── */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: '700', marginBottom: '0.7rem' }}>
                        ✦ Why Choose Us
                    </p>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                        fontWeight: '700',
                        color: '#f1f5f9',
                    }}>
                        Why Book With <span style={{ color: '#c9a84c' }}>Velora</span>?
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { icon: '🏊‍♂️', title: 'Infinity Pool & Spa', desc: 'Relax at our rooftop infinity pool with panoramic views and complimentary spa access.' },
                        { icon: '🍽️',   title: 'Fine Dining & Buffet', desc: 'Enjoy authentic Sri Lankan and international cuisine prepared by world-class chefs.' },
                        { icon: '⚡',   title: 'Instant Cancellation', desc: 'Plans changed? Cancel your booking anytime with a single click from your dashboard.' },
                    ].map(({ icon, title, desc }) => (
                        <div
                            key={title}
                            style={{
                                background: 'linear-gradient(145deg, #111827, #0f1724)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                padding: '2rem 1.75rem',
                                borderRadius: '20px',
                                textAlign: 'center',
                                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.45)';
                                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                            }}
                        >
                            <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>{icon}</div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.7rem' }}>{title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.7 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CTA strip ── */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.03))',
                border: '1px solid rgba(201,168,76,0.12)',
                borderLeft: 'none', borderRight: 'none',
                padding: '3.5rem 2rem',
                textAlign: 'center',
            }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.7rem' }}>
                    Ready for a Luxury Escape?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '1.8rem', fontSize: '0.92rem' }}>
                    Browse our curated rooms and reserve yours in seconds.
                </p>
                <button
                    onClick={() => navigate('/rooms')}
                    style={{
                        background: 'linear-gradient(135deg, #c9a84c, #e8c97e)',
                        color: '#0a0e1a', border: 'none',
                        padding: '13px 32px', borderRadius: '50px',
                        fontWeight: '800', fontSize: '0.95rem',
                        cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                        boxShadow: '0 6px 22px rgba(201,168,76,0.35)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 30px rgba(201,168,76,0.5)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 6px 22px rgba(201,168,76,0.35)'; }}
                >
                    View All Rooms →
                </button>
            </div>
        </div>
    );
}

export default Home;