import { useState } from 'react';

export default function LoginPage({ onLogin, onGoto }) {
  const [email, setEmail]   = useState('');
  const [pass, setPass]     = useState('');
  const [err, setErr]       = useState('');
  const [shake, setShake]   = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = () => {
    if (!email || !pass) {
      setErr('Please fill in all fields.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (!email.includes('@')) { setErr('Enter a valid email.'); return; }
    setLoading(true); setErr('');
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: email.split('@')[0], email });
    }, 1200);
  };

  return (
    <div className="page auth-wrap">
      <div className={`auth-card ${shake ? 'shake' : ''}`}>
        <div className="auth-icon">🎭</div>
        <div className="auth-title">Welcome Back</div>
        <div className="auth-sub">Sign in to continue your cinematic journey</div>

        {err && <div className="alert-box alert-error">⚠ {err}</div>}

        <div className="field-group">
          <div className="field-label">Email Address</div>
          <input
            className="field-input" type="email" placeholder="you@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handle()}
          />
        </div>
        <div className="field-group">
          <div className="field-label">Password</div>
          <input
            className="field-input" type="password" placeholder="••••••••"
            value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handle()}
          />
        </div>

        <button className="btn btn-primary btn-full" onClick={handle} style={{ marginTop: 8 }}>
          {loading ? '⏳ Signing in...' : '✨ Sign In'}
        </button>

        <div className="auth-footer">
          Don't have an account?{' '}
          <span className="auth-link" onClick={() => onGoto('register')}>Create one</span>
        </div>
      </div>
    </div>
  );
}