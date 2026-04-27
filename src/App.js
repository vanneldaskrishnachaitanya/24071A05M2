import { useEffect, useState } from 'react';
import styles from './styles';
import SuperNav from './components/SuperNav';
import Toast from './components/Toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SeatsPage from './pages/SeatPage';
import PaymentPage from './pages/PaymentPage';
import TicketCalculatorServlet from './pages/TicketCalculatorServlet';

const USER_STORAGE_KEY = 'cineverse-user';

function getStoredUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

function ConfirmationPage({ booking, seatData, payment, user, onReset, onLogout }) {
  const seats = seatData?.selected?.map((seat) => seat.id).join(', ') || 'No seats selected';
  return (
    <div className="page confirm-wrap">
      <div className="confirm-card">
        <div className="confirm-icon">✅</div>
        <div className="auth-title" style={{ marginBottom: 10 }}>Booking Confirmed</div>
        <div className="auth-sub">Your tickets are ready, {user?.name || 'guest'}.</div>

        <div className="ticket-barcode">{booking?.title || 'CineVerse Ticket'}</div>

        <div className="ticket-detail">
          <span className="ticket-detail-label">Movie</span>
          <span className="ticket-detail-value">{booking?.title || '-'}</span>
        </div>
        <div className="ticket-detail">
          <span className="ticket-detail-label">Showtime</span>
          <span className="ticket-detail-value">{booking?.date || '-'} · {booking?.showtime || '-'}</span>
        </div>
        <div className="ticket-detail">
          <span className="ticket-detail-label">Seats</span>
          <span className="ticket-detail-value">{seats}</span>
        </div>
        <div className="ticket-detail">
          <span className="ticket-detail-label">Payment</span>
          <span className="ticket-detail-value">{payment?.method || 'card'}</span>
        </div>
        <div className="ticket-detail">
          <span className="ticket-detail-label">Total Paid</span>
          <span className="ticket-detail-value">₹{payment?.grand?.toLocaleString?.() || '0'}</span>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-full" onClick={onReset} style={{ flex: '1 1 180px' }}>
            Book Another Movie
          </button>
          <button className="btn btn-glass btn-full" onClick={onLogout} style={{ flex: '1 1 140px' }}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => getStoredUser());
  const [page, setPage] = useState(() => (getStoredUser() ? 'movies' : 'login'));
  const [booking, setBooking] = useState(null);
  const [seatData, setSeatData] = useState(null);
  const [payment, setPayment] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-cineverse-styles', 'true');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);

    return () => {
      styleTag.remove();
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const showToast = (message) => {
    setToast(message);
  };

  const resetFlow = () => {
    setBooking(null);
    setSeatData(null);
    setPayment(null);
    setPage('movies');
  };

  const handleLogin = (nextUser) => {
    setUser(nextUser);
    resetFlow();
    showToast(`Welcome back, ${nextUser.name}!`);
  };

  const handleRegister = (nextUser) => {
    setUser(nextUser);
    resetFlow();
    showToast(`Account created for ${nextUser.name}.`);
  };

  const handleSelectMovie = (movie) => {
    setBooking(movie);
    setSeatData(null);
    setPayment(null);
    setPage('details');
  };

  const handleBook = (movieBooking) => {
    setBooking(movieBooking);
    setSeatData(null);
    setPayment(null);
    setPage('seats');
  };

  const handleContinueToPayment = (nextSeatData) => {
    setSeatData(nextSeatData);
    setPage('payment');
  };

  const handlePay = (nextPayment) => {
    setPayment(nextPayment);
    setPage('confirmation');
    showToast(`Payment successful for ₹${nextPayment.grand.toLocaleString()}`);
  };

  const navPage = page === 'details' ? 'movies' : page;

  const canNavigateTo = (step) => {
    if (step === 'movies') return true;
    if (step === 'seats') return Boolean(booking);
    if (step === 'payment') return Boolean(seatData);
    if (step === 'confirmation') return Boolean(payment);
    return false;
  };

  const handleNavStep = (step) => {
    if (canNavigateTo(step)) {
      setPage(step);
    }
  };

  const handleLogoClick = () => {
    if (user) {
      resetFlow();
      return;
    }

    setPage('login');
  };

  const handleLogout = () => {
    setUser(null);
    setBooking(null);
    setSeatData(null);
    setPayment(null);
    setPage('login');
  };

  return (
    <>
      <div className="bg-canvas" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <SuperNav
        page={navPage}
        user={user}
        onLogoClick={handleLogoClick}
        onNavStep={handleNavStep}
        onLogout={handleLogout}
      />

      {page === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onGoto={setPage}
        />
      )}

      {page === 'register' && (
        <RegisterPage
          onRegister={handleRegister}
          onGoto={setPage}
        />
      )}

      {page === 'movies' && (
        <MoviesPage onSelect={handleSelectMovie} />
      )}

      {page === 'details' && booking && (
        <MovieDetailPage
          movie={booking}
          onBook={handleBook}
          onBack={() => setPage('movies')}
        />
      )}

      {page === 'seats' && booking && (
        <SeatsPage
          booking={booking}
          onContinue={handleContinueToPayment}
          onBack={() => setPage('details')}
        />
      )}

      {page === 'payment' && booking && seatData && (
        <PaymentPage
          booking={booking}
          seatData={seatData}
          user={user}
          onPay={handlePay}
          onBack={() => setPage('seats')}
        />
      )}

      {page === 'confirmation' && booking && seatData && payment && (
        <ConfirmationPage
          booking={booking}
          seatData={seatData}
          payment={payment}
          user={user}
          onReset={resetFlow}
          onLogout={handleLogout}
        />
      )}

      {page === 'calculator' && (
        <TicketCalculatorServlet onBack={() => setPage(user ? 'movies' : 'login')} />
      )}

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}

      {page !== 'calculator' && (
        <footer className="app-footer" aria-label="Application footer">
          <div className="app-footer-center">
            <span className="app-footer-brand">CineVerse</span>
            <span>24071A05M2</span>
            <button
              onClick={() => setPage('calculator')}
              style={{
                background: 'none', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 999, padding: '4px 14px', color: 'rgba(255,255,255,0.55)',
                fontSize: 12, cursor: 'pointer', marginLeft: 8,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(167,139,250,0.4)'; e.target.style.color = '#a78bfa'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.color = 'rgba(255,255,255,0.55)'; }}
            >
              🎟️ Price Calculator
            </button>
          </div>
        </footer>
      )}
    </>
  );
}