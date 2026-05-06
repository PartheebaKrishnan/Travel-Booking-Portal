import { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setStatus('Loading booking history...');

    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) {
        throw new Error('Unable to load booking history');
      }

      const data = await response.json();
      setBookings(data);
      setStatus('');
    } catch (error) {
      setStatus(error.message);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const search = filter.toLowerCase();
      return (
        booking.travelerName.toLowerCase().includes(search) ||
        booking.travelerEmail.toLowerCase().includes(search) ||
        booking.title.toLowerCase().includes(search) ||
        booking.location.toLowerCase().includes(search)
      );
    });
  }, [bookings, filter]);

  const currency = (amount, currencyCode) =>
    new Intl.NumberFormat(currencyCode === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0
    }).format(amount);

  const usdToInrRate = 83.5;

  return (
    <div className="page-shell">
      <div className="page-content">
        <SectionTitle
          eyebrow="Booking History"
          title="View registered travelers and past bookings in one place."
          description="This advanced history page pulls booking records from the MySQL backend and shows totals in both USD and INR."
        />

        <div className="history-toolbar">
          <input
            type="search"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search by traveler, package or destination..."
            aria-label="Search bookings"
          />
          <button type="button" className="secondary-button" onClick={fetchBookings}>
            Refresh
          </button>
        </div>

        {status ? <p className="booking-status">{status}</p> : null}

        <div className="booking-history-grid">
          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <h3>No bookings found.</h3>
              <p>Try a different traveler or package filter.</p>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const subtotal = booking.price * booking.travelers;
              const serviceFee = booking.travelers * 45;
              const total = subtotal + serviceFee;
              return (
                <article key={booking.id} className="booking-card">
                  <div className="booking-card-header">
                    <h3>{booking.title}</h3>
                    <span>{booking.location}</span>
                  </div>
                  <p className="booking-meta">
                    <strong>{booking.travelerName}</strong> · {booking.travelerEmail}
                  </p>
                  <div className="booking-details">
                    <span>{booking.bookingMode}</span>
                    <span>{booking.month}</span>
                    <span>{booking.travelers} traveler(s)</span>
                  </div>
                  <div className="booking-costs">
                    <div>
                      <small>Subtotal</small>
                      <strong>{currency(subtotal, 'USD')}</strong>
                      <small>{currency(subtotal * usdToInrRate, 'INR')}</small>
                    </div>
                    <div>
                      <small>Service fee</small>
                      <strong>{currency(serviceFee, 'USD')}</strong>
                      <small>{currency(serviceFee * usdToInrRate, 'INR')}</small>
                    </div>
                    <div>
                      <small>Total</small>
                      <strong>{currency(total, 'USD')}</strong>
                      <small>{currency(total * usdToInrRate, 'INR')}</small>
                    </div>
                  </div>
                  <p className="booking-card-footer">Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingHistoryPage;
