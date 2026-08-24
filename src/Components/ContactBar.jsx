export default function ContactBar() {
  return (
    <div className="contact-bar">
      <div className="contact-item">
        <span className="contact-icon">
          <img src="images/telephone.svg" alt="" />
        </span>
        <div>
          <p className="contact-label">Call us</p>
          <p className="contact-value">(+234) 801 1520 4153</p>
        </div>
      </div>

      <div className="contact-item">
        <span className="contact-icon">
          <img src="images/Email.svg" alt="" />
        </span>
        <div>
          <p className="contact-label">E-mail Us</p>
          <p className="contact-value">Info@hrme.com</p>
        </div>
      </div>

      <div className="contact-item">
        <span className="contact-icon">
          <img src="images/Location.svg" alt="" />
        </span>
        <div>
          <p className="contact-label">Location</p>
          <p className="contact-value">Laderin workers Estate, Oke Mosan</p>
        </div>
      </div>
    </div>
  );
}