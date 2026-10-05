import { createContext, useContext, useState } from 'react';
import { getSession, setSession, authenticate, registerUser, updateUserProfile } from '../lib/api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);

  // Login — calls POST /api/auth/login, stores JWT + user in localStorage
  const login = async (email, password) => {
    // authenticate() in api.js calls the backend, gets the JWT and stores it
    const u = await authenticate(email, password);
    if (u) setUser(u); // session already written by api.js setSession()
    return u;
  };

  // Logout — clears local session AND the JWT token
  const logout = () => {
    setSession(null, null); // clears both SESSION and TOKEN keys
    setUser(null);
  };

  // Profile update — calls PUT /api/auth/profile/:id, then updates local session
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
