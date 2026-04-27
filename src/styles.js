const styles = `
  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --bg: #f5f6f8;
    --surface: #ffffff;
    --surface-soft: #f0f2f5;
    --border: #d8dde3;
    --text: #1f2937;
    --muted: #6b7280;
    --accent: #2563eb;
    --accent-weak: #dbeafe;
    --success: #16a34a;
    --warning: #b45309;
    --danger: #dc2626;
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06);
    --radius: 12px;
  }

  html, body, #root { min-height: 100%; }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--bg);
    color: var(--text);
    padding-bottom: 60px;
  }

  .bg-canvas, .bg-orb { display: none; }

  .supernav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    min-height: 64px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .nav-logo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
    cursor: pointer;
    white-space: nowrap;
  }

  .nav-steps {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-content: center;
    flex: 1;
    flex-wrap: wrap;
  }

  .nav-step {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 1px solid transparent;
    border-radius: 999px;
    font-size: 13px;
    color: var(--muted);
    user-select: none;
  }

  .nav-step.active {
    color: var(--accent);
    background: var(--accent-weak);
    border-color: #bfdbfe;
  }

  .nav-step.completed { color: var(--success); }
  .nav-sep { color: var(--muted); font-size: 12px; }

  .nav-avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: var(--accent);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .nav-logout {
    border: 1px solid var(--border);
    background: var(--surface-soft);
    color: var(--text);
    border-radius: 999px;
    padding: 8px 14px;
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
  }

  .page {
    position: relative;
    min-height: calc(100vh - 64px);
    padding-top: 84px;
    padding-bottom: 24px;
  }

  .container {
    width: min(1480px, calc(100% - 24px));
    margin: 0 auto;
  }

  .hero {
    text-align: center;
    padding: 24px 0;
  }

  .hero-title {
    margin: 0 0 8px;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .hero-sub {
    margin: 0 auto;
    max-width: 560px;
    color: var(--muted);
    font-size: 16px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .field-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
  }

  .field-input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    font: inherit;
  }

  .field-input:focus {
    outline: 2px solid var(--accent-weak);
    border-color: var(--accent);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }

  .btn-glass, .btn-gold { background: var(--surface); }
  .btn-full { width: 100%; }

  .auth-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 64px);
    padding: 24px 16px;
  }

  .auth-card,
  .movie-card,
  .glass,
  .glass-strong,
  .movie-detail-hero,
  .confirm-card,
  .card-visual,
  .order-summary {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    padding: 32px 28px;
  }

  .auth-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 18px;
    border-radius: 14px;
    background: var(--accent-weak);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .auth-title { font-size: 28px; font-weight: 700; text-align: center; margin-bottom: 8px; }
  .auth-sub { text-align: center; color: var(--muted); margin-bottom: 24px; }
  .auth-footer { margin-top: 16px; text-align: center; color: var(--muted); }
  .auth-link { color: var(--accent); cursor: pointer; font-weight: 600; }

  .movies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px 0;
  }

  .movie-card { overflow: hidden; cursor: pointer; }
  .movie-poster {
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
    background: #eef2f7;
    position: relative;
  }
  .movie-genre-badge,
  .movie-rating,
  .tag,
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface-soft);
    font-size: 12px;
  }

  .movie-info { padding: 16px; }
  .movie-title, .section-title, .summary-title, .movie-detail-title { font-weight: 700; }
  .movie-title { font-size: 18px; margin-bottom: 4px; }
  .movie-meta, .section-sub, .movie-detail-meta, .movie-detail-desc, .summary-row, .ticket-detail-label, .ticket-detail-value, .screen-label, .legend-item, .search-input::placeholder, .float-amount-label {
    color: var(--muted);
  }
  .movie-tags { display: flex; gap: 6px; flex-wrap: wrap; }

  .filter-bar,
  .seat-legend,
  .movie-detail-hero,
  .confirm-card,
  .order-summary,
  .card-visual,
  .auth-card {
    padding: 16px;
  }

  .filter-bar {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .filter-btn {
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    color: var(--text);
    font: inherit;
    cursor: pointer;
  }

  .filter-btn.active { background: var(--accent-weak); border-color: #bfdbfe; color: var(--accent); }

  .section-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
  .section-title { font-size: 26px; }
  .section-sub { font-size: 14px; }

  .seat-layout { display: flex; flex-direction: column; gap: 8px; align-items: center; }
  .seat-row { display: flex; gap: 6px; align-items: center; }
  .seat-row-label { width: 20px; text-align: right; font-size: 12px; color: var(--muted); margin-right: 4px; }
  .seat {
    width: 34px;
    height: 28px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: #fff;
    cursor: pointer;
  }
  .seat.available:hover { background: var(--accent-weak); border-color: var(--accent); }
  .seat.selected { background: var(--accent); border-color: var(--accent); }
  .seat.booked { background: #e5e7eb; cursor: not-allowed; opacity: 0.7; }
  .seat.premium.available { background: #fef3c7; }
  .seat.premium.selected { background: var(--warning); border-color: var(--warning); }

  .screen-wrap { margin-bottom: 24px; }
  .screen { height: 4px; border-radius: 999px; background: #cbd5e1; margin-bottom: 6px; }
  .screen-label { text-align: center; font-size: 12px; }
  .seat-legend { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .legend-dot { width: 18px; height: 14px; border-radius: 4px; border: 1px solid var(--border); }
  .seat-gap { width: 20px; }

  .movie-detail-hero { display: grid; gap: 16px; margin-bottom: 20px; }
  .movie-detail-hero {
    grid-template-columns: minmax(220px, 280px) 1fr;
    align-items: start;
  }
  .movie-detail-poster { font-size: 72px; }
  .movie-detail-info { min-width: 0; }
  .movie-detail-title { font-size: 30px; margin-bottom: 8px; }
  .movie-detail-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
  .movie-detail-desc { line-height: 1.6; margin-bottom: 16px; }
  .showtime-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
  .showtime-btn { padding: 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--surface); cursor: pointer; }
  .showtime-btn.active { border-color: var(--accent); background: var(--accent-weak); }
  .showtime-time { font-weight: 700; }
  .showtime-type { font-size: 12px; color: var(--muted); }

  .payment-layout { display: grid; grid-template-columns: 1fr 320px; gap: 16px; }
  @media (max-width: 768px) { .payment-layout { grid-template-columns: 1fr; } }

  .payment-layout > :first-child {
    min-width: 0;
  }

  .card-visual { min-height: 180px; margin-bottom: 16px; }
  .card-chip, .card-brand { font-size: 20px; }
  .card-number { margin: 18px 0; font-size: 18px; letter-spacing: 2px; }
  .card-footer { display: flex; justify-content: space-between; gap: 12px; }
  .card-name { font-weight: 600; }
  .card-exp { color: var(--muted); }

  .order-summary { position: sticky; top: 84px; }
  .summary-title { font-size: 18px; margin-bottom: 14px; }
  .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); }
  .summary-row:last-child { border-bottom: none; }
  .summary-total { font-weight: 700; color: var(--text); }

  .confirm-wrap { display: flex; align-items: center; justify-content: center; padding: 24px 16px; }
  .confirm-card { width: 100%; max-width: 560px; text-align: center; }
  .confirm-icon {
    width: 72px;
    height: 72px;
    border-radius: 18px;
    margin: 0 auto 18px;
    background: var(--accent-weak);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
  .ticket-barcode {
    margin: 16px 0;
    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface-soft);
    text-align: center;
    letter-spacing: 0.08em;
    color: var(--muted);
  }
  .ticket-detail { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .ticket-detail:last-of-type { border-bottom: none; }
  .ticket-detail-value { color: var(--text); }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    margin-bottom: 16px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
  }
  .search-input { flex: 1; border: 0; outline: 0; background: transparent; font: inherit; color: var(--text); }

  .alert-box {
    padding: 12px 14px;
    border-radius: 10px;
    margin-bottom: 16px;
    border: 1px solid var(--border);
    background: var(--surface-soft);
  }
  .alert-error { border-color: #fca5a5; background: #fef2f2; color: var(--danger); }

  .badge-new, .badge-hot {
    border-color: var(--border);
    background: var(--surface-soft);
  }

  .float-amount {
    position: fixed;
    right: 16px;
    bottom: 76px;
    z-index: 900;
    min-width: 180px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    box-shadow: var(--shadow);
  }
  .float-amount-value { font-size: 24px; font-weight: 700; color: var(--accent); }

  .toast {
    position: fixed;
    left: 50%;
    bottom: 72px;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 12px 16px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--surface);
    box-shadow: var(--shadow);
  }

  .app-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1200;
    min-height: 56px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-top: 1px solid var(--border);
    background: var(--surface);
    color: var(--muted);
  }
  .app-footer-center { display: inline-flex; gap: 10px; align-items: center; }
  .app-footer-brand { color: var(--text); font-weight: 700; }

  .shake { animation: none; }

  .movie-card:hover, .btn:hover, .btn-primary:hover, .filter-btn:hover, .showtime-btn:hover, .nav-logout:hover { filter: brightness(0.98); }

  @media (max-width: 960px) {
    .movie-detail-hero {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .supernav { flex-wrap: wrap; justify-content: center; }
    .nav-steps { order: 3; flex-basis: 100%; }
    .section-header { flex-direction: column; align-items: flex-start; }
  }
`;

export default styles;