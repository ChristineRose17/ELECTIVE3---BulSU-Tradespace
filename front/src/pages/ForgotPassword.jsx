import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { requestRecoveryCode, resendRecoveryCode } from '../lib/api';
import AuthShell, { Field, SafeZone } from '../components/AuthShell';
import { Mail, Lock, Arrow } from '../components/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COOLDOWN_SEC = 60;

export default function ForgotPassword() {
  const nav = useNavigate();

  // Multi-step state: 'email' | 'code' | 'password'
  const [step, setStep] = useState('email');

  // Track if email step succeeded to guard against direct access to code step
  const [emailSent, setEmailSent] = useState(false);

  // Form values
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const [bad, setBad] = useState('');
  const [busy, setBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // 60s cooldown timer for Resend code button
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Guard against users jumping to the code step directly
  useEffect(() => {
    if (step === 'code' && (!emailSent || !email)) {
      setStep('email');
    }
  }, [step, emailSent, email]);

  // Step 1: Request 6-digit recovery code with email_exists RPC check
  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (busy) return;

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setBad('email');
      return setAlert(['Please enter your email address.', 'error']);
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setBad('email');
      return setAlert(['Please enter a valid email address.', 'error']);
    }

    setBusy(true);
    setBad('');
    setAlert(null);

    try {
      // Call backend — it uses the Supabase Admin client to check auth.users,
      // then calls resetPasswordForEmail only if the email is found.
      const result = await requestRecoveryCode(trimmedEmail);

      if (result.error) {
        setBad('email');
        return setAlert([result.error, 'error']);
      }

      // Move to code step
      setEmailSent(true);
      setCooldown(COOLDOWN_SEC);
      setStep('code');
      setAlert([
        'If that email is registered, a code has been sent.',
        'success',
      ]);
    } catch {
      setAlert(['Something went wrong. Please try again.', 'error']);
    } finally {
      setBusy(false);
    }
  };

  // Step 2: Verify 6-digit recovery code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (busy) return;

    const cleanCode = code.trim();
    if (cleanCode.length !== 6) {
      setBad('code');
      return setAlert(['Please enter the complete 6-digit code.', 'error']);
    }

    setBusy(true);
    setBad('');
    setAlert(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: cleanCode,
        type: 'recovery',
      });

      if (error || !data?.session) {
        setBad('code');
        return setAlert(['Invalid or expired code.', 'error']);
      }

      // Move to new password step
      setStep('password');
      setAlert(['Code verified. Please set your new password.', 'success']);
    } catch {
      setBad('code');
      setAlert(['Invalid or expired code.', 'error']);
    } finally {
      setBusy(false);
    }
  };

  // Step 2: Resend code with 60s cooldown & email_exists check
  const handleResendCode = async () => {
    if (cooldown > 0 || resendBusy) return;

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) return;

    setResendBusy(true);
    setAlert(null);

    try {
      // Call backend — same email-existence guard as the initial request.
      const result = await resendRecoveryCode(trimmedEmail);

      if (result.error) {
        return setAlert([result.error, 'error']);
      }

      setCooldown(COOLDOWN_SEC);
      setCode('');
      setBad('');
      setAlert([
        'If that email is registered, a code has been sent.',
        'info',
      ]);
    } catch {
      setAlert(['Something went wrong. Please try again.', 'error']);
    } finally {
      setResendBusy(false);
    }
  };

  // Step 2: Change email (return to step 1)
  const handleChangeEmail = () => {
    setEmailSent(false);
    setStep('email');
    setCode('');
    setBad('');
    setAlert(null);
  };

  // Step 3: Set new password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (busy) return;

    setBad('');
    setAlert(null);

    if (password.length < 6) {
      setBad('password');
      return setAlert(['Password must be at least 6 characters.', 'error']);
    }

    if (password !== confirmPassword) {
      setBad('confirmPassword');
      return setAlert(['Passwords do not match.', 'error']);
    }

    setBusy(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setBad('password');
        return setAlert([error.message, 'error']);
      }

      await supabase.auth.signOut();
      setAlert(['Password successfully updated! Redirecting to login...', 'success']);
      setTimeout(() => nav('/login'), 1500);
    } catch (err) {
      setBad('password');
      setAlert([err.message || 'Failed to update password.', 'error']);
    } finally {
      setBusy(false);
    }
  };

  // Dynamic header based on current step
  const getHeader = () => {
    switch (step) {
      case 'code':
        return {
          title: 'Enter Verification Code',
          subtitle: `Enter the 6-digit recovery code sent to ${email}.`,
        };
      case 'password':
        return {
          title: 'Create New Password',
          subtitle: 'Choose a new password for your BulSU TradeSpace account.',
        };
      case 'email':
      default:
        return {
          title: 'Reset Your Password',
          subtitle: "Enter your registered email and we'll send you a 6-digit code.",
        };
    }
  };

  const header = getHeader();

  return (
    <AuthShell
      title={header.title}
      subtitle={header.subtitle}
      alert={alert}
      footer={<>Remember your password? <Link to="/login" className="auth-switch-link">Log In</Link></>}
    >
      {/* STEP 1: Email Form */}
      {step === 'email' && (
        <form className="auth-form" noValidate onSubmit={handleRequestCode} onChange={() => setBad('')}>
          <Field
            id="forgot-email"
            name="email"
            type="email"
            label="BulSU or Gmail Account"
            icon={<Mail />}
            bad={bad === 'email'}
            placeholder="your.name@bulsu.edu.ph or @gmail.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="btn-auth-submit" disabled={busy}>
            <span>{busy ? 'Checking account…' : 'Send Recovery Code'}</span>
            {!busy && <Arrow />}
          </button>

          <SafeZone>Only verified BulSU accounts can communicate, buy, and trade to prevent campus scams.</SafeZone>
        </form>
      )}

      {/* STEP 2: 6-Digit Code Form (Guarded: only renders if email step succeeded) */}
      {step === 'code' && emailSent && email && (
        <form className="auth-form" noValidate onSubmit={handleVerifyCode} onChange={() => setBad('')}>
          <Field
            id="recovery-code"
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            label="6-Digit Recovery Code"
            icon={<Lock />}
            bad={bad === 'code'}
            placeholder="e.g. 123456"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
          />

          <button type="submit" className="btn-auth-submit" disabled={busy || code.length < 6}>
            <span>{busy ? 'Verifying code…' : 'Verify Code'}</span>
            {!busy && <Arrow />}
          </button>

          <div
            className="otp-resend-row"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}
          >
            <button
              type="button"
              className="otp-resend-btn"
              onClick={handleResendCode}
              disabled={cooldown > 0 || resendBusy}
            >
              {cooldown > 0 ? (
                <><RotateCcw size={13} className="otp-spin" /> Resend in {cooldown}s</>
              ) : (
                <><RotateCcw size={13} /> Resend code</>
              )}
            </button>
            <button
              type="button"
              className="auth-switch-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.875rem' }}
              onClick={handleChangeEmail}
            >
              Change email
            </button>
          </div>

          <p className="otp-expiry-note">
            Codes expire in <strong>10 minutes</strong>. Check your spam folder if you don't see it.
          </p>

          <SafeZone>Only verified BulSU accounts can communicate, buy, and trade to prevent campus scams.</SafeZone>
        </form>
      )}

      {/* STEP 3: New Password Form */}
      {step === 'password' && (
        <form className="auth-form" noValidate onSubmit={handleUpdatePassword} onChange={() => setBad('')}>
          <Field
            id="new-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            icon={<Lock />}
            bad={bad === 'password'}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            trailing={
              <button
                type="button"
                className="input-trailing-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            }
            required
          />

          <Field
            id="confirm-new-password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            icon={<Lock />}
            bad={bad === 'confirmPassword'}
            placeholder="Re-type your new password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            trailing={
              <button
                type="button"
                className="input-trailing-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            }
            required
          />

          <button type="submit" className="btn-auth-submit" disabled={busy}>
            <span>{busy ? 'Updating password…' : 'Update Password'}</span>
            {!busy && <Arrow />}
          </button>

          <SafeZone>Your password is encrypted and never stored in plain text.</SafeZone>
        </form>
      )}
    </AuthShell>
  );
}
