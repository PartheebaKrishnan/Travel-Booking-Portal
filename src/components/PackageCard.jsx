function PackageCard({ travelPackage, selected, onSelect }) {
  return (
    <article
      className={selected ? 'package-card selected' : 'package-card'}
      onClick={() => onSelect(travelPackage.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(travelPackage.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
    >
      <div className="package-image">
        <img src={travelPackage.image} alt={travelPackage.title} />
        <span className="package-tag">{travelPackage.theme}</span>
      </div>

      <div className="package-content">
        <div className="package-heading">
          <div>
            <h3>{travelPackage.title}</h3>
            <p>{travelPackage.location}</p>
          </div>
          <strong>${travelPackage.price}</strong>
        </div>

        <p className="package-highlight">{travelPackage.highlight}</p>

        <div className="package-meta">
          <span>{travelPackage.duration}</span>
          <span>{travelPackage.season}</span>
          <span>{travelPackage.rating} rating</span>
        </div>

        <div className="package-perks">
          {travelPackage.perks.map((perk) => (
            <span key={perk}>{perk}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PackageCard;
