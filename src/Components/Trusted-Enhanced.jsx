export default function Trusted() {
  const companies = [
    'Peloton',
    'RingCentral',
    'Shutterfly',
    'PremiseHealth',
    'Sikich',
    'Sitecore',
  ];

  return (
    <section className="trusted">
      <h2>Trusted by teams at companies like</h2>
      <div className="logo-marquee">
        <div className="logo-track">
          {companies.concat(companies).map((name, i) => (
            <div className="logo-item" key={i} aria-hidden={i >= companies.length}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}