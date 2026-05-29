import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Facilities = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSpotlight, setCurrentSpotlight] = useState(0);
  const rippleRef = useRef(null);

  // Spotlight Carousel Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSpotlight((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const isVisible = (category) => activeFilter === 'all' || activeFilter === category;

  // Lag-free Ripple Effect
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
      {/* Hero Section */}
      <section 
        className="facilities-hero" 
        onMouseMove={handleMouseMove}
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/8.jpg')" }}
      >
        <div className="ripple-overlay" ref={rippleRef}></div>
        <div className="floating-elements">
          <div className="floating-element element-1"><i className="fas fa-swimming-pool fa-3x" style={{color: 'var(--blue-grotto)'}}></i></div>
          <div className="floating-element element-2"><i className="fas fa-spa fa-2x" style={{color: 'var(--azure-blue)'}}></i></div>
          <div className="floating-element element-3"><i className="fas fa-utensils fa-2x" style={{color: 'var(--shallow-water)'}}></i></div>
          <div className="floating-element element-4"><i className="fas fa-bed fa-3x" style={{color: 'var(--blue-grotto)'}}></i></div>
        </div>
        <div className="hero-content">
          <h2>Seaside Indulgence</h2>
          <p>Discover our exceptional amenities designed for your perfect coastal retreat</p>
          <a href="#facilities-showcase" className="cta-button">Explore Our World <i className="fas fa-compass"></i></a>
        </div>
      </section>

      {/* Facilities Spotlight Carousel */}
      <section id="facilities-showcase" className="facilities-spotlight">
        <h2 className="section-title"><i className="fas fa-star"></i> Featured Experiences</h2>
        <div className="spotlight-carousel">
          <div className="spotlight-track">
            <div className={`spotlight-item ${currentSpotlight === 0 ? 'active' : ''}`}>
              <div className="spotlight-image"><img src="/33.jpg" alt="Infinity Pool" /></div>
              <div className="spotlight-content">
                <h3>Infinity Edge Pool</h3>
                <p>Where the horizon meets the water in perfect harmony</p>
              </div>
            </div>
            <div className={`spotlight-item ${currentSpotlight === 1 ? 'active' : ''}`}>
              <div className="spotlight-image"><img src="/22.jpg" alt="Azure Ballroom" /></div>
              <div className="spotlight-content">
                <h3>Azure Ballroom</h3>
                <p>Create unforgettable moments in our elegant event space</p>
              </div>
            </div>
            <div className={`spotlight-item ${currentSpotlight === 2 ? 'active' : ''}`}>
              <div className="spotlight-image"><img src="/28.jpg" alt="Beachfront Villa" /></div>
              <div className="spotlight-content">
                <h3>Beachfront Villa</h3>
                <p>Luxury living just steps from the ocean's edge</p>
              </div>
            </div>
          </div>
          <div className="spotlight-controls">
            <button className="spotlight-prev" onClick={() => setCurrentSpotlight(prev => prev === 0 ? 2 : prev - 1)}><i className="fas fa-chevron-left"></i></button>
            <div className="spotlight-indicators">
              <span className={`indicator ${currentSpotlight === 0 ? 'active' : ''}`} onClick={() => setCurrentSpotlight(0)}></span>
              <span className={`indicator ${currentSpotlight === 1 ? 'active' : ''}`} onClick={() => setCurrentSpotlight(1)}></span>
              <span className={`indicator ${currentSpotlight === 2 ? 'active' : ''}`} onClick={() => setCurrentSpotlight(2)}></span>
            </div>
            <button className="spotlight-next" onClick={() => setCurrentSpotlight(prev => prev === 2 ? 0 : prev + 1)}><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      {/* Facilities Filter and Grid */}
      <section className="facilities-catalog">
        <div className="facilities-filter">
          <h2>Explore Our Facilities</h2>
          <p>Filter by category to discover the perfect amenities for your stay</p>
          
          <div className="filter-buttons">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}><i className="fas fa-th-large"></i> All Facilities</button>
            <button className={`filter-btn ${activeFilter === 'stay' ? 'active' : ''}`} onClick={() => setActiveFilter('stay')}><i className="fas fa-bed"></i> Accommodations</button>
            <button className={`filter-btn ${activeFilter === 'dine' ? 'active' : ''}`} onClick={() => setActiveFilter('dine')}><i className="fas fa-utensils"></i> Dining</button>
            <button className={`filter-btn ${activeFilter === 'relax' ? 'active' : ''}`} onClick={() => setActiveFilter('relax')}><i className="fas fa-spa"></i> Wellness</button>
            <button className={`filter-btn ${activeFilter === 'play' ? 'active' : ''}`} onClick={() => setActiveFilter('play')}><i className="fas fa-swimming-pool"></i> Recreation</button>
            <button className={`filter-btn ${activeFilter === 'celebrate' ? 'active' : ''}`} onClick={() => setActiveFilter('celebrate')}><i className="fas fa-glass-cheers"></i> Events</button>
          </div>
        </div>

        <div className="facilities-grid">
          {/* Accommodations */}
          <div className={`facility-card ${isVisible('stay') ? 'visible' : ''}`} style={{display: isVisible('stay') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/2.jpg" alt="Sea Breeze Deluxe Room" /><div className="card-tag">Stay</div></div>
            <div className="card-body">
              <h3>Sea Breeze Deluxe Room</h3>
              <p>Airy, elegant rooms with private balconies overlooking the azure waters.</p>
              <div className="card-meta"><span><i className="fas fa-ruler-combined"></i> 45 m²</span><span><i className="fas fa-user-friends"></i> 2 Guests</span></div>
              <a href="#" className="card-btn">Details</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('stay') ? 'visible' : ''}`} style={{display: isVisible('stay') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/7.jpg" alt="Royal Ocean Suite" /><div className="card-tag">Stay</div></div>
            <div className="card-body">
              <h3>Royal Ocean Suite</h3>
              <p>Luxurious suites with separate living areas and panoramic sea views.</p>
              <div className="card-meta"><span><i className="fas fa-ruler-combined"></i> 75 m²</span><span><i className="fas fa-user-friends"></i> 3 Guests</span></div>
              <a href="#" className="card-btn">Details</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('stay') ? 'visible' : ''}`} style={{display: isVisible('stay') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/28.jpg" alt="Beachfront Villa" /><div className="card-tag">Stay</div></div>
            <div className="card-body">
              <h3>Beachfront Private Villa</h3>
              <p>Exclusive sanctuaries with private plunge pools and butler service.</p>
              <div className="card-meta"><span><i className="fas fa-ruler-combined"></i> 120 m²</span><span><i className="fas fa-user-friends"></i> 4 Guests</span></div>
              <a href="#" className="card-btn">Details</a>
            </div>
          </div>

          {/* Dining */}
          <div className={`facility-card ${isVisible('dine') ? 'visible' : ''}`} style={{display: isVisible('dine') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/24.jpg" alt="Ocean's Edge Restaurant" /><div className="card-tag">Dine</div></div>
            <div className="card-body">
              <h3>Ocean's Edge Restaurant</h3>
              <p>Fresh seafood and local cuisine with panoramic ocean views.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 07:00-22:30</span><span><i className="fas fa-map-marker-alt"></i> Beachfront</span></div>
              <a href="#" className="card-btn">Menu</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('dine') ? 'visible' : ''}`} style={{display: isVisible('dine') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/26.jpg" alt="Sunset Lounge" /><div className="card-tag">Dine</div></div>
            <div className="card-body">
              <h3>Sunset Lounge</h3>
              <p>Handcrafted cocktails and fine wines with stunning sunset views.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 16:00-00:00</span><span><i className="fas fa-map-marker-alt"></i> Rooftop</span></div>
              <a href="#" className="card-btn">Menu</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('dine') ? 'visible' : ''}`} style={{display: isVisible('dine') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/11.jpg" alt="Spice Route" /><div className="card-tag">Dine</div></div>
            <div className="card-body">
              <h3>Spice Route</h3>
              <p>Authentic Sri Lankan cuisine with a contemporary twist.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 18:30-22:30</span><span><i className="fas fa-map-marker-alt"></i> Garden</span></div>
              <a href="#" className="card-btn">Menu</a>
            </div>
          </div>

          {/* Wellness */}
          <div className={`facility-card ${isVisible('relax') ? 'visible' : ''}`} style={{display: isVisible('relax') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/17.jpg" alt="Ocean Therapy Spa" /><div className="card-tag">Relax</div></div>
            <div className="card-body">
              <h3>Ocean Therapy Spa</h3>
              <p>Rejuvenating treatments inspired by ancient healing traditions.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 09:00-20:00</span><span><i className="fas fa-map-marker-alt"></i> Oceanview Wing</span></div>
              <a href="#" className="card-btn">Treatments</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('relax') ? 'visible' : ''}`} style={{display: isVisible('relax') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/34.jpg" alt="Meditation Pavilion" /><div className="card-tag">Relax</div></div>
            <div className="card-body">
              <h3>Serenity Meditation Pavilion</h3>
              <p>Peaceful sanctuary for yoga and mindfulness overlooking the sea.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 06:00-19:00</span><span><i className="fas fa-map-marker-alt"></i> Cliff Edge</span></div>
              <a href="#" className="card-btn">Schedule</a>
            </div>
          </div>

          {/* Recreation */}
          <div className={`facility-card ${isVisible('play') ? 'visible' : ''}`} style={{display: isVisible('play') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/33.jpg" alt="Infinity Pool" /><div className="card-tag">Play</div></div>
            <div className="card-body">
              <h3>Infinity Edge Pool</h3>
              <p>Temperature-controlled waters that blend seamlessly with the horizon.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 07:00-20:00</span><span><i className="fas fa-umbrella-beach"></i> Poolside Service</span></div>
              <a href="#" className="card-btn">Reserve Cabana</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('play') ? 'visible' : ''}`} style={{display: isVisible('play') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/31.jpg" alt="Water Sports Center" /><div className="card-tag">Play</div></div>
            <div className="card-body">
              <h3>Water Sports Center</h3>
              <p>Adventures from gentle snorkeling to adrenaline-pumping parasailing.</p>
              <div className="card-meta"><span><i className="fas fa-clock"></i> 09:00-17:00</span><span><i className="fas fa-life-ring"></i> Expert Instructors</span></div>
              <a href="#" className="card-btn">Activities</a>
            </div>
          </div>

          {/* Events */}
          <div className={`facility-card ${isVisible('celebrate') ? 'visible' : ''}`} style={{display: isVisible('celebrate') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/22.jpg" alt="Azure Ballroom" /><div className="card-tag">Celebrate</div></div>
            <div className="card-body">
              <h3>Azure Ballroom</h3>
              <p>Majestic venue with panoramic ocean views for elegant celebrations.</p>
              <div className="card-meta"><span><i className="fas fa-users"></i> Up to 300 Guests</span><span><i className="fas fa-vector-square"></i> 5000 sq ft</span></div>
              <a href="#" className="card-btn">Inquire</a>
            </div>
          </div>
          
          <div className={`facility-card ${isVisible('celebrate') ? 'visible' : ''}`} style={{display: isVisible('celebrate') ? 'block' : 'none'}}>
            <div className="card-image"><img src="/3.jpg" alt="Beachfront Pavilion" /><div className="card-tag">Celebrate</div></div>
            <div className="card-body">
              <h3>Tides Beachfront Pavilion</h3>
              <p>Open-air venue set directly on golden sands for magical gatherings.</p>
              <div className="card-meta"><span><i className="fas fa-users"></i> Up to 150 Guests</span><span><i className="fas fa-umbrella-beach"></i> Direct Beach Access</span></div>
              <a href="#" className="card-btn">Inquire</a>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="virtual-tour-section">
        <div className="tour-content">
          <div className="tour-text">
            <h2>Take a Virtual Tour</h2>
            <p>Experience the Royal Beach facilities from anywhere in the world with our interactive 360° tour.</p>
            <p>Explore our rooms, restaurants, spa, and recreational areas as if you were already here with us.</p>
            <a href="#" className="tour-btn"><i className="fas fa-vr-cardboard"></i> Start 360° Tour</a>
          </div>
          <div className="tour-preview">
            <img src="/13.jpg" alt="Virtual Tour Preview" />
            <div className="tour-overlay"><div className="play-button"><i className="fas fa-play"></i></div></div>
          </div>
        </div>
      </section>

      {/* Guest Support Section (RESTORED) */}
      <section className="support-section">
        <div className="support-container">
          <h2>Have Questions About Our Facilities?</h2>
          <p>Our concierge team is available 24/7 to assist you with any inquiries</p>
          <div className="support-options">
            <a href="tel:+94912224500" className="support-option">
              <i className="fas fa-phone-alt"></i>
              <span>Call Us</span>
              <small>+94 91 222 4500</small>
            </a>
            <a href="#" className="support-option">
              <i className="fas fa-comments"></i>
              <span>Live Chat</span>
              <small>Available Now</small>
            </a>
            <Link to="/contact" className="support-option">
              <i className="fas fa-envelope"></i>
              <span>Email Us</span>
              <small>Quick Response</small>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Facilities;