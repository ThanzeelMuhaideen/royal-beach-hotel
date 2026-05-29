import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Home';
import About from './About';
import Facilities from './Facilities';
import Contact from './Contact';
import AdminLogin from './AdminLogin'; // <-- Added the new Login component
import AdminDashboard from './AdminDashboard';

// ==========================================
// SECURITY GUARD: Protected Route
// ==========================================
// This component checks if the user has a valid token before letting them see the dashboard
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    
    // If there is no token, kick them back to the login screen
    if (!token) {
        return <Navigate to="/admin" replace />;
    }
    
    // If they have a token, render the requested page (the dashboard)
    return children;
};

// ==========================================
// MAIN LAYOUT (Handles conditional Footer)
// ==========================================
const AppContent = () => {
  const location = useLocation();
  
  // Checks if the current URL starts with "/admin" (covers both /admin and /admin/dashboard)
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <Navbar />
      
      <Routes>
        {/* --- Public Pages --- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* --- Admin Pages --- */}
        {/* 1. The Login Page */}
        <Route path="/admin" element={<AdminLogin />} />
        
        {/* 2. The Protected Dashboard */}
        <Route 
            path="/admin/dashboard" 
            element={
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
            } 
        />
      </Routes>

      {/* Only show the footer if we are NOT on an admin page */}
      {!isAdminPage && <Footer />}
    </>
  );
};

// ==========================================
// APP ROOT
// ==========================================
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;