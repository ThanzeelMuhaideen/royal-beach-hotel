import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [stats, setStats] = useState({ years: 0, rooms: 0, awards: 0, guests: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Hero Ripple Effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Scroll Number Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateValue('years', 13, 1000);
          animateValue('rooms', 180, 1500);
          animateValue('awards', 12, 1000);
          animateValue('guests', 25, 1500);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [hasAnimated]);

  const animateValue = (key, target, duration) => {
    let start = 0;
    const increment = target / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setStats((prev) => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setStats((prev) => ({ ...prev, [key]: Math.floor(start) }));
      }
    }, 30);
  };

  return (
    <main>
      {/* Hero Video Section */}
      <section className="about-hero-video" onMouseMove={handleMouseMove}>
        <video className="hero-video" autoPlay muted loop playsInline>
          <source src="/beach-waves.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element element-1"><i className="fas fa-water fa-3x" style={{color: 'var(--blue-grotto)'}}></i></div>
          <div className="floating-element element-2"><i className="fas fa-leaf fa-2x" style={{color: 'var(--shallow-water)'}}></i></div>
          <div className="floating-element element-3"><i className="fas fa-compass fa-3x" style={{color: 'var(--azure-blue)'}}></i></div>
          <div className="floating-element element-4"><i className="fas fa-tint fa-2x" style={{color: 'var(--blue-grotto)'}}></i></div>
        </div>
        <div className="ripple-overlay" style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}></div>
        <div className="hero-content">
          <h2>Our Story</h2>
          <p>Experience the journey of Royal Beach Hotels and Spa, where luxury meets the timeless beauty of the ocean</p>
          <a href="#story" className="cta-button">Discover More</a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-calendar-alt"></i></div>
              <div className="stat-number">{stats.years}</div>
              <p>Years of Excellence</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-bed"></i></div>
              <div className="stat-number">{stats.rooms}</div>
              <p>Luxury Rooms</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-award"></i></div>
              <div className="stat-number">{stats.awards}</div>
              <p>Industry Awards</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-smile"></i></div>
              <div className="stat-number">{stats.guests}K+</div>
              <p>Happy Guests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="about-story">
        <div className="container" style={{display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center'}}>
          <div className="story-image" style={{flex: '1', minWidth: '300px'}}>
            <img src="/19.jpg" alt="Royal Beach Resort" style={{width: '100%', borderRadius: '10px'}} />
          </div>
          <div className="story-text" style={{flex: '1', minWidth: '300px'}}>
            <h2>A Legacy of Coastal Elegance</h2>
            <p>Since 2010, Royal Beach Hotels and Spa has been a sanctuary of relaxation where the rhythm of ocean waves sets the tone for an unforgettable escape. Our beachfront paradise combines natural splendor with refined luxury to create experiences that linger in your memories long after the sand has been brushed from your feet.</p>
            <p>What began as a boutique seaside retreat has blossomed into a premier destination for travelers seeking authentic coastal luxury. Our commitment to preserving the natural beauty that surrounds us while providing exceptional service is at the heart of everything we do.</p>
            <p>Through the years, we've thoughtfully expanded our offerings while maintaining the intimate connection to the sea that makes our property special. Each accommodation has been designed to invite the outside in, creating spaces where you can truly unwind to the sounds of the ocean.</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-container">
        <div className="timeline-header">
          <h2>Our Evolution</h2>
          <p>A journey of growth and transformation through the years</p>
        </div>
        <div className="timeline">
          <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>2010</h3><p>Royal Beach Hotels and Spa opens with an intimate collection of oceanfront rooms</p></div></div>
          <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>2013</h3><p>Introduction of our signature spa featuring treatments inspired by sea elements</p></div></div>
          <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>2016</h3><p>Launch of our beachfront pavilion for weddings and special celebrations</p></div></div>
          <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>2019</h3><p>Awarded prestigious five-star status and eco-friendly certification</p></div></div>
          <div className="timeline-item"><div className="timeline-dot"></div><div className="timeline-content"><h3>2022</h3><p>Complete renewal of all accommodations and introduction of private beach villas</p></div></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className="values-grid">
          <div className="value-card"><div className="value-icon"><i className="fas fa-star"></i></div><h3>Excellence</h3><p>We strive for excellence in every detail, ensuring each guest experiences the highest standards of service and comfort.</p></div>
          <div className="value-card"><div className="value-icon"><i className="fas fa-leaf"></i></div><h3>Sustainability</h3><p>We are committed to preserving the natural beauty of our coastal environment through eco-friendly practices.</p></div>
          <div className="value-card"><div className="value-icon"><i className="fas fa-heart"></i></div><h3>Authenticity</h3><p>We create genuine experiences that reflect the true spirit of our destination and culture.</p></div>
        </div>
      </section>
      

      {/* Team Section */}
      <section className="team-section">
        <div className="team-header" style={{marginBottom: '40px'}}>
          <h2>Our Leadership Team</h2>
          <p>Meet the passionate individuals behind Royal Beach's success</p>
        </div>
        <div className="team-grid">
          <div className="team-card"><div className="team-image"><img src="/27.jpg" alt="Aravinda Perera" /></div><div className="team-info"><h3>Aravinda Perera</h3><p>General Manager</p></div></div>
          <div className="team-card"><div className="team-image"><img src="/16.jpg" alt="Chaminda Fernando" /></div><div className="team-info"><h3>Chaminda Fernando</h3><p>Executive Chef</p></div></div>
          <div className="team-card"><div className="team-image"><img src="/10.jpg" alt="Malini Gunawardena" /></div><div className="team-info"><h3>Malini Gunawardena</h3><p>Spa Director</p></div></div>
          <div className="team-card"><div className="team-image"><img src="/14.jpg" alt="Dinesh Jayawardena" /></div><div className="team-info"><h3>Dinesh Jayawardena</h3><p>Head of Guest Relations</p></div></div>
        </div>
      </section>

      {/* Mission Statement Section */}
        <section className="mission-section">
            <div className="mission-content">
                <i className="fas fa-compass mission-icon"></i>
                <h2>Our Promise</h2>
                <p>To create a sanctuary where the beauty of the ocean inspires every experience, where sustainable luxury allows our natural environment to thrive, and where every guest departs with memories as timeless as the sea itself. We are committed to preserving the coastal treasures that surround us while providing a haven of relaxation and rejuvenation.</p>
                <a href="/contact" className="btn-light">Connect With Us</a>
            </div>
        </section>
    </main>
  );
};



export default About;