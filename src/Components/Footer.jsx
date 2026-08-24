import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* PRODUCTS */}
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li><a href="#">Recruiting</a></li>
            <li><a href="#">Onboarding</a></li>
            <li><a href="#">Collaborative Hiring</a></li>
            <li><a href="#">Interview Scheduling</a></li>
            <li><a href="#">Applicant Tracking</a></li>
            <li><a href="#">Career Site Management</a></li>
            <li><a href="#">Reports</a></li>
          </ul>
        </div>

        {/* SOLUTIONS */}
        <div className="footer-col">
          <h4>Solutions</h4>
          <ul>
            <li><a href="#">By Industry</a></li>
            <li><a href="#">Structured hiring</a></li>
            <li><a href="#">Talent sourcing</a></li>
            <li><a href="#">Candidate experience</a></li>
            <li><a href="#">Diversity, equity & inclusion</a></li>
            <li><a href="#">Latest features</a></li>
            <li><a href="#">More solutions</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms and Condition</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col footer-newsletter">
          <h3 className="footer-logo-text">
            <img src="images/HRme.svg" alt="HRme Logo" />
          </h3>
          <h4>Stay connected</h4>
          <p>Signup to receive updates about HRme</p>
          <form className="email-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
          {subscribed && <p style={{ color: 'green', marginTop: '8px' }}>Thanks for subscribing!</p>}
          <div className="social-icons">
            <a href="#"><img src="images/path-facebook.svg" alt="Facebook" /></a>
            <a href="#"><img src="images/Vector (2).svg" alt="Twitter" /></a>
            <a href="#"><img src="images/path-instagram.svg" alt="Instagram" /></a>
            <a href="#"><img src="images/linked.svg" alt="LinkedIn" /></a>
            <a href="#"><img src="images/path-1.svg" alt="Social" /></a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>©2023 HRme. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms Of Service</a>
          <span>|</span>
          <a href="#">Partner Terms of Service</a>
          <span>|</span>
          <a href="#">Security & Compliance</a>
        </div>
      </div>
    </footer>
  );
}