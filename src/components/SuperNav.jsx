import React from 'react';

const STEPS = [
  { id: "movies",       icon: "🎬", label: "Movies"  },
  { id: "seats",        icon: "💺", label: "Seats"   },
  { id: "payment",      icon: "💳", label: "Payment" },
  { id: "confirmation", icon: "✅", label: "Confirm" },
];

const PAGE_ORDER = ["login","register","movies","seats","payment","confirmation"];

export default function SuperNav({ page, user, onLogoClick, onNavStep, onLogout }) {
  const isAuth = page === "login" || page === "register";
  const pageIdx = PAGE_ORDER.indexOf(page);

  return (
    <nav className="supernav">
      <div className="nav-logo" onClick={onLogoClick}>
        <span>🎭</span> CineVerse
      </div>

      {!isAuth && (
        <div className="nav-steps">
          {STEPS.map((step, i) => {
            const stepIdx = PAGE_ORDER.indexOf(step.id);
            const isActive   = page === step.id;
            const isDone     = pageIdx > stepIdx && stepIdx >= 0;
            return (
              <React.Fragment key={step.id}>
                {i > 0 && <div className="nav-sep">›</div>}
                <div
                  className={`nav-step ${isActive ? "active" : ""} ${isDone ? "completed" : ""}`}
                  onClick={() => isDone && onNavStep(step.id)}
                  style={{ cursor: isDone ? "pointer" : "default" }}
                >
                  <span className="nav-step-icon">{isDone ? "✓" : step.icon}</span>
                  <span>{step.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {user ? (
          <>
            <div className="nav-avatar" title={user.name}>
              {user.name[0].toUpperCase()}
            </div>
            <button type="button" className="nav-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <div style={{ fontSize:"13px", color:"var(--text-muted)" }}>Guest</div>
        )}
      </div>
    </nav>
  );
}