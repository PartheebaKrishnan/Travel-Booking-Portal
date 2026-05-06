import { bookingModes } from '../data/travelData';

function HeroSearch({
  bookingMode,
  onModeChange,
  formValues,
  onFieldChange,
  onSubmit,
  activePackage
}) {
  return (
    <section className="hero">
      <div className="hero-copy reveal reveal-1">
        <div className="brand-row">
          <span className="brand-mark">Wayfare</span>
          <nav className="hero-nav" aria-label="Primary navigation">
            <a href="#packages">Packages</a>
            <a href="#destinations">Destinations</a>
            <a href="#reviews">Reviews</a>
          </nav>
        </div>

        <div className="hero-intro">
          <span className="kicker">React frontend for a modern Express + MySQL travel portal</span>
          <h1>Build unforgettable journeys with a booking experience travelers trust.</h1>
          <p>
            Explore curated stays, compare premium packages, and preview a live booking
            flow designed to plug into your new Node, Express, and MySQL backend.
          </p>
        </div>

        <form className="search-card" onSubmit={onSubmit}>
          <div className="mode-switch" role="tablist" aria-label="Booking mode">
            {bookingModes.map((mode) => (
              <button
                key={mode}
                type="button"
                className={mode === bookingMode ? 'mode-pill active' : 'mode-pill'}
                onClick={() => onModeChange(mode)}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="search-grid">
            <label>
              Destination
              <input
                type="text"
                value={formValues.destination}
                onChange={(event) => onFieldChange('destination', event.target.value)}
                placeholder="Search Bali, Tokyo, Alps..."
              />
            </label>
            <label>
              Traveler name
              <input
                type="text"
                value={formValues.travelerName}
                onChange={(event) => onFieldChange('travelerName', event.target.value)}
                placeholder="Full name"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={formValues.travelerEmail}
                onChange={(event) => onFieldChange('travelerEmail', event.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                value={formValues.travelerPhone}
                onChange={(event) => onFieldChange('travelerPhone', event.target.value)}
                placeholder="+91 98765 43210"
              />
            </label>
            <label>
              Month
              <select
                value={formValues.month}
                onChange={(event) => onFieldChange('month', event.target.value)}
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
                value={formValues.travelers}
                onChange={(event) => onFieldChange('travelers', event.target.value)}
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
                value={formValues.budget}
                onChange={(event) => onFieldChange('budget', event.target.value)}
              >
                <option>Any budget</option>
                <option>Up to $1,500</option>
                <option>$1,500 - $2,500</option>
                <option>$2,500+</option>
              </select>
            </label>
          </div>

          <div className="search-actions">
            <button type="submit" className="primary-button">
              Find Trips
            </button>
            <p>
              Currently spotlighting <strong>{activePackage.title}</strong> with{' '}
              <strong>{activePackage.stay}</strong>.
            </p>
          </div>
        </form>
      </div>

      <div className="hero-visual reveal reveal-2" aria-hidden="true">
        <div className="spotlight-card">
          <img src={activePackage.image} alt="" />
          <div className="spotlight-overlay">
            <span className="spotlight-tag">{activePackage.theme}</span>
            <h3>{activePackage.location}</h3>
            <p>{activePackage.highlight}</p>
          </div>
        </div>

        <div className="floating-plan">
          <span className="mini-label">Trip Snapshot</span>
          <h4>{activePackage.title}</h4>
          <ul>
            <li>{activePackage.duration}</li>
            <li>{activePackage.departure}</li>
            <li>{activePackage.perks[0]}</li>
          </ul>
        </div>

        <div className="floating-price">
          <span>starting at</span>
          <strong>${activePackage.price}</strong>
          <small>per traveler</small>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
