import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={isScrolled ? 'solid' : 'transparent'}>
      <nav className={isOpen ? 'open' : ''}>
        <div className="logo">
          <img src="/1.png" alt="Logo" />
          <h1>Royal Beach</h1>
        </div>
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        <ul>
          <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
          <li><Link to="/about"><i className="fas fa-info-circle"></i> About Us</Link></li>
          <li><Link to="/facilities"><i className="fas fa-concierge-bell"></i> Facilities</Link></li>
          <li><Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;