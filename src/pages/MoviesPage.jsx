import { useState } from 'react';
import { MOVIES } from '../data';

const GENRES = ["All","Sci-Fi","Action","Thriller","Romance","Horror","Drama","Adventure"];

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-poster">
        <span style={{ fontSize: 90, position: 'relative', zIndex: 1 }}>{movie.emoji}</span>
        <div className="movie-rating">⭐ {movie.rating}</div>
        <div className="movie-genre-badge">{movie.genre}</div>
        {movie.badge && (
          <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
            <span className={`badge badge-${movie.badge}`}>
              {movie.badge === 'hot' ? '🔥 Hot' : '✨ New'}
            </span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-meta">{movie.year} · {movie.duration}</div>
        <div className="movie-tags">
          {movie.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function MoviesPage({ onSelect }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = MOVIES.filter(m => {
    const matchGenre  = filter === 'All' || m.genre === filter;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <div className="hero-title">Now Showing</div>
          <div className="hero-sub">Pick your film. Choose your seat. Experience the magic.</div>
        </div>

        <div className="search-bar">
          <span style={{ fontSize: 18, opacity: 0.5 }}>🔍</span>
          <input
            className="search-input"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <span style={{ cursor: 'pointer', opacity: 0.5, fontSize: 18 }} onClick={() => setSearch('')}>✕</span>
          )}
        </div>

        <div className="filter-bar">
          {GENRES.map(g => (
            <button key={g} className={`filter-btn ${filter === g ? 'active' : ''}`} onClick={() => setFilter(g)}>
              {g}
            </button>
          ))}
        </div>

        <div className="movies-grid">
          {filtered.map(movie => <MovieCard key={movie.id} movie={movie} onClick={onSelect} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 60 }}>🎬</div>
            <div style={{ fontSize: 18, marginTop: 16 }}>No movies found</div>
            <div style={{ fontSize: 14, marginTop: 8 }}>Try a different search or filter</div>
          </div>
        )}
      </div>
    </div>
  );
}