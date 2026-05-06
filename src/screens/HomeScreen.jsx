import BookingSummary from '../components/BookingSummary';
import DestinationCard from '../components/DestinationCard';
import HeroSearch from '../components/HeroSearch';
import PackageCard from '../components/PackageCard';
import SectionTitle from '../components/SectionTitle';
import {
  experienceHighlights,
  heroMetrics,
  packageThemes,
  travelerStories
} from '../data/travelData';

function HomeScreen({
  bookingMode,
  activeTheme,
  formValues,
  visiblePackages,
  destinations,
  selectedPackage,
  bookingStatus,
  onModeChange,
  onFieldChange,
  onSearchSubmit,
  onSelectPackage,
  onReserve,
  onQueryChange,
  onThemeChange,
  query,
  packagesRef
}) {
  return (
    <div className="page-shell">
      <div className="page-content">
        <HeroSearch
          bookingMode={bookingMode}
          onModeChange={onModeChange}
          formValues={formValues}
          onFieldChange={onFieldChange}
          onSubmit={onSearchSubmit}
          activePackage={selectedPackage}
        />

        <section className="metrics-strip reveal reveal-2" aria-label="Travel portal metrics">
          {heroMetrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section className="section-grid" id="packages" ref={packagesRef}>
          <div className="content-column">
            <SectionTitle
              eyebrow="Featured Packages"
              title="Curated bookings designed for travelers, not just transactions."
              description="This frontend includes package discovery, instant filtering, and a live booking summary ready to connect with your Express/MySQL API."
            />

            <div className="toolbar">
              <input
                type="text"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Filter by destination, trip name, or experience..."
                aria-label="Filter packages"
              />
              <div className="theme-pills" role="tablist" aria-label="Package themes">
                {packageThemes.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={theme === activeTheme ? 'theme-pill active' : 'theme-pill'}
                    onClick={() => onThemeChange(theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="package-grid">
              {visiblePackages.map((travelPackage) => (
                <PackageCard
                  key={travelPackage.id}
                  travelPackage={travelPackage}
                  selected={travelPackage.id === selectedPackage.id}
                  onSelect={onSelectPackage}
                />
              ))}
            </div>

            {visiblePackages.length === 0 ? (
              <div className="empty-state">
                <h3>No packages matched that search.</h3>
                <p>Try a broader destination name or switch the package theme.</p>
              </div>
            ) : null}
          </div>

          <BookingSummary
            selectedPackage={selectedPackage}
            travelers={formValues.travelers}
            bookingMode={bookingMode}
            onReserve={onReserve}
            bookingStatus={bookingStatus}
          />
        </section>

        <section className="destinations-section" id="destinations">
          <SectionTitle
            eyebrow="Popular Destinations"
            title="Highlight destination collections with a visual layout that feels premium."
            description="Use these destination cards as placeholders for future API-backed collections, promotions, or user-personalized recommendations."
          />

          <div className="destination-grid">
            {destinations.map((destination) => (
              <DestinationCard
                key={`${destination.city}-${destination.country}`}
                destination={destination}
              />
            ))}
          </div>
        </section>

        <section className="benefits-section">
          <SectionTitle
            eyebrow="Portal Experience"
            title="Built to feel fast, flexible, and ready for real booking flows."
            description="The design focuses on trust signals, clear pricing, and strong visual hierarchy so the later integration has a polished frontend foundation."
          />

          <div className="benefit-grid">
            {experienceHighlights.map((item) => (
              <article key={item.title} className="benefit-card reveal reveal-3">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <SectionTitle
            eyebrow="Traveler Voices"
            title="Social proof blocks that work well in booking funnels."
            description="These testimonials are mock content for now, but the cards are structured so they can be hydrated from your booking backend later."
          />

          <div className="testimonial-grid">
            {travelerStories.map((story) => (
              <article key={story.name} className="testimonial-card">
                <p>"{story.quote}"</p>
                <div>
                  <strong>{story.name}</strong>
                  <span>{story.trip}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomeScreen;
