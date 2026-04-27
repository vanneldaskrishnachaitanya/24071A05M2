import { useState } from 'react';

export default function RegisterPage({ onRegister, onGoto }) {
  const [form, setForm] = useState({ name: '', email: '', pass: '', confirm: '' });
  const [err, setErr]   = useState('');
  const [loading, setLoading] = useState(false);

  const handle = () => {
    if (!form.name || !form.email || !form.pass || !form.confirm) { setErr('All fields are required.'); return; }
    if (!form.email.includes('@')) { setErr('Enter a valid email.'); return; }
    if (form.pass.length < 6)       { setErr('Password must be at least 6 characters.'); return; }
    if (form.pass !== form.confirm) { setErr("Passwords don't match."); return; }
    setLoading(true); setErr('');
    setTimeout(() => { setLoading(false); onRegister({ name: form.name, email: form.email }); }, 1400);
  };

  const F = key => ({
    className: 'field-input',
    value: form[key],
    onChange: e => setForm(p => ({ ...p, [key]: e.target.value })),
    onKeyDown: e => e.key === 'Enter' && handle(),
  });

  return (
    <div className="page auth-wrap">
      <div className="auth-card">
        <div className="auth-icon">🌟</div>
        <div className="auth-title">Join CineVerse</div>
        <div className="auth-sub">Create your account and start booking today</div>

        {err && <div className="alert-box alert-error">⚠ {err}</div>}

        <div className="field-group"><div className="field-label">Full Name</div><input {...F('name')} type="text" placeholder="Alex Johnson" /></div>
        <div className="field-group"><div className="field-label">Email</div><input {...F('email')} type="email" placeholder="you@example.com" /></div>
        <div className="field-group"><div className="field-label">Password</div><input {...F('pass')} type="password" placeholder="Min 6 characters" /></div>
        <div className="field-group"><div className="field-label">Confirm Password</div><input {...F('confirm')} type="password" placeholder="Repeat password" /></div>

        <button className="btn btn-primary btn-full" onClick={handle} style={{ marginTop: 8 }}>
          {loading ? '⏳ Creating account...' : '🚀 Create Account'}
        </button>

        <div className="auth-footer">
          Already have an account?{' '}
          <span className="auth-link" onClick={() => onGoto('login')}>Sign in</span>
        </div>
      </div>
    </div>
  );
}