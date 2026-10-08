import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, RotateCcw, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthShell from '../components/AuthShell';

const COOLDOWN_SEC = 60;

export default function VerifyEmail() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyOtp, resendOtp, markEmailVerified, login } = useAuth();

  const email = searchParams.get('email') || '';

  // 6 separate digit inputs
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const [alert, setAlert]     = useState(null);      // [message, 'error'|'success'|'info']
  const [busy, setBusy]       = useState(false);
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Auto-focus the first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Redirect to login if no email in URL
  useEffect(() => {
    if (!email) nav('/signup', { replace: true });
  }, [email, nav]);

  const getToken = () => digits.join('');

  const handleDigitChange = (index, value) => {
    // Allow paste of 6-digit code in one go
    if (value.length > 1) {
      const clean = value.replace(/\D/g, '').slice(0, 6);
      if (clean.length === 6) {
        const newDigits = clean.split('');
        setDigits(newDigits);
        inputRefs.current[5]?.focus();
        return;
      }
    }

    const digit = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);

    // Move focus forward
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        // Clear current cell
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      } else if (index > 0) {
        // Move to previous cell
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setDigits(newDigits);
    inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (token.length < 6) {
      setAlert(['Please enter all 6 digits of the code.', 'error']);
      return;
    }
    setBusy(true);
    setAlert(null);

    const res = await verifyOtp(email, token);
    setBusy(false);

    if (res.error) {
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setAlert([res.error, 'error']);
      return;
    }

    // Success — if we got a session back, we're logged in; otherwise send to login
    setVerified(true);
    setAlert(['Email verified! Welcome to BulSU TradeSpace.', 'success']);

    if (res.access_token) {
      // verifyOtp already stored the session; mark in context and go to marketplace
      markEmailVerified();
      setTimeout(() => nav('/marketplace'), 1200);
    } else {
      // No session returned — ask user to log in
      setTimeout(() => nav('/login?registered=true'), 1200);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setAlert(null);
    const res = await resendOtp(email);
    if (res.error) {
      setAlert([res.error, 'error']);
    } else {
      setCooldown(COOLDOWN_SEC);
      setAlert([`A new 6-digit code was sent to ${email}.`, 'info']);
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <AuthShell
      title="Verify Your Email"
      subtitle={email ? `We sent a 6-digit code to ${email}` : 'Enter the code sent to your email.'}
      alert={alert}
      footer={<><Link to="/signup" className="auth-switch-link"><ArrowLeft size={14} style={{ verticalAlign: 'middle', marginRight: 3 }} />Use a different email</Link></>}
    >
      <div className="verify-email-content">
        {verified ? (
          <div className="verify-success-state">
            <div className="verify-success-icon">
              <ShieldCheck size={40} color="#15803d" />
            </div>
            <h3>Verified!</h3>
            <p>Redirecting you to the Marketplace…</p>
          </div>
        ) : (
          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            {/* 6-digit code input boxes */}
            <div className="otp-inputs" role="group" aria-label="6-digit verification code">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  id={`otp-digit-${i}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  className={'otp-digit' + (d ? ' filled' : '')}
                  value={d}
                  autoComplete={i === 0 ? 'one-time-code' : 'off'}
                  aria-label={`Digit ${i + 1}`}
                  onChange={(e) => handleDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  disabled={busy || verified}
                />
              ))}
            </div>

            <button
              type="submit"
              className="btn-auth-submit"
              disabled={busy || getToken().length < 6}
            >
              <span>{busy ? 'Verifying…' : 'Verify Email'}</span>
            </button>

            {/* Resend button */}
            <div className="otp-resend-row">
              <span className="otp-resend-hint">Didn't receive a code?</span>
              <button
                type="button"
                className="otp-resend-btn"
                onClick={handleResend}
                disabled={cooldown > 0}
              >
                {cooldown > 0 ? (
                  <><RotateCcw size={13} className="otp-spin" /> Resend in {cooldown}s</>
                ) : (
                  <><RotateCcw size={13} /> Resend code</>
                )}
              </button>
            </div>

            <p className="otp-expiry-note">
              Codes expire in <strong>10 minutes</strong>. Check your spam folder if you don't see it.
            </p>
          </form>
        )}
      </div>
    </AuthShell>
  );
}
