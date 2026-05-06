function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <img src={destination.image} alt={`${destination.city}, ${destination.country}`} />
      <div className="destination-overlay">
        <span>{destination.price}</span>
        <h3>{destination.city}</h3>
        <p>{destination.country}</p>
        <small>{destination.note}</small>
      </div>
    </article>
  );
}

export default DestinationCard;
