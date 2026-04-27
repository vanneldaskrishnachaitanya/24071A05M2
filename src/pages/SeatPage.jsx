import { useState } from 'react';
import { generateSeats } from '../data';

export default function SeatsPage({ booking, onContinue, onBack }) {
  const [seats]    = useState(generateSeats);
  const [selected, setSelected] = useState([]);

  const toggle = (seat) => {
    if (seat.booked) return;
    setSelected(prev =>
      prev.some(s => s.id === seat.id)
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalPrice = selected.reduce(
    (s, seat) => s + (seat.premium ? booking.price * 1.5 : booking.price), 0
  );

  return (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-title">Select Your Seats</div>
            <div className="section-sub">{booking.title} · {booking.showtime} · {booking.date}</div>
          </div>
          <button className="btn btn-glass" onClick={onBack}>← Back</button>
        </div>

        <div className="glass" style={{ padding: 32, marginBottom: 24, maxWidth: 700, margin: '0 auto 24px' }}>
          <div className="screen-wrap">
            <div className="screen" />
            <div className="screen-label">Screen · All eyes this way</div>
          </div>

          <div className="seat-layout">
            {seats.map(row => (
              <div key={row.row} className="seat-row">
                <div className="seat-row-label">{row.row}</div>
                {row.seats.map((seat, i) => (
                  <div key={seat.id} style={{ display: 'contents' }}>
                    {i === 6 && <div className="seat-gap" />}
                    <div
                      className={`seat ${seat.booked ? 'booked' : selected.some(s => s.id === seat.id) ? 'selected' : 'available'} ${seat.premium ? 'premium' : ''}`}
                      onClick={() => toggle(seat)}
                      title={seat.booked ? 'Booked' : seat.premium ? 'Premium' : 'Standard'}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
              Available
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }} />
              Selected
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: 'rgba(255,255,255,0.04)', opacity: 0.4 }} />
              Booked
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }} />
              Premium
            </div>
          </div>
        </div>

        {selected.length > 0 ? (
          <div className="float-amount">
            <div className="float-amount-label">{selected.length} Seat{selected.length > 1 ? 's' : ''} · {selected.map(s => s.id).join(', ')}</div>
            <div className="float-amount-value">₹{totalPrice.toLocaleString()}</div>
            <button className="btn btn-primary btn-full" style={{ marginTop: 12 }} onClick={() => onContinue({ selected, totalPrice })}>
              Continue to Payment →
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px 0' }}>
            Click on seats to select them
          </div>
        )}
      </div>
    </div>
  );
}