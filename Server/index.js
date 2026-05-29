import { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post('http://localhost:5000/api/general-inquiry', data);
      alert('Message sent successfully!');
      e.target.reset();
    } catch (error) { alert('Error sending message'); }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post('http://localhost:5000/api/reservation', data);
      alert('Reservation requested successfully!');
      e.target.reset();
    } catch (error) { alert('Error submitting reservation'); }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post('http://localhost:5000/api/event-inquiry', data);
      alert('Event inquiry submitted!');
      e.target.reset();
    } catch (error) { alert('Error submitting event inquiry'); }
  };

  return (
    <main>
      <section className="contact-hero" onMouseMove={handleMouseMove} style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/23.jpg')" }}>
        <div className="ripple-overlay" style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}></div>
        <div className="hero-content"><h2>We're Here For You</h2></div>
      </section>

      <section className="contact-grid-container">
        <div className="contact-info-panel">
          <div className="info-panel-content">
            <h2>Connect With Us</h2>
            <div className="contact-method"><i className="fas fa-map-marker-alt"></i> 42 Beach Road, Unawatuna, Galle</div>
            <div className="contact-method"><i className="fas fa-phone"></i> +94 91 222 4500</div>
          </div>
        </div>
        
        <div className="contact-form-panel">
          <div className="form-tabs">
            <button className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`} onClick={() => setActiveTab('general')}>General</button>
            <button className={`tab-btn ${activeTab === 'reservation' ? 'active' : ''}`} onClick={() => setActiveTab('reservation')}>Reservation</button>
            <button className={`tab-btn ${activeTab === 'event' ? 'active' : ''}`} onClick={() => setActiveTab('event')}>Events</button>
          </div>
          
          <div className={`tab-content ${activeTab === 'general' ? 'active' : ''}`}>
            <form className="enhanced-form" onSubmit={handleGeneralSubmit}>
              <div className="form-group"><label>Name</label><input type="text" name="name" required /></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" required /></div>
              <div className="form-group"><label>Message</label><textarea name="message" required></textarea></div>
              <button type="submit" className="submit-btn">Send</button>
            </form>
          </div>

          <div className={`tab-content ${activeTab === 'reservation' ? 'active' : ''}`}>
            <form className="enhanced-form" onSubmit={handleReservationSubmit}>
              <div className="form-group"><label>Name</label><input type="text" name="name" required /></div>
              <div className="form-group"><label>Check-in</label><input type="date" name="checkin" required /></div>
              <div className="form-group"><label>Check-out</label><input type="date" name="checkout" required /></div>
              <button type="submit" className="submit-btn">Reserve</button>
            </form>
          </div>

          <div className={`tab-content ${activeTab === 'event' ? 'active' : ''}`}>
            <form className="enhanced-form" onSubmit={handleEventSubmit}>
              <div className="form-group"><label>Name</label><input type="text" name="name" required /></div>
              <div className="form-group"><label>Details</label><textarea name="eventDetails" required></textarea></div>
              <button type="submit" className="submit-btn">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Contact;