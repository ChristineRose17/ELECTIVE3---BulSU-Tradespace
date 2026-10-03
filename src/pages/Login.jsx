import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthShell, { Field, SafeZone } from '../components/AuthShell';
import { Mail, Lock, Arrow } from '../components/Icons';

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [q] = useSearchParams();
  const initial = q.get('registered') ? ['Account created successfully. Please log in.', 'success']
    : q.get('auth_required') ? ['Please log in first to access the campus marketplace.', 'info']
    : q.get('logout') ? ['You have been successfully logged out.', 'info'] : null;
  const [alert, setAlert] = useState(initial);
  const [bad, setBad] = useState('');
  const [busy, setBusy] = useState(false);
  const is = (n) => bad === n || bad === 'both';
  const fail = (field, msg) => { setBad(field); setAlert([msg, 'error']); };

  const submit = async (e) => {
    e.preventDefault();
    setAlert(null);
    const form = e.target;
    const email = form.email.value.trim().toLowerCase(), pw = form.password.value;
    if (!email) return fail('email', 'Please enter your registered email address.');
    if (!pw) return fail('password', 'Please enter your password.');
    const u = await login(email, pw);
    if (!u) { form.password.value = ''; return fail('both', 'Invalid email or password. Please try again.'); }
    setBusy(true);
    setAlert([`Welcome back, ${u.name}! Loading Meneses Marketplace...`, 'success']);
    setTimeout(() => nav('/marketplace'), 700);
  };

  return (
    <AuthShell
      title="BulSU GSuite Login"
      subtitle="Access your BulSU TradeSpace Meneses account to continue."
      alert={alert}
      footer={<>New to TradeSpace? <Link to="/signup" className="auth-switch-link">Sign Up</Link></>}
    >
      <form className="auth-form" noValidate onSubmit={submit} onChange={() => setBad('')}>
        <Field id="login-email" name="email" type="email" label="BulSU or Gmail Account" icon={<Mail />} bad={is('email')}
          placeholder="your.name@bulsu.edu.ph or @gmail.com" autoComplete="email" required />
        <Field id="login-password" name="password" type="password" label="Password" icon={<Lock />} bad={is('password')}
          placeholder="Enter your password" autoComplete="current-password" required />
        <button type="submit" className="btn-auth-submit" disabled={busy}>
          <span>{busy ? 'Signing in...' : 'Log In'}</span>{!busy && <Arrow />}
        </button>
        <SafeZone>Only verified BulSU accounts can communicate, buy, and trade to prevent campus scams.</SafeZone>
      </form>
    </AuthShell>
  );
}
