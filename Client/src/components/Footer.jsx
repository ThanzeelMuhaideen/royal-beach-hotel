import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <div className="footer-left">
                <div className="footer-logo">
                    <img src="/1.png" alt="Royal Beach Hotels and Spa Logo" />
                    <h3>Royal Beach Hotels and Spa</h3>
                </div>
                <div className="contact-info">
                    <h3>Contact Information</h3>
                    <p><i className="fas fa-map-marker-alt"></i> 42 Beach Road, Unawatuna, Galle, Sri Lanka</p>
                    <p><i className="fas fa-phone-alt"></i> +94 91 222 4500</p>
                    <p><i className="fas fa-envelope"></i> info@royalbeachhotel.lk</p>
                    <p><i className="fas fa-clock"></i> Reception: 24/7</p>
                </div>
            </div>
            <div className="footer-right">
                <div className="social-media">
                    <h3>Connect With Us</h3>
                    <div className="social-links">
                        <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-pinterest-p"></i></a>
                    </div>
                </div>
                <div className="newsletter">
                    <h3>Stay Informed</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your Email Address" required />
                        <button type="submit"><i className="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
        <div className="copyright">
            <p>&copy; 2024 Royal Beach Hotels and Spa. All Rights Reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;