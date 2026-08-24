import { useRef } from 'react';

// Use images from the public folder. Referencing with absolute paths
// (starting with `/images/`) avoids import resolution issues.
const awards = [
  '/images/Top-50-HR-Products.svg.png',
  '/images/Silver_Tech_Award_2022-1536x1084.png.png',
  '/images/hre-top-hr-product-2021.jpeg (1).png',
  '/images/idc-logo-1.svg (1).png',
  '/images/users-love-us.svg (1).png',
  '/images/Stevie-great-employer-2021.jpeg (1).png',
  '/images/MP-Awards-2023-Best-Marketing-and-PR.png (1).png',
  '/images/gartner-logo.svg.png',
  '/images/g2-2023-spring-leader-spring-2023.svg (1).png',
];

export default function Recognition() {
  const recognitionTrackRef = useRef(null);

  // Render two copies so CSS animation can scroll -50% seamlessly
  const doubled = awards.concat(awards);

  return (
    <section className="recognition">
      <h2>Industry Recognition</h2>
      <p>HRme has been recognized as the best Hiring Tool in the Industry</p>

      <div className="recognition-marquee">
        <div className="recognition-track" ref={recognitionTrackRef}>
          {doubled.map((src, idx) => (
            <img key={idx} src={src} alt={`Award ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}