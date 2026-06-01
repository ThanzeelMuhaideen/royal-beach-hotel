import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';







const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [dateFilter, setDateFilter] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Destroy the token
    navigate('/admin'); // Send them back to login
  };

  useEffect(() => {
    fetchInquiries();
    fetchReservations();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('https://royal-beach-hotel-api.vercel.app/api/general-inquiry');
      const data = await res.json();
      setInquiries(data);
    } catch (error) {
      console.error("Failed to fetch inquiries", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/reservations');
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      await fetch(`https://royal-beach-hotel-api.vercel.app/api/general-inquiry/${id}`, { method: 'DELETE' });
      fetchInquiries();
    }
  };

  const handleDeleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      await fetch(`http://localhost:5000/api/reservations/${id}`, { method: 'DELETE' });
      fetchReservations();
    }
  };

  const filteredInquiries = inquiries.filter(item =>
    dateFilter ? item.createdAt.substring(0, 10) === dateFilter : true
  );
  const filteredReservations = reservations.filter(item =>
    dateFilter ? item.createdAt.substring(0, 10) === dateFilter : true
  );

  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="admin-title" style={{ marginBottom: 0 }}>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="btn btn-delete"
          style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </div>

      <div className="admin-controls">
        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={activeTab === 'inquiries' ? 'active' : ''}
          >
            General Inquiries
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={activeTab === 'reservations' ? 'active' : ''}
          >
            Reservations
          </button>
        </div>

        <div className="date-filter">
          <label>Filter by Date:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          {dateFilter && (
            <button onClick={() => setDateFilter('')} className="clear-btn">Clear</button>
          )}
        </div>
      </div>

      <div className="admin-table-wrapper">
        {activeTab === 'inquiries' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No inquiries found.</td></tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
                    <td className="action-buttons">
                      <a
                        href={`mailto:${item.email}?subject=Re: ${item.subject}&body=Hi ${item.name},%0D%0A%0D%0ARegarding your message: "${item.message}"%0D%0A%0D%0A`}
                        className="btn btn-reply"
                      >
                        Reply
                      </a>
                      <button
                        onClick={() => handleDeleteInquiry(item.id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'reservations' && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received On</th>
                <th>Guest Details</th>
                <th>Stay Dates</th>
                <th>Guests</th>
                <th>Room Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No reservations found.</td></tr>
              ) : (
                filteredReservations.map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <strong>{item.guest?.fullName}</strong> <br />
                      <span style={{ fontSize: '0.85em', color: '#666' }}>{item.guest?.email}</span>
                    </td>
                    <td>
                      In: {new Date(item.checkInDate).toLocaleDateString()} <br />
                      Out: {new Date(item.checkOutDate).toLocaleDateString()}
                    </td>
                    <td>{item.adultsCount} Adults, {item.childrenCount} Children</td>
                    <td>{item.roomType}</td>
                    <td className="action-buttons">
                      <a
                        href={`mailto:${item.guest?.email}?subject=Your Reservation at Royal Beach Hotel`}
                        className="btn btn-reply"
                      >
                        Email
                      </a>
                      <button
                        onClick={() => handleDeleteReservation(item.id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;