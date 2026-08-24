import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="cta-banner">
      <div className="cta-content">
        <h2>Learn what HRme can do for you</h2>
        <p>Streamline and scale your hiring today and be ready for tomorrow.</p>
        <div className="cta-buttons">
          <Link to="/signup">
            <button className="cta-free">Free Trial</button>
          </Link>
          <button className="cta-contact">Contact Us</button>
        </div>
      </div>
    </section>
  );
}