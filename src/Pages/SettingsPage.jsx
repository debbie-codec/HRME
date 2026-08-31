import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiCamera, FiAlertCircle } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Components/adminConponents/Sidebar";
import TopBar from "../Components/adminConponents/Topbar";
import "../styles/settings.css";

export default function SettingsPage() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'password' ? 'password' : 'account');
  
  // Get current user from sessionStorage
  const storedUser = sessionStorage.getItem("hrme_currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const userFullName = currentUser?.name || "User";
  const userEmail = currentUser?.email || "user@example.com";
  
  // Extract names
  const nameParts = userFullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Initialize avatar state
  const [avatar, setAvatar] = useState(currentUser?.avatar || null);

  // Sync tab state when URL parameters change
  useEffect(() => {
    if (tabParam === 'password') {
      setActiveTab('password');
    } else {
      setActiveTab('account');
    }
  }, [tabParam]);
  
  // Account Form State
  const [accountForm, setAccountForm] = useState({
    firstName: firstName,
    lastName: lastName,
    email: userEmail,
    phoneNumber: currentUser?.phone || '',
    gender: currentUser?.gender || 'Female',
    location: currentUser?.location || '',
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Handle Account Form Changes
  const handleAccountChange = (field, value) => {
    setAccountForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle Password Form Changes
  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));

    setPasswordErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  // Handle Avatar Upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Update Profile
  const handleUpdateProfile = () => {
    const updatedUser = {
      ...currentUser,
      name: `${accountForm.firstName} ${accountForm.lastName}`.trim(),
      email: accountForm.email,
      phone: accountForm.phoneNumber,
      gender: accountForm.gender,
      location: accountForm.location,
      avatar: avatar
    };
    sessionStorage.setItem("hrme_currentUser", JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  };

  // Handle Update Password
  const handleUpdatePassword = () => {
    const nextErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!passwordForm.currentPassword.trim()) {
      nextErrors.currentPassword = 'This is a required field';
    }

    if (!passwordForm.newPassword.trim()) {
      nextErrors.newPassword = 'This is a required field';
    } else if (passwordForm.newPassword.length < 8) {
      nextErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordForm.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'This is a required field';
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    if (passwordForm.currentPassword && passwordForm.newPassword && passwordForm.currentPassword === passwordForm.newPassword) {
      nextErrors.newPassword = 'New password must be different from current password';
    }

    setPasswordErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    toast.success('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="app-layout">
      {/* SIDE NAVIGATION */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="main-wrapper">
        {/* TOP NAVBAR */}
        <TopBar />

        {/* SETTINGS PAGE CONTENT */}
        <main className="page-content">
          {/* PAGE HEADING */}
          <h1 className="page-title">Settings</h1>

          <div className="settings-container">
            {/* TABS */}
            <div className="settings-tabs">
              <button
                type="button"
                className={`tab-link ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                Account Setting
              </button>
              <button
                type="button"
                className={`tab-link ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                Password
              </button>
            </div>

            {/* AVATAR SECTION */}
            <div className="avatar-section">
              <div className="avatar-wrapper">
                {avatar ? (
                  <img src={avatar} alt="User Avatar" className="avatar-image" />
                ) : (
                  <div className="avatar-initials">
                    {firstName.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <label className="avatar-upload-label" htmlFor="avatar-input">
                  <FiCamera className="camera-icon" />
                </label>
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="avatar-actions">
                <label htmlFor="avatar-input" className="btn-upload">
                  Upload New
                </label>
                <button 
                  type="button" 
                  className="btn-delete"
                  onClick={() => setAvatar(null)}
                >
                  Delete avatar
                </button>
              </div>
            </div>

            <div className="divider" />

            {/* ACCOUNT SETTING TAB */}
            {activeTab === 'account' && (
              <div className="settings-content">
                <div className="form-grid">
                  {/* FIRST NAME */}
                  <div className="form-row-horizontal">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="First name"
                      value={accountForm.firstName}
                      onChange={(e) => handleAccountChange('firstName', e.target.value)}
                    />
                  </div>

                  {/* LAST NAME */}
                  <div className="form-row-horizontal">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last name"
                      value={accountForm.lastName}
                      onChange={(e) => handleAccountChange('lastName', e.target.value)}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="form-row-horizontal">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Please enter your email"
                      value={accountForm.email}
                      onChange={(e) => handleAccountChange('email', e.target.value)}
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="form-row-horizontal">
                    <label>Phone number</label>
                    <div className="phone-input-wrapper">
                      <span className="country-code">+234</span>
                      <input
                        type="text"
                        placeholder="Please enter your phone number"
                        value={accountForm.phoneNumber}
                        onChange={(e) => handleAccountChange('phoneNumber', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* GENDER SELECTION */}
                  <div className="form-row-horizontal">
                    <label>Gender</label>
                    <div className="radio-group">
                      <label className={`radio-card ${accountForm.gender === 'Male' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={accountForm.gender === 'Male'}
                          onChange={(e) => handleAccountChange('gender', e.target.value)}
                        />
                        Male
                      </label>
                      <label className={`radio-card ${accountForm.gender === 'Female' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={accountForm.gender === 'Female'}
                          onChange={(e) => handleAccountChange('gender', e.target.value)}
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="form-row-horizontal">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Ikeja, Lagos Nigeria"
                      value={accountForm.location}
                      onChange={(e) => handleAccountChange('location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleUpdateProfile}
                  >
                    Update Profile
                  </button>
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* PASSWORD TAB */}
            {activeTab === 'password' && (
              <div className="settings-content">
                <div className="password-header">
                  <h3>Password</h3>
                  <p className="password-description">
                    Please enter your current password to reset password
                  </p>
                </div>

                <div className="password-form-section">
                  <div className="horizontal-form-group">
                    <label>Current password</label>
                    <div className="field-with-error">
                      <div className={`input-error-wrap ${passwordErrors.currentPassword ? 'has-error' : ''}`}>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                          className={passwordErrors.currentPassword ? 'input-error' : ''}
                        />
                        {passwordErrors.currentPassword && <span className="error-icon"><FiAlertCircle /></span>}
                      </div>
                      {passwordErrors.currentPassword && <div className="field-error-text">{passwordErrors.currentPassword}</div>}
                    </div>
                  </div>

                  <div className="horizontal-form-group">
                    <label>New password</label>
                    <div className="field-with-error">
                      <div className={`input-error-wrap ${passwordErrors.newPassword ? 'has-error' : ''}`}>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                          className={passwordErrors.newPassword ? 'input-error' : ''}
                        />
                        {passwordErrors.newPassword && <span className="error-icon"><FiAlertCircle /></span>}
                      </div>
                      {passwordErrors.newPassword && <div className="field-error-text">{passwordErrors.newPassword}</div>}
                    </div>
                  </div>

                  <div className="horizontal-form-group">
                    <label>Confirm new password</label>
                    <div className="field-with-error">
                      <div className={`input-error-wrap ${passwordErrors.confirmPassword ? 'has-error' : ''}`}>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                          className={passwordErrors.confirmPassword ? 'input-error' : ''}
                        />
                        {passwordErrors.confirmPassword && <span className="error-icon"><FiAlertCircle /></span>}
                      </div>
                      {passwordErrors.confirmPassword && <div className="field-error-text">{passwordErrors.confirmPassword}</div>}
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </button>
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}