import { useRef } from 'react';

const Home = () => {
  const rippleRef = useRef(null);

  // Updates the CSS directly - ZERO React lag!
  const handleMouseMove = (e) => {
    if (!rippleRef.current) return;
    const rect = rippleRef.current.parentElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    rippleRef.current.style.setProperty('--mouse-x', `${x}%`);
    rippleRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <main>
      <section 
        className="hero" 
        onMouseMove={handleMouseMove}
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/9.jpg')" }}
      >
        <div className="ripple-overlay" ref={rippleRef}></div>
        <div className="floating-elements">
          <div className="floating-element element-1"><i className="fas fa-umbrella-beach fa-3x" style={{ color: 'var(--azure-blue)' }}></i></div>
          <div className="floating-element element-2"><i className="fas fa-cocktail fa-2x" style={{ color: 'var(--blue-grotto)' }}></i></div>
          <div className="floating-element element-3"><i className="fas fa-ship fa-3x" style={{ color: 'var(--azure-blue)' }}></i></div>
          <div className="floating-element element-4"><i className="fas fa-sun fa-2x" style={{ color: 'var(--blue-grotto)' }}></i></div>
        </div>
        <div className="hero-content">
          <h2>Paradise Awaits</h2>
          <p>Immerse yourself in tranquil luxury at the ocean's edge</p>
          <a href="#services" className="cta-button">Discover Luxury <i className="fas fa-chevron-right"></i></a>
        </div>
      </section>

      <section className="welcome-message">
        <div className="welcome-content">
          <h2>Welcome to Royal Beach Hotels and Spa</h2>
          <p>Where azure waters meet golden sands and luxury knows no bounds. Indulge in a harmonious blend of beachside serenity and world-class amenities.</p>
        </div>
      </section>

      <section className="gallery">
        <h2>Experience Paradise</h2>
        <div className="gallery-grid">
          <div className="gallery-item"><img src="/4.jpg" alt="Beachfront Panorama" /><div className="gallery-overlay"><h3>Pristine Shorelines</h3></div></div>
          <div className="gallery-item"><img src="/26.jpg" alt="Ocean Sunset" /><div className="gallery-overlay"><h3>Breathtaking Sunsets</h3></div></div>
          <div className="gallery-item"><img src="/25.jpg" alt="Coastal Landscape" /><div className="gallery-overlay"><h3>Coastal Splendor</h3></div></div>
          <div className="gallery-item"><img src="/28.jpg" alt="Tropical Paradise" /><div className="gallery-overlay"><h3>Tropical Haven</h3></div></div>
        </div>
      </section>

      <section id="services" className="services">
        <h2>Royal Experiences</h2>
        <div className="services-grid">
          <div className="service">
            <img src="/11.jpg" alt="Beachfront Dining" />
            <div className="service-content">
              <h3>Ocean View Dining</h3>
              <p>Indulge in culinary masterpieces created from the freshest local ingredients while overlooking the endless blue horizon.</p>
            </div>
          </div>
          <div className="service">
            <img src="/17.jpg" alt="Wellness Spa" />
            <div className="service-content">
              <h3>Rejuvenating Spa</h3>
              <p>Surrender to the healing touch of our expert therapists with treatments inspired by ancient coastal traditions.</p>
            </div>
          </div>
          <div className="service">
            <img src="/31.jpg" alt="Water Adventures" />
            <div className="service-content">
              <h3>Ocean Adventures</h3>
              <p>Dive into excitement with our range of water activities from gentle snorkeling to adrenaline-pumping parasailing.</p>
            </div>
          </div>
          <div className="service">
            <img src="/3.jpg" alt="Event Venues" />
            <div className="service-content">
              <h3>Beachfront Celebrations</h3>
              <p>Create timeless memories with spectacular events set against the backdrop of our pristine beaches.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;