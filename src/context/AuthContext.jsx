import { createContext, useContext, useState } from 'react';
import { getSession, setSession, authenticate, registerUser } from '../lib/api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession);
  const login = async (email, password) => {
    const u = await authenticate(email, password);
    if (u) { setSession(u); setUser({ name: u.name, email: u.email }); }
    return u;
  };
  const logout = () => { setSession(null); setUser(null); };
  return <Ctx.Provider value={{ user, login, logout, signup: registerUser }}>{children}</Ctx.Provider>;
}
