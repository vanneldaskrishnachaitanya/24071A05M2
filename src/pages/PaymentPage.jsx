import { useState } from 'react';

const WALLET_OPTIONS  = [{n:"Paytm",e:"💰"},{n:"PhonePe",e:"📵"},{n:"GPay",e:"🔵"},{n:"Amazon Pay",e:"🛒"},{n:"MobiKwik",e:"💸"},{n:"FreeCharge",e:"⚡"}];
const BANK_OPTIONS    = [{n:"SBI",e:"🏦"},{n:"HDFC",e:"💙"},{n:"ICICI",e:"🟠"},{n:"Axis",e:"🔴"},{n:"Kotak",e:"🟡"},{n:"Yes Bank",e:"🟢"}];

export default function PaymentPage({ booking, seatData, user, onPay, onBack }) {
  const [cardNum,  setCardNum]  = useState('');
  const [cardName, setCardName] = useState(user?.name?.toUpperCase() || '');
  const [expiry,   setExpiry]   = useState('');
  const [cvv,      setCvv]      = useState('');
  const [method,   setMethod]   = useState('card');
  const [loading,  setLoading]  = useState(false);
  const [err,      setErr]      = useState('');

  const formatCard = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExp  = v => { const d = v.replace(/\D/g,'').slice(0,4); return d.length > 2 ? d.slice(0,2) + '/' + d.slice(2) : d; };

  const convenience = Math.round(seatData.totalPrice * 0.05);
  const gst         = Math.round((seatData.totalPrice + convenience) * 0.18);
  const grand       = seatData.totalPrice + convenience + gst;

  const pay = () => {
    if (method === 'card') {
      if (!cardNum || cardNum.replace(/\s/g,'').length < 16) { setErr('Enter a valid 16-digit card number.'); return; }
      if (!cardName)  { setErr('Enter cardholder name.'); return; }
      if (!expiry || expiry.length < 5) { setErr('Enter a valid expiry date.'); return; }
      if (!cvv || cvv.length < 3)       { setErr('Enter a valid CVV.'); return; }
    }
    setErr(''); setLoading(true);
    setTimeout(() => { setLoading(false); onPay({ grand, method }); }, 2000);
  };

  const displayCard = cardNum || '•••• •••• •••• ••••';

  return (
    <div className="page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="section-title">Secure Payment</div>
            <div className="section-sub">Complete your booking for {booking.title}</div>
          </div>
          <button className="btn btn-glass" onClick={onBack}>← Back</button>
        </div>

        <div className="payment-layout">
          {/* LEFT PANEL */}
          <div>
            <div className="glass" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Payment Method</div>

              {/* METHOD SWITCHER */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                {[{k:'card',icon:'💳',label:'Card'},{k:'upi',icon:'📱',label:'UPI'},{k:'wallet',icon:'👛',label:'Wallet'},{k:'netbank',icon:'🏦',label:'Net Banking'}].map(m => (
                  <button key={m.k} onClick={() => setMethod(m.k)}
                    className={`btn ${method === m.k ? 'btn-primary' : 'btn-glass'}`}
                    style={{ padding: '10px 20px', fontSize: 13 }}>
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>

              {/* CARD */}
              {method === 'card' && (
                <>
                  <div className="card-visual">
                    <div className="card-shine" />
                    <div className="card-brand">💳</div>
                    <div className="card-chip">💠</div>
                    <div className="card-number">{displayCard}</div>
                    <div className="card-footer">
                      <div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Card Holder</div>
                        <div className="card-name">{cardName || 'YOUR NAME'}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Expires</div>
                        <div className="card-exp">{expiry || 'MM/YY'}</div>
                      </div>
                    </div>
                  </div>
                  {err && <div className="alert-box alert-error">⚠ {err}</div>}
                  <div className="field-group">
                    <div className="field-label">Card Number</div>
                    <input className="field-input" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className="field-group">
                    <div className="field-label">Cardholder Name</div>
                    <input className="field-input" value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="AS ON CARD" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="field-group">
                      <div className="field-label">Expiry Date</div>
                      <input className="field-input" value={expiry} onChange={e => setExpiry(formatExp(e.target.value))} placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div className="field-group">
                      <div className="field-label">CVV</div>
                      <input className="field-input" value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,'').slice(0,3))} placeholder="•••" type="password" maxLength={3} />
                    </div>
                  </div>
                </>
              )}

              {/* UPI */}
              {method === 'upi' && (
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 32, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 60, marginBottom: 16 }}>📱</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Scan QR or Enter UPI ID</div>
                  <div style={{ width: 140, height: 140, background: 'rgba(255,255,255,0.08)', borderRadius: 16, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, border: '1px solid rgba(255,255,255,0.1)' }}>📲</div>
                  <div className="field-group" style={{ maxWidth: 300, margin: '0 auto' }}>
                    <input className="field-input" placeholder="yourname@upi" style={{ textAlign: 'center' }} />
                  </div>
                </div>
              )}

              {/* WALLET / NETBANK */}
              {(method === 'wallet' || method === 'netbank') && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                  {(method === 'wallet' ? WALLET_OPTIONS : BANK_OPTIONS).map(b => (
                    <button key={b.n} className="btn btn-glass" style={{ flexDirection: 'column', padding: '16px 12px', fontSize: 12, gap: 6 }}>
                      <span style={{ fontSize: 24 }}>{b.e}</span>{b.n}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="btn btn-gold btn-full" onClick={pay} style={{ fontSize: 17, padding: '18px 32px' }}>
              {loading ? '⏳ Processing Payment...' : `🔒 Pay ₹${grand.toLocaleString()}`}
            </button>
            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
              🔐 256-bit SSL secured · Your data is safe
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <div className="summary-title">🎬 Order Summary</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 40 }}>{booking.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{booking.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{booking.date} · {booking.showtime}</div>
              </div>
            </div>
            <div className="summary-row"><span>Seats ({seatData.selected.length})</span><span>{seatData.selected.map(s => s.id).join(', ')}</span></div>
            <div className="summary-row"><span>Base Price</span><span>₹{seatData.totalPrice.toLocaleString()}</span></div>
            <div className="summary-row"><span>Convenience Fee</span><span>₹{convenience}</span></div>
            <div className="summary-row"><span>GST (18%)</span><span>₹{gst}</span></div>
            <div className="summary-row summary-total"><span>Total</span><span style={{ color: 'var(--accent)' }}>₹{grand.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}