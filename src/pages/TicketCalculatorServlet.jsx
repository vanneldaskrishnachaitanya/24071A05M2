import { useState, useEffect } from 'react';
import { MOVIES } from '../data';

const SEAT_TYPES = [
  { key: 'standard', label: 'Standard', emoji: '🪑', multiplier: 1.0, desc: 'Rows C–H' },
  { key: 'premium',  label: 'Premium',  emoji: '⭐', multiplier: 1.5, desc: 'Rows A–B' },
];

export default function TicketCalculatorServlet({ onBack }) {
  const [selectedMovie, setSelectedMovie] = useState(MOVIES[0]);
  const [seatType,      setSeatType]      = useState('standard');
  const [ticketCount,   setTicketCount]   = useState(1);
  const [showResult,    setShowResult]    = useState(false);
  const [animating,     setAnimating]     = useState(false);

  /* Derived values */
  const basePrice    = selectedMovie.price;
  const unitPrice    = seatType === 'premium' ? Math.round(basePrice * 1.5) : basePrice;
  const subtotal     = unitPrice * ticketCount;
  const convenience  = Math.round(subtotal * 0.05);
  const gst          = Math.round((subtotal + convenience) * 0.18);
  const grandTotal   = subtotal + convenience + gst;

  /* Reset result when inputs change */
  useEffect(() => { setShowResult(false); }, [selectedMovie, seatType, ticketCount]);

  const handleCalculate = () => {
    if (ticketCount < 1 || ticketCount > 10) return;
    setAnimating(true);
    setTimeout(() => { setShowResult(true); setAnimating(false); }, 420);
  };

  const handleCountChange = (e) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) setTicketCount(Math.min(10, Math.max(1, v)));
  };

  const adjust = (delta) => {
    setTicketCount(prev => Math.min(10, Math.max(1, prev + delta)));
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 780 }}>

        {/* Header */}
        <div className="section-header">
          <div>
            <div className="section-title">🎟️ Ticket Price Calculator</div>
            <div className="section-sub">Enter number of tickets to see your total cost</div>
          </div>
          {onBack && (
            <button className="btn btn-glass" onClick={onBack}>← Back</button>
          )}
        </div>

        {/* Main Card */}
        <div className="glass" style={{ padding: 32, marginBottom: 24 }}>

          {/* Step 1 – Movie */}
          <div style={{ marginBottom: 28 }}>
            <div className="field-label" style={{ marginBottom: 12 }}>
              Step 1 — Select Movie
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 10,
            }}>
              {MOVIES.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMovie(m)}
                  style={{
                    background: selectedMovie.id === m.id
                      ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${selectedMovie.id === m.id
                      ? 'rgba(167,139,250,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 14,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    boxShadow: selectedMovie.id === m.id
                      ? '0 0 16px rgba(167,139,250,0.2)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 24 }}>{m.emoji}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: selectedMovie.id === m.id ? 'var(--accent)' : 'var(--text-primary)',
                    lineHeight: 1.2,
                  }}>
                    {m.title}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    ₹{m.price} / seat
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 – Seat type */}
          <div style={{ marginBottom: 28 }}>
            <div className="field-label" style={{ marginBottom: 12 }}>
              Step 2 — Seat Type
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {SEAT_TYPES.map(t => (
                <button
                  key={t.key}
                  onClick={() => setSeatType(t.key)}
                  className={`btn ${seatType === t.key ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '14px 28px', gap: 8, fontSize: 15 }}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                  <span style={{
                    fontSize: 12,
                    color: seatType === t.key ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
                  }}>
                    {t.desc} · ₹{t.key === 'premium'
                      ? Math.round(selectedMovie.price * 1.5)
                      : selectedMovie.price}/seat
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 – Number of tickets */}
          <div style={{ marginBottom: 32 }}>
            <div className="field-label" style={{ marginBottom: 12 }}>
              Step 3 — Number of Tickets
              <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>
                (max 10)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 260 }}>
              <button
                onClick={() => adjust(-1)}
                disabled={ticketCount <= 1}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: ticketCount <= 1 ? 'rgba(255,255,255,0.04)' : 'rgba(167,139,250,0.15)',
                  border: `1px solid ${ticketCount <= 1 ? 'rgba(255,255,255,0.08)' : 'rgba(167,139,250,0.4)'}`,
                  color: ticketCount <= 1 ? 'var(--text-muted)' : 'var(--accent)',
                  fontSize: 22, fontWeight: 700, cursor: ticketCount <= 1 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease', flexShrink: 0,
                }}
              >
                −
              </button>

              <input
                type="number"
                className="field-input"
                value={ticketCount}
                onChange={handleCountChange}
                min={1}
                max={10}
                style={{
                  textAlign: 'center', fontSize: 24, fontWeight: 800,
                  padding: '10px 12px', letterSpacing: 1,
                }}
              />

              <button
                onClick={() => adjust(1)}
                disabled={ticketCount >= 10}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: ticketCount >= 10 ? 'rgba(255,255,255,0.04)' : 'rgba(167,139,250,0.15)',
                  border: `1px solid ${ticketCount >= 10 ? 'rgba(255,255,255,0.08)' : 'rgba(167,139,250,0.4)'}`,
                  color: ticketCount >= 10 ? 'var(--text-muted)' : 'var(--accent)',
                  fontSize: 22, fontWeight: 700, cursor: ticketCount >= 10 ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s ease', flexShrink: 0,
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            className="btn btn-gold btn-full"
            onClick={handleCalculate}
            disabled={animating}
            style={{ fontSize: 16, padding: '16px 32px', maxWidth: 320 }}
          >
            {animating ? '⏳ Calculating...' : '🧮 Calculate Total Cost'}
          </button>
        </div>

        {/* Result Panel */}
        {showResult && (
          <div
            className="glass-strong"
            style={{
              padding: 28,
              animation: 'pageIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
              border: '1px solid rgba(167,139,250,0.35)',
              boxShadow: '0 0 40px rgba(167,139,250,0.12)',
            }}
          >
            {/* Movie + type summary */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24,
              padding: 16, background: 'rgba(255,255,255,0.04)',
              borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: 44 }}>{selectedMovie.emoji}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17 }}>{selectedMovie.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>
                  {ticketCount} × {seatType === 'premium' ? 'Premium' : 'Standard'} Seat
                  {ticketCount > 1 ? 's' : ''}
                  &nbsp;·&nbsp;₹{unitPrice} per ticket
                </div>
              </div>
            </div>

            {/* Breakdown rows */}
            {[
              { label: `Base Price (${ticketCount} × ₹${unitPrice})`, value: `₹${subtotal.toLocaleString()}` },
              { label: 'Convenience Fee (5%)',                         value: `₹${convenience.toLocaleString()}` },
              { label: 'GST (18%)',                                    value: `₹${gst.toLocaleString()}` },
            ].map(row => (
              <div
                key={row.label}
                className="summary-row"
                style={{ fontSize: 15, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}

            {/* Grand Total */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 20, padding: '18px 0 0',
            }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}>Total Amount</span>
              <span style={{
                fontSize: 32, fontWeight: 900,
                background: 'linear-gradient(135deg,#fbbf24,#f472b6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <div style={{
              marginTop: 10, fontSize: 12,
              color: 'var(--text-muted)', textAlign: 'right',
            }}>
              All taxes included · Price in Indian Rupees
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
