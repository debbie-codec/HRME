import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiChevronDown, FiArrowRight } from "react-icons/fi";

export default function Topbar({ onSearch, showWelcome = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const suggestions = [
    { label: "Candidates", path: "/candidates" },
    { label: "Dashboard/Calendar", path: "/dashboard" },
    { label: "Settings/Calendar", path: "/settings" },
    { label: "Settings/Company/Careers Site", path: "/settings" },
  ];
  const visibleSuggestions = searchQuery.trim()
    ? suggestions.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Get currently logged-in user
  const storedUser = sessionStorage.getItem("hrme_currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = currentUser?.name || "User";

  // Trigger search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setDropdownOpen(false);
  };

  const handlePasswordClick = () => {
    navigate("/settings?tab=password");
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const handleSearchOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleSearchOutside);
    return () => document.removeEventListener("mousedown", handleSearchOutside);
  }, []);

  return (
    <header className="topbar">
      {/* WELCOME MESSAGE */}
      {showWelcome && <h1 className="welcome-text">Welcome {userName}</h1>}

      {/* DYNAMIC SEARCH BAR */}
      <div className="topbar-search-wrapper" ref={searchRef}>
      <div className="topbar-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {visibleSuggestions.length > 0 && (
        <div className="search-suggestions" role="listbox">
          {visibleSuggestions.map((suggestion) => (
            <button
              type="button"
              className="search-suggestion"
              key={suggestion.label}
              onClick={() => {
                navigate(suggestion.path);
                setSearchQuery("");
              }}
            >
              <FiArrowRight />
              <span>{suggestion.label}</span>
            </button>
          ))}
        </div>
      )}
      </div>

      {/* RIGHT SIDE SECTION */}
      <div className="topbar-right">
        {/* NOTIFICATIONS */}
        <button
          className="notification-btn"
          type="button"
          aria-label="Notifications"
        >
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        {/* USER PROFILE WITH DROPDOWN */}
        <div className="topbar-user-wrapper" ref={dropdownRef}>
          <button
            className="topbar-user-btn"
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="topbar-username">{userName}</span>
            <div className="topbar-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <FiChevronDown className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`} />
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="topbar-dropdown">
              <button 
                type="button" 
                className="dropdown-item"
                onClick={handleSettingsClick}
              >
                Settings
              </button>
              <button 
                type="button" 
                className="dropdown-item"
                onClick={handlePasswordClick}
              >
                Password
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}