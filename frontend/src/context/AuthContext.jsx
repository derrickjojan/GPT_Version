import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const value = useMemo(
    () => ({
      session,
      login: (payload) => setSession(payload),
      logout: () => setSession(null)
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
