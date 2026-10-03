import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShell, { Field, SafeZone } from '../components/AuthShell';
import { Mail, Lock, User, Arrow } from '../components/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const nav = useNavigate();
  const { signup } = useAuth();
  const [alert, setAlert] = useState(null);
  const [bad, setBad] = useState('');
  const [busy, setBusy] = useState(false);
  const fail = (field, msg) => { setBad(field); setAlert([msg, 'error']); };

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);
    const d = Object.fromEntries(new FormData(e.target));
    const name = d.name.trim(), email = d.email.trim().toLowerCase();
    const pw = d.password, confirm = d.confirm_password;

    if (name.length < 2) return fail('name', 'Please enter your full name (minimum 2 characters).');
    if (!EMAIL_RE.test(email)) return fail('email', 'Please enter a valid email address.');
    if (!/@(bulsu\.edu\.ph|gmail\.com|googlemail\.com)$/.test(email)) return fail('email', 'Approved for @bulsu.edu.ph or any @gmail.com account.');
    if (pw.length < 6) return fail('password', 'Password must be at least 6 characters long.');
    if (pw !== confirm) return fail('confirm_password', 'Passwords do not match. Please re-enter your password.');

    const res = await signup({ name, email, password: pw });
    if (res.error) return fail('email', 'An account with this email already exists. Please log in instead.');
    setBusy(true);
    setAlert(['Account created successfully! Redirecting you to login...', 'success']);
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
        <Field id="reg-name" name="name" type="text" label="Full Name" icon={<User />} bad={bad === 'name'}
          placeholder="e.g. Juan Dela Cruz" autoComplete="name" required />
        <Field id="reg-email" name="email" type="email" label="Email Address" icon={<Mail />} bad={bad === 'email'}
          placeholder="your.name@bulsu.edu.ph or @gmail.com" hint="Approved for @bulsu.edu.ph and @gmail.com accounts" autoComplete="email" required />
        <Field id="reg-password" name="password" type="password" label="Password" icon={<Lock />} bad={bad === 'password'}
          placeholder="At least 6 characters" autoComplete="new-password" required />
        <Field id="reg-confirm-password" name="confirm_password" type="password" label="Confirm Password" icon={<Lock />} bad={bad === 'confirm_password'}
          placeholder="Re-type your password" autoComplete="new-password" required />
        <button type="submit" className="btn-auth-submit" disabled={busy}>
          <span>{busy ? 'Account Created! Redirecting to Login...' : 'Create Account'}</span>{!busy && <Arrow />}
        </button>
        <SafeZone>Only verified BulSU and approved student accounts can participate to prevent campus scams.</SafeZone>
      </form>
    </AuthShell>
  );
}
