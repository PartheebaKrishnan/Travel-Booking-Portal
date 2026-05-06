import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import BookingSummary from '../components/BookingSummary';

function RegistrationPage({ packages }) {
  const [bookingData, setBookingData] = useState({
    packageId: packages[0]?.id || '',
    destination: '',
    month: 'November 2026',
    travelers: '2',
    budget: 'Any budget',
    bookingMode: 'Packages',
    travelerName: '',
    travelerEmail: '',
    travelerPhone: ''
  });
  const [bookingStatus, setBookingStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === bookingData.packageId) || packages[0] || {},
    [packages, bookingData.packageId]
  );

  const handleChange = (field, value) => {
    setBookingData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setBookingStatus('Registering traveler and saving booking...');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: bookingData.packageId,
          travelers: Number(bookingData.travelers),
          month: bookingData.month,
          budget: bookingData.budget,
          bookingMode: bookingData.bookingMode,
          destination: bookingData.destination,
          travelerName: bookingData.travelerName,
          travelerEmail: bookingData.travelerEmail,
          travelerPhone: bookingData.travelerPhone
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unable to save booking');
      }

      const result = await response.json();
      setBookingStatus(`Traveler registered. Booking #${result.id} confirmed for ${result.title}.`);
    } catch (error) {
      setBookingStatus(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-content">
        <SectionTitle
          eyebrow="Traveler Registration"
          title="Register your traveler and complete the booking in one advanced flow."
          description="This dedicated page captures traveler details, package preferences, and booking metadata before saving it into the MySQL backend."
        />

        <div className="registration-grid">
          <form className="registration-form" onSubmit={(event) => event.preventDefault()}>
            <label>
              Select package
              <select
                value={bookingData.packageId}
                onChange={(event) => handleChange('packageId', event.target.value)}
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} — {pkg.location}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Traveler name
              <input
                type="text"
                value={bookingData.travelerName}
                onChange={(event) => handleChange('travelerName', event.target.value)}
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              Email address
              <input
                type="email"
                value={bookingData.travelerEmail}
                onChange={(event) => handleChange('travelerEmail', event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Phone number
              <input
                type="tel"
                value={bookingData.travelerPhone}
                onChange={(event) => handleChange('travelerPhone', event.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </label>

            <label>
              Destination preference
              <input
                type="text"
                value={bookingData.destination}
                onChange={(event) => handleChange('destination', event.target.value)}
                placeholder="Optional destination override"
              />
            </label>

            <label>
              Travel month
              <select
                value={bookingData.month}
                onChange={(event) => handleChange('month', event.target.value)}
              >
                <option>November 2026</option>
                <option>December 2026</option>
                <option>January 2027</option>
                <option>February 2027</option>
              </select>
            </label>

            <label>
              Travelers
              <select
                value={bookingData.travelers}
                onChange={(event) => handleChange('travelers', event.target.value)}
              >
                <option value="1">1 traveler</option>
                <option value="2">2 travelers</option>
                <option value="4">4 travelers</option>
                <option value="6">6 travelers</option>
              </select>
            </label>

            <label>
              Budget
              <select
                value={bookingData.budget}
                onChange={(event) => handleChange('budget', event.target.value)}
              >
                <option>Any budget</option>
                <option>Up to $1,500</option>
                <option>$1,500 - $2,500</option>
                <option>$2,500+</option>
              </select>
            </label>

            <label>
              Booking mode
              <select
                value={bookingData.bookingMode}
                onChange={(event) => handleChange('bookingMode', event.target.value)}
              >
                <option>Packages</option>
                <option>Flights</option>
                <option>Hotels</option>
                <option>Tours</option>
              </select>
            </label>

            <button type="button" className="primary-button wide" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Saving traveler...' : 'Complete registration'}
            </button>

            {bookingStatus ? <p className="booking-status">{bookingStatus}</p> : null}
          </form>

          <div className="registration-preview">
            <BookingSummary
              selectedPackage={selectedPackage}
              travelers={bookingData.travelers}
              bookingMode={bookingData.bookingMode}
              bookingStatus={bookingStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
