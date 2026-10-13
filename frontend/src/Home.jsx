import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <section className="hero-section">
                <h1>
                    Welcome to <span className="highlight">RDB Hotels</span>
                </h1>
                <p>ඔබේ ඊළඟ නවාතැන සඳහා හොඳම room එක සොයාගෙන book කරන්න.</p>
                <div className="hero-actions">
                    <Link to="/rooms" className="btn btn-primary">
                        🏨 View Rooms
                    </Link>
                </div>
            </section>

            <div className="features-grid">
                <div className="feature-card">
                    <span className="icon">🛏️</span>
                    <h3>Premium Rooms</h3>
                    <p>Single, Double සහ Suite rooms ඔබට ගැළපෙන ආකාරයට.</p>
                </div>
                <div className="feature-card">
                    <span className="icon">📅</span>
                    <h3>Easy Booking</h3>
                    <p>සරලව room එකක් select කරලා dates දාලා book කරන්න.</p>
                </div>
                <div className="feature-card">
                    <span className="icon">💰</span>
                    <h3>Best Prices</h3>
                    <p>හොඳම මිල ගණන් වලින් ඔබේ stay එක plan කරන්න.</p>
                </div>
            </div>
        </>
    );
}

export default Home;