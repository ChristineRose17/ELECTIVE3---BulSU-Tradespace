import { createContext, useContext, useState } from 'react';
import { getSession, setSession, authenticate, registerUser, updateUserProfile, verifyEmailOtp, resendEmailOtp } from '../lib/api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);

  // Login — calls POST /api/auth/login, stores JWT + user in localStorage
  const login = async (email, password) => {
    const u = await authenticate(email, password);
    if (u) setUser(u); // u already contains emailVerified from backend
    return u;
  };

  // Logout — clears local session AND the JWT token
  const logout = () => {
    setSession(null, null);
    setUser(null);
  };

  // Profile update — calls PUT /api/auth/profile/:id, then updates local session
  const updateProfile = async (updates) => {
    const res = await updateUserProfile(updates);
    if (res?.user) setUser(res.user);
    return res;
  };

  // Called after successful OTP verification — updates session with emailVerified: true
  const verifyOtp = async (email, token) => {
    const res = await verifyEmailOtp(email, token);
    if (res.user) {
      setUser({ ...res.user, emailVerified: true });
    }
    return res;
  };

  // Called after resend-OTP
  const resendOtp = async (email) => resendEmailOtp(email);

  // Mark emailVerified in-memory (e.g. after a successful verify call)
  const markEmailVerified = () => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, emailVerified: true };
      setSession(updated, localStorage.getItem('bulsu_access_token'));
      return updated;
    });
  };

  return (
    <Ctx.Provider value={{ user, login, logout, signup: registerUser, updateProfile, verifyOtp, resendOtp, markEmailVerified }}>
      {children}
    </Ctx.Provider>
  );
}
