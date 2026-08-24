import { useState } from 'react';


const features = [
  {
    id: 1,
    icon: '/images/vector1.svg',
    label: 'Flexibility',
    title: 'Easily adaptable to any company custom',
  },
  {
    id: 2,
    icon: 'images/vector2 (2).svg',
    label: 'Productivity',
    title: 'Focus on things that are more important',
  },
  {
    id: 3,
    icon: 'images/Exclude.svg',
    label: 'Simplicity',
    title: 'Easy to use and readily available',
  },
];

export default function Features() {
  // By default, the middle card (Productivity) is featured
  const [hoveredCardId, setHoveredCardId] = useState(2);

  const handleCardHover = (id) => {
    setHoveredCardId(id);
  };

  const handleCardLeave = () => {
    // Reset to default (Productivity card)
    setHoveredCardId(2);
  };

  return (
    <section className="features">
      <h2>What Makes HRme One of the Best Hiring Tools?</h2>
      <p>
        HRme is a software platform designed to assist businesses in the hiring
        process. HRme provides tools and resources that enable businesses to
        evaluate job candidates objectively, streamline the hiring process, and
        ultimately hire the best candidates for the job.
      </p>

      <div className="feature-cards">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`feature-card ${
              hoveredCardId === feature.id ? 'featured' : ''
            }`}
            data-card
            onMouseEnter={() => handleCardHover(feature.id)}
            onMouseLeave={handleCardLeave}
          >
            <div className="icon-box">
              <img src={feature.icon} alt="" />
            </div>
            <div className="card-text">
              <span className="feature-label">{feature.label}</span>
              <h3>{feature.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}