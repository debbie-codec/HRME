import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

export default function LoginPage() {
  const navigate = useNavigate();

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Modal states
  const [modalStep, setModalStep] = useState(null); // null, 'forgot', 'reset-sent', 'new-password', 'success'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotErrors, setForgotErrors] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock users database
  const mockUsers = {
    'deborah04@gmail.com': { password: 'somto1234', name: 'Deborah' },
    'dominicughanze348@gmail.com': { password: 'password123', name: 'Dominic' },
  };

  let resetEmailInProgress = forgotEmail.toLowerCase();

  // ========== LOGIN VALIDATION ==========
  const validateLoginForm = () => {
    const errors = {};
    if (!loginEmail.trim()) errors.email = true;
    if (!loginPassword) errors.password = true;
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAlertMessage('');

    if (!validateLoginForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const user = mockUsers[loginEmail.toLowerCase()];
      const isValid = user && user.password === loginPassword;

      if (!isValid) {
        setAlertMessage('Incorrect Email or Password.');
        return;
      }

      // Store user in sessionStorage
      sessionStorage.setItem(
        'hrme_currentUser',
        JSON.stringify({ email: loginEmail.toLowerCase(), name: user.name })
      );

      navigate('/dashboard');
    }, 1200);
  };

  // ========== FORGOT PASSWORD FLOW ==========
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendResetLink = () => {
    const errors = {};
    if (!forgotEmail.trim() || !isValidEmail(forgotEmail)) {
      errors.email = true;
    }
    setForgotErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      resetEmailInProgress = forgotEmail.toLowerCase();
      setModalStep('reset-sent');
    }, 1000);
  };

  const handleCheckMail = () => {
    setNewPassword('');
    setConfirmPassword('');
    setPasswordErrors({});
    setModalStep('new-password');
  };

  const handleResetPassword = () => {
    const errors = {};
    if (!newPassword || newPassword.length < 8) {
      errors.newPassword = true;
    }
    if (!confirmPassword || confirmPassword !== newPassword) {
      errors.confirmPassword = true;
    }
    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setModalStep('success');
    }, 1200);
  };

  const handleSuccessClose = () => {
    setModalStep(null);
    setLoginEmail('');
    setLoginPassword('');
    setAlertMessage('');
    setForgotEmail('');
  };

  const handleResendLink = () => {
    setAlertMessage('Link sent again!');
    setTimeout(() => setAlertMessage(''), 2000);
  };

  // ========== RENDER MODALS ==========
  const isModalOpen = modalStep !== null;

  return (
    <section className="page">
      {/* FORM SECTION */}
      <div className="form-section">
        <div className="form-wrapper">
          <div className="logo">
            <Link to="/">
              <img src="images/Frame 9.png" alt="logo" />
            </Link>
          </div>

          <div className="head">
            <h1>Sign In to your account</h1>
            <p className="subtext login-subtext">
              Please enter your details to proceed further
            </p>
          </div>

          {/* Error Alert */}
          {alertMessage && (
            <div className="login-alert show">
              <span className="login-alert-icon">⚠️</span>
              <span className="login-alert-text">{alertMessage}</span>
              <span
                className="login-alert-close"
                onClick={() => setAlertMessage('')}
              >
                ×
              </span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} noValidate>
            {/* Email Field */}
            <div
              className={`form-group ${loginErrors.email ? 'has-error' : ''}`}
              id="login-email-group"
            >
              <label htmlFor="loginEmail">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="loginEmail"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    if (e.target.value.trim()) {
                      setLoginErrors((prev) => ({ ...prev, email: false }));
                    }
                  }}
                  className={loginErrors.email ? 'error' : ''}
                  required
                />
                <span className="field-icon">⚠️</span>
              </div>
              {loginErrors.email && (
                <span className="error-message">This is a required field</span>
              )}
            </div>

            {/* Password Field */}
            <div
              className={`form-group ${loginErrors.password ? 'has-error' : ''}`}
              id="login-password-group"
            >
              <label htmlFor="loginPassword">Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="loginPassword"
                  placeholder="Enter a password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    if (e.target.value) {
                      setLoginErrors((prev) => ({ ...prev, password: false }));
                    }
                  }}
                  className={loginErrors.password ? 'error' : ''}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁'}
                </span>
              </div>
              <div className="login-row">
                <span className="login-hint">Must be at least 8 characters</span>
                <a
                  href="#"
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setForgotEmail('');
                    setForgotErrors({});
                    setModalStep('forgot');
                  }}
                >
                  Forgot Password?
                </a>
              </div>
              {loginErrors.password && (
                <span className="error-message">This is a required field</span>
              )}
            </div>

            <button
              type="submit"
              className={`signup-btn login-btn ${isLoading ? 'is-loading' : ''}`}
              disabled={isLoading}
            >
              <span className="btn-text">Sign In</span>
              {isLoading && <span className="btn-spinner"></span>}
            </button>

            <p className="subtext login-signup-note">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="image-section">
        <img src="images/login-img.png" alt="Sign in" className="img" />
      </div>

      {/* ===== MODALS ===== */}
      {isModalOpen && (
        <div
          className="modal-overlay show"
          onClick={(e) => {
            if (e.target.className.includes('modal-overlay')) {
              setModalStep(null);
            }
          }}
        >
          {/* Step 1: Forgot Password */}
          {modalStep === 'forgot' && (
            <div className="modal-box show">
              <h2 className="modal-title">Forgot your password?</h2>
              <p className="modal-subtext">
                A reset link will be sent to your email address.
              </p>
              <div
                className={`form-group ${
                  forgotErrors.email ? 'has-error' : ''
                }`}
                id="forgot-email-group"
              >
                <input
                  type="email"
                  id="forgotEmailInput"
                  placeholder="Enter Email Address"
                  value={forgotEmail}
                  onChange={(e) => {
                    setForgotEmail(e.target.value);
                    if (e.target.value.trim()) {
                      setForgotErrors({});
                    }
                  }}
                  className={forgotErrors.email ? 'error' : ''}
                />
                {forgotErrors.email && (
                  <span className="error-message">
                    Enter a valid email address
                  </span>
                )}
              </div>
              <button
                className={`signup-btn ${isLoading ? 'is-loading' : ''}`}
                onClick={handleSendResetLink}
                disabled={isLoading}
              >
                <span className="btn-text">Send Reset Link</span>
                {isLoading && <span className="btn-spinner"></span>}
              </button>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setModalStep(null)}
              >
                Log In
              </button>
            </div>
          )}

          {/* Step 2: Reset Sent */}
          {modalStep === 'reset-sent' && (
            <div className="modal-box show">
              <h2 className="modal-title">Reset Password</h2>
              <p className="modal-subtext">
                A reset link has been sent to your email,{' '}
                <strong>{forgotEmail}</strong>
              </p>
              <button className="signup-btn" onClick={handleCheckMail}>
                Check mail
              </button>
              <p className="modal-note">I remember my password now</p>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setModalStep(null)}
              >
                Log In
              </button>
              <p className="modal-resend">
                If you didn't get the reset email, click the Resend link.
                <br />
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  handleResendLink();
                }}>
                  Resend Link
                </a>
              </p>
            </div>
          )}

          {/* Step 3: New Password */}
          {modalStep === 'new-password' && (
            <div className="modal-box show">
              <h2 className="modal-title">Reset Password</h2>
              <p className="modal-subtext">
                Enter a new password for your account
              </p>
              <div
                className={`form-group ${
                  passwordErrors.newPassword ? 'has-error' : ''
                }`}
              >
                <label htmlFor="newPassword">Password</label>
                <div className="input-wrapper password-wrapper">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="newPassword"
                    placeholder="Enter password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (e.target.value.length >= 8) {
                        setPasswordErrors((prev) => ({
                          ...prev,
                          newPassword: false,
                        }));
                      }
                    }}
                    className={passwordErrors.newPassword ? 'error' : ''}
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? '🙈' : '👁'}
                  </span>
                </div>
                {passwordErrors.newPassword && (
                  <span className="error-message">
                    Password must be at least 8 characters
                  </span>
                )}
              </div>

              <div
                className={`form-group ${
                  passwordErrors.confirmPassword ? 'has-error' : ''
                }`}
              >
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className="input-wrapper password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value === newPassword) {
                        setPasswordErrors((prev) => ({
                          ...prev,
                          confirmPassword: false,
                        }));
                      }
                    }}
                    className={passwordErrors.confirmPassword ? 'error' : ''}
                  />
                  <span
                    className="toggle-password"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? '🙈' : '👁'}
                  </span>
                </div>
                {passwordErrors.confirmPassword && (
                  <span className="error-message">Passwords do not match</span>
                )}
              </div>

              <button
                type="button"
                className={`signup-btn ${isLoading ? 'is-loading' : ''}`}
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                <span className="btn-text">Reset password</span>
                {isLoading && <span className="btn-spinner"></span>}
              </button>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setModalStep(null)}
              >
                Log In
              </button>
            </div>
          )}

          {/* Step 4: Success */}
          {modalStep === 'success' && (
            <div className="modal-box modal-success show">
              <div className="success-check">✓</div>
              <h2 className="modal-title">Password Reset Successful</h2>
              <p className="modal-subtext">
                Make sure to use a password you can remember easily
              </p>
              <button
                type="button"
                className="signup-btn"
                onClick={handleSuccessClose}
              >
                Proceed To Login
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}