import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { startTransition, useDeferredValue, useEffect, useRef, useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import RegistrationPage from './screens/RegistrationPage';
import BookingHistoryPage from './screens/BookingHistoryPage';
import {
  destinationCards,
  travelPackages
} from './data/travelData';

function App() {
  const [bookingMode, setBookingMode] = useState('Packages');
  const [activeTheme, setActiveTheme] = useState('All');
  const [packages, setPackages] = useState(travelPackages);
  const [destinations, setDestinations] = useState(destinationCards);
  const [selectedPackageId, setSelectedPackageId] = useState(travelPackages[0]?.id);
  const [query, setQuery] = useState('');
  const [formValues, setFormValues] = useState({
    destination: '',
    month: 'November 2026',
    travelers: '2',
    budget: 'Any budget',
    travelerName: '', 
    travelerEmail: '',
    travelerPhone: ''
  });
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [packagesRes, destinationsRes] = await Promise.all([
          fetch('/api/packages'),
          fetch('/api/destinations')
        ]);

        if (packagesRes.ok) {
          const packageData = await packagesRes.json();
          if (packageData.length > 0) {
            setPackages(packageData);
            setSelectedPackageId(packageData[0].id);
          }
        }

        if (destinationsRes.ok) {
          const destinationData = await destinationsRes.json();
          if (destinationData.length > 0) {
            setDestinations(destinationData);
          }
        }
      } catch (error) {
        console.warn('Backend unreachable, using local sample data.', error);
      }
    }

    fetchData();
  }, []);

  const handleReserve = async () => {
    const reservation = {
      packageId: selectedPackageId,
      travelers: Number(formValues.travelers),
      month: formValues.month,
      budget: formValues.budget,
      bookingMode,
      destination: formValues.destination,
      travelerName: formValues.travelerName,
      travelerEmail: formValues.travelerEmail,
      travelerPhone: formValues.travelerPhone
    };

    setBookingStatus('Saving reservation...');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unable to save reservation');
      }

      const result = await response.json();
      setBookingStatus(`Reservation confirmed for ${result.title}. Booking #${result.id}`);
    } catch (error) {
      setBookingStatus(`Failed to reserve trip: ${error.message}`);
    }
  };

  const packagesRef = useRef(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const visiblePackages = packages.filter((travelPackage) => {
    const matchesTheme = activeTheme === 'All' || travelPackage.theme === activeTheme;
    const matchesQuery =
      deferredQuery.length === 0 ||
      travelPackage.title.toLowerCase().includes(deferredQuery) ||
      travelPackage.location.toLowerCase().includes(deferredQuery) ||
      travelPackage.highlight.toLowerCase().includes(deferredQuery);

    return matchesTheme && matchesQuery;
  });

  useEffect(() => {
    if (!visiblePackages.some((travelPackage) => travelPackage.id === selectedPackageId)) {
      setSelectedPackageId((visiblePackages[0] ?? packages[0]).id);
    }
  }, [selectedPackageId, visiblePackages, packages]);

  const selectedPackage =
    visiblePackages.find((travelPackage) => travelPackage.id === selectedPackageId) ??
    packages[0];

  const handleFormFieldChange = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleModeChange = (mode) => {
    startTransition(() => {
      setBookingMode(mode);
    });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    startTransition(() => {
      setQuery(formValues.destination);
    });

    packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleQueryChange = (value) => {
    setQuery(value);
  };

  const handleThemeChange = (theme) => {
    setActiveTheme(theme);
  };

  const handleSelectPackage = (packageId) => {
    setSelectedPackageId(packageId);
  };

  return (
    <BrowserRouter>
      <div className="page-container">
        <nav className="top-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Register Traveler
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Booking History
          </NavLink>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                bookingMode={bookingMode}
                activeTheme={activeTheme}
                formValues={formValues}
                visiblePackages={visiblePackages}
                destinations={destinations}
                selectedPackage={selectedPackage}
                bookingStatus={bookingStatus}
                onModeChange={handleModeChange}
                onFieldChange={handleFormFieldChange}
                onThemeChange={handleThemeChange}
                onSearchSubmit={handleSearchSubmit}
                onSelectPackage={handleSelectPackage}
                onReserve={handleReserve}
                onQueryChange={handleQueryChange}
                query={query}
                packagesRef={packagesRef}
              />
            }
          />
          <Route path="/register" element={<RegistrationPage packages={packages} />} />
          <Route path="/history" element={<BookingHistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
