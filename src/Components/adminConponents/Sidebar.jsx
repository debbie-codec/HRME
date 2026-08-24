import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiGrid,
  FiUsers,
  FiInbox,
  FiBriefcase,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Tracks current URL path
  const [isExpanded, setIsExpanded] = useState(false); // Mobile sidebar toggle

  // ================= LOGOUT FUNCTION =================
  const handleLogout = () => {
    sessionStorage.removeItem('hrme_currentUser');
    navigate('/login');
  };

  // ================= MENU ITEMS =================
  const menuItems = [
    { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { name: 'Candidates', icon: <FiUsers />, path: '/candidates' },
    { name: 'Inbox', icon: <FiInbox />, path: '/inbox' },
    { name: 'Jobs', icon: <FiBriefcase />, path: '/jobs' },
    { name: 'Calendar', icon: <FiCalendar />, path: '/calendar' },
    { name: 'Settings', icon: <FiSettings />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <nav className="mobile-nav-bar">
        <button className="sidebar-toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Icon Navigation */}
        <div className="mobile-nav-icons">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.name}
                className={`mobile-nav-icon ${isActive ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  setIsExpanded(false);
                }}
                title={item.name}
              >
                <span className="nav-icon">{item.icon}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
        {/* LOGO */}
        <div className="sidebar-logo">
          <a href="/">
            <img src="/images/Frame 9.png" alt="HRme logo" />
          </a>
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            // Checks if current URL starts with item path (e.g., /candidates/qualified matches /candidates)
            const isActive = location.pathname.startsWith(item.path);

            return (
              <button
                key={item.name}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  setIsExpanded(false); // Close sidebar on mobile after navigation
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">🚀</div>
            <p>
              Upgrade to <strong>PRO</strong>
              <br />
              for more features
            </p>
            <button className="upgrade-btn">Upgrade Now</button>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">
              <FiLogOut />
            </span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isExpanded && <div className="sidebar-overlay" onClick={() => setIsExpanded(false)} />}
    </>
  );
}