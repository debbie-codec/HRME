import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navMenuRef = useRef(null);
  const toggleRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        navMenuRef.current &&
        toggleRef.current &&
        !navMenuRef.current.contains(e.target) &&
        !toggleRef.current.contains(e.target) &&
        menuOpen
      ) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuOpen]);

  useEffect(() => {
    const closeMenuOnInteraction = () => {
      if (menuOpen) closeMenu();
    };

    window.addEventListener('scroll', closeMenuOnInteraction);
    window.addEventListener('wheel', closeMenuOnInteraction);
    window.addEventListener('touchmove', closeMenuOnInteraction);

    return () => {
      window.removeEventListener('scroll', closeMenuOnInteraction);
      window.removeEventListener('wheel', closeMenuOnInteraction);
      window.removeEventListener('touchmove', closeMenuOnInteraction);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) closeMenu();
    };

    const handleBlur = () => closeMenu();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/Frame 9.png" alt="HRme Logo" />
        </Link>
      </div>

      <div
        className="menu-toggle"
        ref={toggleRef}
        onClick={() => setMenuOpen(!menuOpen)}
        id="menu-toggle"
      >
        <span id="menu-icon">{menuOpen ? '✕' : '☰'}</span>
      </div>

      <div
        className={`nav-menu ${menuOpen ? 'active' : ''}`}
        ref={navMenuRef}
        id="nav-menu"
      >
        <ul className="nav-links">
          <li>
            <a href="#" onClick={closeMenu}>
              Product
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Solutions
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Resources
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#" onClick={closeMenu}>
              Company
            </a>
          </li>
        </ul>

        <div className="btn">
          <Link to="/login" onClick={closeMenu}>
            <button className="login">Log in</button>
          </Link>
          <Link to="/signup" onClick={closeMenu}>
            <button className="apply">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}