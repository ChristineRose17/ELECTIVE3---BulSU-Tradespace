import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthShell, { Field, SafeZone } from '../components/AuthShell';
import { Mail, Lock, User, Arrow } from '../components/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_RULES = [
  { id: 'length', test: (p) => p.length >= 8 },
  { id: 'upper', test: (p) => /[A-Z]/.test(p) },
  { id: 'lower', test: (p) => /[a-z]/.test(p) },
  { id: 'number', test: (p) => /[0-9]/.test(p) },
  { id: 'special', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export default function Signup() {
  const nav = useNavigate();
  const { signup } = useAuth();
  const [alert, setAlert] = useState(null);
  const [bad, setBad] = useState('');
  const [busy, setBusy] = useState(false);

  // Form input states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fail = (field, msg) => {
    setBad(field);
    setAlert([msg, 'error']);
  };

  // Evaluate password strength
  const metCount = PASSWORD_RULES.filter((rule) => rule.test(password)).length;

  let strength = 'none'; // 'weak' | 'mid' | 'strong'
  let strengthBadge = '';
  let strengthSuggestion = '';

  if (password.length > 0) {
    if (password.length < 8) {
      strength = 'weak';
      strengthBadge = 'Weak';
      strengthSuggestion = 'Weak: Needs at least 8 characters.';
    } else if (metCount <= 2) {
      strength = 'weak';
      strengthBadge = 'Weak';
      strengthSuggestion = 'Weak: Add uppercase, number, or symbol.';
    } else if (metCount <= 4) {
      strength = 'mid';
      strengthBadge = 'Mid';
      strengthSuggestion = 'Mid (Accepted): Add symbol or number for Strong.';
    } else {
      strength = 'strong';
      strengthBadge = 'Strong';
      strengthSuggestion = 'Strong: Excellent password!';
    }
  }

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);
    const d = Object.fromEntries(new FormData(e.target));
    const name = d.name.trim();
    const email = d.email.trim().toLowerCase();

    if (name.length < 2) return fail('name', 'Name must be at least 2 characters.');
    if (!EMAIL_RE.test(email)) return fail('email', 'Please enter a valid email.');
    if (!/@(bulsu\.edu\.ph|gmail\.com|googlemail\.com)$/.test(email)) {
      return fail('email', 'Use an @bulsu.edu.ph or @gmail.com email.');
    }

    if (password.length < 8) {
      return fail('password', 'Password must be at least 8 characters.');
    }

    // Accept account if password reached Mid stage or higher
    if (strength === 'weak') {
      return fail('password', 'Password is too weak. Reach at least Mid strength.');
    }

    if (password !== confirmPassword) {
      return fail('confirm_password', 'Passwords do not match.');
    }

    const res = await signup({ name, email, password });
    if (res.error) {
      const isAlready = typeof res.error === 'string' && res.error.toLowerCase().includes('already');
      return fail('email', isAlready ? 'Email already registered. Please log in.' : res.error);
    }

    setBusy(true);
    setAlert(['Account created! Redirecting to login...', 'success']);
    setTimeout(() => nav('/login?registered=true'), 800);
  };

  return (
    <AuthShell
      title="Create BulSU Account"
      subtitle="Join TradeSpace Meneses to buy, sell, and trade safely on campus."
      alert={alert}
      footer={<>Already have an account? <Link to="/login" className="auth-switch-link">Log In</Link></>}
    >
      <form className="auth-form" noValidate onSubmit={submit} onChange={() => setBad('')}>
        <Field
          id="reg-name"
          name="name"
          type="text"
          label="Full Name"
          icon={<User />}
          bad={bad === 'name'}
          placeholder="e.g. Juan Dela Cruz"
          autoComplete="name"
          required
        />

        <Field
          id="reg-email"
          name="email"
          type="email"
          label="Email Address"
          icon={<Mail />}
          bad={bad === 'email'}
          placeholder="your.name@bulsu.edu.ph or @gmail.com"
          hint="Approved for @bulsu.edu.ph and @gmail.com accounts"
          autoComplete="email"
          required
        />

        <Field
          id="reg-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          icon={<Lock />}
          bad={bad === 'password'}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          trailing={
            <button
              type="button"
              className="input-trailing-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {/* Hide stage has the dash (EyeOff), Show stage has the open eye (Eye) */}
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
          required
        />

        <Field
          id="reg-confirm-password"
          name="confirm_password"
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          icon={<Lock />}
          bad={bad === 'confirm_password'}
          placeholder="Re-type your password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          trailing={
            <button
              type="button"
              className="input-trailing-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              title={showConfirmPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {/* Hide stage has the dash (EyeOff), Show stage has the open eye (Eye) */}
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
          required
        />

        {/* Password Strength & Suggestion moved AFTER Confirm Password */}
        {password.length > 0 && (
          <div className="pwd-strength-container" aria-live="polite">
            <div className="pwd-strength-header">
              <span className="pwd-strength-label">Password Strength</span>
              <span className={`pwd-strength-badge ${strength}`}>{strengthBadge}</span>
            </div>

            <div className={`pwd-strength-bars ${strength}`}>
              <div className="pwd-strength-bar" />
              <div className="pwd-strength-bar" />
              <div className="pwd-strength-bar" />
            </div>

            <div className="pwd-strength-suggestion">
              <strong>Suggestion:</strong> {strengthSuggestion}
            </div>
          </div>
        )}

        <button type="submit" className="btn-auth-submit" disabled={busy}>
          <span>{busy ? 'Account Created! Redirecting to Login...' : 'Create Account'}</span>
          {!busy && <Arrow />}
        </button>

        <SafeZone>Only verified BulSU and approved student accounts can participate to prevent campus scams.</SafeZone>
      </form>
    </AuthShell>
  );
}
