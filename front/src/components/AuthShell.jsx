import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkle, Cap, Back, Lock } from './Icons';

export function Field({ id, label, icon, bad, hint, trailing, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-wrapper">
        <span className="input-icon" aria-hidden="true">{icon}</span>
        <input id={id} className={'form-input' + (bad ? ' is-invalid' : '') + (trailing ? ' has-trailing' : '')} {...rest} />
        {trailing && <div className="input-trailing">{trailing}</div>}
      </div>
      {hint && <span className="form-hint">{hint}</span>}
    </div>
  );
}

export function SafeZone({ children }) {
  return (
    <div className="safe-zone-box">
      <span className="safe-zone-icon" aria-hidden="true"><Lock /></span>
      <p className="safe-zone-text"><strong>Safe Zone Guarantee:</strong> {children}</p>
    </div>
  );
}

export default function AuthShell({ title, subtitle, alert, footer, children }) {
  useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);
  return (
    <>
      {[1, 3].map((n) => (
        <div key={n} className={`hero-sparkle hero-sparkle-${n}`} aria-hidden="true"><Sparkle cls="icon-sparkle-md" /></div>
      ))}
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-badge"><Cap /></div>
            <h1 className="auth-title">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
          </div>
          <div className={'auth-alert' + (alert ? ` auth-alert-${alert[1]} visible` : '')} role="alert">{alert?.[0]}</div>
          {children}
          <div className="auth-footer">
            <p className="auth-switch-text">{footer}</p>
            <Link to="/" className="auth-back-link"><Back /> Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
