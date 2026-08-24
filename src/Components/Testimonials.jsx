const testimonials = [
  {
    id: 1,
    image: 'images/Ellipse 5.png',
    name: 'Eleanor Pena',
    role: 'Senior HR Manager',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    rating: 5
  },
  {
    id: 2,
    image: 'images/Ellipse 8.png',
    name: 'Bessie Clark',
    role: 'CEO & Co-Founder',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    rating: 5
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2>Users Love HRme</h2>
      <p>
        Our streamlined hiring process utilizes intuitive dashboards, task
        management, reminders, and an optimized candidate review and interview
        flow, ensuring an organized and seamless experience for all.
      </p>
      <a href="#" className="view-stories">View All Customer Stories</a>

      <div className="testimonial-cards">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-top">
              <img src={testimonial.image} alt={testimonial.name} />
              <div className="stars">{'★'.repeat(testimonial.rating)}</div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <span className="author-name">{testimonial.name}</span>
              <span className="author-role">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}