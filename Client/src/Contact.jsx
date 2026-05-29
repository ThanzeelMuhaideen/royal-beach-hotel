import { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle Hero Ripple Effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Testimonial Auto-Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // --- DATABASE SUBMISSION HANDLERS ---
  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // We only send the fields that exist in your Prisma schema
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    };
    
    try {
      await axios.post('https://royal-beach-hotel-api.vercel.app/api/general-inquiry', payload);
      alert('Your message has been sent successfully!');
      e.target.reset();
    } catch (error) {
      alert('Failed to send message. Is the backend running?');
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await axios.post('http://localhost:5000/api/reservations', data);
      alert('Reservation requested successfully! We will contact you soon.');
      e.target.reset();
    } catch (error) {
      alert('Failed to send reservation. Is the backend running?');
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="contact-hero" 
        onMouseMove={handleMouseMove}
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/23.jpg')" }}
      >
        <div className="ripple-overlay" style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}></div>
        <div className="floating-elements">
          <div className="floating-element element-1"><i className="fas fa-envelope fa-3x" style={{ color: 'var(--azure-blue)' }}></i></div>
          <div className="floating-element element-2"><i className="fas fa-phone fa-2x" style={{ color: 'var(--blue-grotto)' }}></i></div>
          <div className="floating-element element-3"><i className="fas fa-map-marker-alt fa-3x" style={{ color: 'var(--azure-blue)' }}></i></div>
          <div className="floating-element element-4"><i className="fas fa-comment fa-2x" style={{ color: 'var(--blue-grotto)' }}></i></div>
        </div>
        <div className="hero-content">
          <h2>We're Here For You</h2>
          <p>Let our attentive team assist with your inquiries and special requests</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="contact-quick-links">
        <div className="quick-links-container">
          <a href="#forms" onClick={() => setActiveTab('general')} className="quick-link"><i className="fas fa-info-circle"></i><span>General Inquiries</span></a>
          <a href="#forms" onClick={() => setActiveTab('reservation')} className="quick-link"><i className="fas fa-calendar-check"></i><span>Reservations</span></a>
          <a href="#forms" onClick={() => setActiveTab('event')} className="quick-link"><i className="fas fa-glass-cheers"></i><span>Event Planning</span></a>
          <a href="#find-us" className="quick-link"><i className="fas fa-map-marked-alt"></i><span>Find Us</span></a>
        </div>
      </section>

      <section className="contact-grid-container" id="forms">
        {/* Contact Info Panel  */}
        <div className="contact-info-panel">
          <div className="info-panel-content">
            <h2><i className="fas fa-address-card"></i> Connect With Us</h2>
            
            <div className="contact-method">
              <div className="method-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="method-details">
                <h3>Our Location</h3>
                <p>42 Beach Road<br/>Unawatuna, Galle<br/>Sri Lanka</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon"><i className="fas fa-phone-alt"></i></div>
              <div className="method-details">
                <h3>Phone Numbers</h3>
                <p>Main: <a href="tel:+94912224500">+94 91 222 4500</a></p>
                <p>Reservations: <a href="tel:+94912224501">+94 91 222 4501</a></p>
                <p>Events: <a href="tel:+94912224502">+94 91 222 4502</a></p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon"><i className="fas fa-envelope"></i></div>
              <div className="method-details">
                <h3>Email Addresses</h3>
                <p>General: <a href="mailto:info@royalbeachhotel.lk">info@royalbeachhotel.lk</a></p>
                <p>Reservations: <a href="mailto:reservations@royalbeachhotel.lk">reservations@royalbeachhotel.lk</a></p>
                <p>Events: <a href="mailto:events@royalbeachhotel.lk">events@royalbeachhotel.lk</a></p>
              </div>
            </div>

            {/* Restored Hours of Operation */}
            <div className="contact-method">
              <div className="method-icon"><i className="fas fa-clock"></i></div>
              <div className="method-details">
                <h3>Hours of Operation</h3>
                <p>Reception: 24/7</p>
                <p>Reservations: 8:00 AM - 10:00 PM</p>
                <p>Concierge: 7:00 AM - 11:00 PM</p>
              </div>
            </div>

            {/* Restored Social Media */}
            <div className="social-contact">
              <h3>Connect on Social Media</h3>
              <div className="social-contact-links">
                <a href="#" className="social-contact-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-contact-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-contact-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-contact-icon"><i className="fab fa-pinterest-p"></i></a>
              </div>
            </div>

          </div>
        </div>
        
        {/* Forms Panel */}
        <div className="contact-form-panel">
          <div className="form-tabs">
            <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General Inquiry</button>
            <button className={`tab-btn ${activeTab === 'reservation' ? 'active' : ''}`} onClick={() => setActiveTab('reservation')}>Reservation</button>
            <button className={`tab-btn ${activeTab === 'event' ? 'active' : ''}`} onClick={() => setActiveTab('event')}>Event Planning</button>
          </div>
          
          {/* GENERAL INQUIRY TAB */}
          <div className={`tab-content ${activeTab === 'general' ? 'active' : ''}`}>
            <h2>Send Us a Message</h2>
            <p>We're here to answer any questions you might have about your stay.</p>
            <form className="enhanced-form" onSubmit={handleGeneralSubmit}>
              <div className="form-row">
                <div className="form-group"><label><i className="fas fa-user"></i> Full Name</label><input type="text" name="name" placeholder="Your name" required /></div>
                <div className="form-group"><label><i className="fas fa-envelope"></i> Email Address</label><input type="email" name="email" placeholder="Your email" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label><i className="fas fa-phone"></i> Contact Number</label><input type="tel" name="phone" placeholder="Your phone number" /></div>
                <div className="form-group"><label><i className="fas fa-tag"></i> Subject</label><input type="text" name="subject" placeholder="What's your inquiry about?" required /></div>
              </div>
              
              {/* Restored Radio Buttons */}
              <div className="form-group">
                <label><i className="fas fa-users"></i> Have You Stayed With Us Before?</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input type="radio" id="new-guest" name="guest-type" value="new" defaultChecked />
                    <label htmlFor="new-guest">First-time Guest</label>
                  </div>
                  <div className="radio-option">
                    <input type="radio" id="returning-guest" name="guest-type" value="returning" />
                    <label htmlFor="returning-guest">Returning Guest</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label><i className="fas fa-comment"></i> Your Message</label>
                <textarea name="message" rows="5" placeholder="Tell us how we can help you..." required></textarea>
              </div>
              <button type="submit" className="submit-btn"><i className="fas fa-paper-plane"></i> Send Message</button>
            </form>
          </div>
          
          {/* RESERVATION TAB */}
          <div className={`tab-content ${activeTab === 'reservation' ? 'active' : ''}`}>
            <h2>Make a Reservation</h2>
            <p>Let us help you book your perfect coastal getaway.</p>
            <form className="enhanced-form" onSubmit={handleReservationSubmit}>
              <div className="form-row">
                <div className="form-group"><label><i className="fas fa-user"></i> Full Name</label><input type="text" name="name" placeholder="Your name" required /></div>
                <div className="form-group"><label><i className="fas fa-envelope"></i> Email Address</label><input type="email" name="email" placeholder="Your email" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label><i className="fas fa-calendar-check"></i> Check-in Date</label><input type="date" name="checkin" required /></div>
                <div className="form-group"><label><i className="fas fa-calendar-times"></i> Check-out Date</label><input type="date" name="checkout" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label><i className="fas fa-user"></i> Adults</label>
                  <select name="adults" required><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5+">5+</option></select>
                </div>
                <div className="form-group">
                  <label><i className="fas fa-child"></i> Children</label>
                  <select name="children" required><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4+">4+</option></select>
                </div>
              </div>
              <div className="form-group">
                <label><i className="fas fa-bed"></i> Preferred Accommodation</label>
                <select name="roomType" required>
                  <option value="">Select an accommodation type</option>
                  <option value="standard">Sea Breeze Deluxe Room</option>
                  <option value="premium">Royal Ocean Suite</option>
                  <option value="villa">Beachfront Private Villa</option>
                </select>
              </div>
              <div className="form-group">
                <label><i className="fas fa-concierge-bell"></i> Special Requests</label>
                <textarea name="specialRequests" rows="3" placeholder="Any special requests or preferences?"></textarea>
              </div>
              <button type="submit" className="submit-btn"><i className="fas fa-check-circle"></i> Request Reservation</button>
            </form>
          </div>

          {/* EVENT TAB */}
          <div className={`tab-content ${activeTab === 'event' ? 'active' : ''}`}>
            <h2>Plan Your Event</h2>
            <p>Please email our events team directly at events@royalbeachhotel.lk to begin planning your spectacular beachfront celebration!</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2><i className="fas fa-quote-left"></i> What Our Guests Say</h2>
          <div className="testimonials-slider">
            <div className={`testimonial-slide ${currentSlide === 0 ? 'active' : ''}`}>
              <div className="testimonial-content">
                <p>"The staff at Royal Beach was incredibly responsive to all our needs. From the initial inquiry to our final day, the communication was exceptional!"</p>
                <div className="testimonial-author"><span className="author-name">Sarah Williams</span><span className="author-location" style={{fontSize: '0.9rem', color: '#666'}}>United Kingdom</span></div>
              </div>
            </div>
            <div className={`testimonial-slide ${currentSlide === 1 ? 'active' : ''}`}>
              <div className="testimonial-content">
                <p>"Planning our wedding from overseas was so easy thanks to the wonderful event team. They were prompt with replies and attentive to every detail."</p>
                <div className="testimonial-author"><span className="author-name">James & Emily Reynolds</span><span className="author-location" style={{fontSize: '0.9rem', color: '#666'}}>Australia</span></div>
              </div>
            </div>
            <div className={`testimonial-slide ${currentSlide === 2 ? 'active' : ''}`}>
              <div className="testimonial-content">
                <p>"When we had a last-minute change to our reservation, the team accommodated us without hesitation. That level of service is truly remarkable."</p>
                <div className="testimonial-author"><span className="author-name">Michael Chen</span><span className="author-location" style={{fontSize: '0.9rem', color: '#666'}}>Singapore</span></div>
              </div>
            </div>
          </div>
          <div className="testimonial-dots">
            <span className={`dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => setCurrentSlide(0)}></span>
            <span className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => setCurrentSlide(1)}></span>
            <span className={`dot ${currentSlide === 2 ? 'active' : ''}`} onClick={() => setCurrentSlide(2)}></span>
          </div>
        </div>
      </section>

      {/* Restored Map Section */}
      <section className="location-map-section" id="find-us">
        <div className="map-container-wrapper">
          <div className="map-intro">
            <h2><i className="fas fa-map-marked-alt"></i> Find Your Way to Paradise</h2>
            <p>Located on the pristine shores of Unawatuna Beach, our resort is easily accessible from major transportation hubs.</p>
            
            <div className="travel-info">
              <div className="travel-item">
                <i className="fas fa-plane"></i>
                <div className="travel-detail">
                  <h3>From Colombo Airport (CMB)</h3>
                  <p>2.5 hours drive (150 km)</p>
                  <p>Airport transfers available upon request</p>
                </div>
              </div>
              
              <div className="travel-item">
                <i className="fas fa-train"></i>
                <div className="travel-detail">
                  <h3>From Galle Railway Station</h3>
                  <p>15 minutes drive (7 km)</p>
                  <p>Complimentary shuttle service available</p>
                </div>
              </div>
              
              <div className="travel-item">
                <i className="fas fa-car"></i>
                <div className="travel-detail">
                  <h3>By Private Vehicle</h3>
                  <p>Complimentary parking available</p>
                  <p>GPS coordinates: 6.0099° N, 80.2489° E</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="map-container">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.5588050767946!2d80.24788211544877!3d6.0099371249440835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sUnawatuna%20Beach!5e0!3m2!1sen!2sus!4v1649308492156!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, display: 'block' }}
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Beach Resort Location">
            </iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;