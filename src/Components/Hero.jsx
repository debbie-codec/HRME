import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="badge">
          <img src="/images/svg.me-3.png" alt="" /> HIRE
        </span>
        <h1>HR Talent Target Get the Best with Our Elite Hiring Software.</h1>
        <p>
          HRme offers world-class tools to help your business evaluate job
          candidates objectively and hire smart.
        </p>
        <div className="btn hero-btn">
          <Link to="/signup">
            <button className="apply">Apply For Jobs</button>
          </Link>
          <Link to="/login">
            <button className="login">Log In</button>
          </Link>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="/images/image 17.png"
          alt="Woman holding a tablet in an office"
        />
      </div>
    </section>
  );
}