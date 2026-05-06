function BookingSummary({ selectedPackage, travelers, bookingMode, onReserve, bookingStatus }) {
  const travelerCount = Number(travelers);
  const subtotal = selectedPackage.price * travelerCount;
  const serviceFee = travelerCount * 45;
  const total = subtotal + serviceFee;

  const usdCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  const inrCurrency = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  const usdToInrRate = 83.5;
  const subtotalInr = subtotal * usdToInrRate;
  const serviceFeeInr = serviceFee * usdToInrRate;
  const totalInr = total * usdToInrRate;

  return (
    <aside className="booking-summary">
      <div className="summary-top">
        <span className="mini-label">Booking Preview</span>
        <h3>{selectedPackage.title}</h3>
        <p>{selectedPackage.stay}</p>
      </div>

      <div className="summary-line">
        <span>Booking mode</span>
        <strong>{bookingMode}</strong>
      </div>
      <div className="summary-line">
        <span>Departure</span>
        <strong>{selectedPackage.departure}</strong>
      </div>
      <div className="summary-line">
        <span>Travelers</span>
        <strong>{travelerCount}</strong>
      </div>
      <div className="summary-line">
        <span>Subtotal</span>
        <strong>{usdCurrency.format(subtotal)}</strong>
        <small>{inrCurrency.format(subtotalInr)}</small>
      </div>
      <div className="summary-line">
        <span>Service fee</span>
        <strong>{usdCurrency.format(serviceFee)}</strong>
        <small>{inrCurrency.format(serviceFeeInr)}</small>
      </div>

      <div className="summary-total">
        <span>Estimated total</span>
        <strong>{usdCurrency.format(total)}</strong>
        <small>{inrCurrency.format(totalInr)}</small>
      </div>

      <button type="button" className="primary-button wide" onClick={onReserve}>
        Reserve This Journey
      </button>

      {bookingStatus ? <p className="booking-status">{bookingStatus}</p> : null}

      <div className="summary-notes">
        <span>{selectedPackage.perks[0]}</span>
        <span>{selectedPackage.perks[1]}</span>
        <span>Instant itinerary preview</span>
      </div>
    </aside>
  );
}

export default BookingSummary;
