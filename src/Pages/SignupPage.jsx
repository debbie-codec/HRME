import { useState } from 'react';
import '../styles/landing.css';
import '../styles/signup.css';
export default function SignupPage() {
  const [formData, setFormData] = useState({
    Fullname: '',
    email: '',
    Website: '',
    Password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const fields = ['Fullname', 'email', 'Website', 'Password'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error on input
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    fields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowVerifyModal(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowVerifyModal(false);
  };

  return (
    <section className="auth-page page">
      {/* FORM SECTION */}
      <div className="form-section">
        <div className="form-wrapper">
          <div className="logo">
            <a href="/">
              <img src="/images/Frame 9.png" alt="logo" />
            </a>
          </div>

          <div className="head">
            <h1>Sign Up to your account</h1>
            <p className="subtext">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </div>

          <form id="signupForm" onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div
              className={`form-group ${errors.Fullname ? 'has-error' : ''}`}
              id="fullname-group"
            >
              <label htmlFor="Fullname">Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="Fullname"
                  placeholder="Enter your name"
                  value={formData.Fullname}
                  onChange={handleChange}
                  className={errors.Fullname ? 'error' : ''}
                  required
                />
                <span className="field-icon">⚠️</span>
              </div>
              {errors.Fullname && (
                <span className="error-message">This is a required field</span>
              )}
            </div>

            {/* Email */}
            <div
              className={`form-group ${errors.email ? 'has-error' : ''}`}
              id="email-group"
            >
              <label htmlFor="email">Company Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your company Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  required
                />
                <span className="field-icon">⚠️</span>
              </div>
              {errors.email && (
                <span className="error-message">This is a required field</span>
              )}
            </div>

            {/* Website */}
            <div
              className={`form-group ${errors.Website ? 'has-error' : ''}`}
              id="website-group"
            >
              <label htmlFor="Website">Company Website</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="Website"
                  placeholder="Enter your company website"
                  value={formData.Website}
                  onChange={handleChange}
                  className={errors.Website ? 'error' : ''}
                  required
                />
                <span className="field-icon">⚠️</span>
              </div>
              {errors.Website && (
                <span className="error-message">This is a required field</span>
              )}
            </div>

            {/* Password */}
            <div
              className={`form-group ${errors.Password ? 'has-error' : ''}`}
              id="password-group"
            >
              <label htmlFor="Password">Password</label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="Password"
                  placeholder="Enter your password"
                  value={formData.Password}
                  onChange={handleChange}
                  className={errors.Password ? 'error' : ''}
                  required
                />
                <span
                  className="toggle-password"
                  id="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁'}
                </span>
              </div>
              {errors.Password && (
                <span className="error-message">This is a required field</span>
              )}
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="privacy-note">
              By signing up, you agree to our <a href="#">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>

      {/* IMAGE SECTION */}
      <div className="image-section">
        <div className="head2">
          <h2>
            Try HR<span>me</span> free for 15 Days
          </h2>
          <p>
            HRme offers world-class tools to help your business evaluate job
            candidates objectively and hire smart.
          </p>
        </div>

        <div className="image-content">
          <img src="/images/signup image.png" alt="signup" className="img" />
        </div>
      </div>

      {/* Verify email modal */}
      {showVerifyModal && (
        <div
          className="modal-overlay show"
          id="modalOverlay"
          onClick={(e) => {
            if (e.target.id === 'modalOverlay') closeModal();
          }}
        >
          <div className="modal show" id="verifyEmailModal">
            <div className="modal-icon">
              <img src="/images/amico.png" alt="" />
            </div>
            <h3>Verify your email address</h3>
            <p>
              We sent you an email with a link to verify your email. Check your
              inbox to verify now
            </p>
            <button
              type="button"
              className="verify-btn"
              id="verifyEmailBtn"
              onClick={closeModal}
            >
              Verify your email address
            </button>
          </div>
        </div>
      )}
    </section>
  );
}