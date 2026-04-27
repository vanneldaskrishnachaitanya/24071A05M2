import { useState } from 'react';

const DATES = ["Today, Apr 27","Tomorrow, Apr 28","Fri, Apr 29","Sat, Apr 30","Sun, May 1"];

export default function MovieDetailPage({ movie, onBook, onBack }) {
  const [showtime, setShowtime] = useState(null);
  const [dateIdx, setDateIdx]   = useState(0);

  return (
    <div className="page">
      <div className="container">

        <div className="movie-detail-hero">
          <div className="movie-detail-poster">{movie.emoji}</div>
          <div className="movie-detail-info">
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {movie.badge && (
                <span className={`badge badge-${movie.badge}`}>
                  {movie.badge === 'hot' ? '🔥 Hot' : '✨ New'}
                </span>
              )}
              {movie.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div className="movie-detail-title">{movie.title}</div>
            <div className="movie-detail-meta">
              <span>⭐ {movie.rating}/10</span>
              <span>🕐 {movie.duration}</span>
              <span>📅 {movie.year}</span>
              <span>🎭 {movie.genre}</span>
            </div>
            <div className="movie-detail-desc">{movie.desc}</div>

            {/* DATE PICKER */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
              {DATES.map((d, i) => (
                <button
                  key={i}
                  className={`showtime-btn ${dateIdx === i ? 'active' : ''}`}
                  onClick={() => { setDateIdx(i); setShowtime(null); }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600, color: dateIdx === i ? 'var(--accent)' : 'var(--text-secondary)' }}>
                    {d.split(',')[0]}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.split(',')[1]?.trim()}</div>
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Available Showtimes
            </div>
            <div className="showtime-grid">
              {movie.showtimes.map(t => (
                <button key={t} className={`showtime-btn ${showtime === t ? 'active' : ''}`} onClick={() => setShowtime(t)}>
                  <div className="showtime-time">{t}</div>
                  <div className="showtime-type">{movie.tags[0] || 'Standard'}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn btn-glass" onClick={onBack}>← Back to Movies</button>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
            {showtime ? `${DATES[dateIdx]} · ${showtime}` : 'Select a showtime to continue'}
          </div>
          <button
            className={`btn ${showtime ? 'btn-primary' : 'btn-glass'}`}
            onClick={() => showtime && onBook({ ...movie, showtime, date: DATES[dateIdx] })}
            style={{ minWidth: 200 }}
          >
            {showtime ? '💺 Select Seats' : 'Pick a Showtime First'}
          </button>
        </div>
      </div>
    </div>
  );
}