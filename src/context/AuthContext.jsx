import { createContext, useContext, useState } from 'react';
import { getSession, setSession, authenticate, registerUser, updateUserProfile } from '../lib/api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);
  const login = async (email, password) => {
    const u = await authenticate(email, password);
    if (u) {
      const full = setSession(u);
      setUser(full);
    }
    return u;
  };
  const logout = () => {
    setSession(null);
    setUser(null);
  };
  const updateProfile = async (updates) => {
    const next = await updateUserProfile(updates);
    setUser(next);
    return next;
  };
  return (
    <Ctx.Provider value={{ user, login, logout, signup: registerUser, updateProfile }}>
      {children}
    </Ctx.Provider>
  );
}

