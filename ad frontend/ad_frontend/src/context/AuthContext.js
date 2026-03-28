import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const TOKEN_KEY = 'adms_token';
const USER_KEY = 'adms_user';

const AuthContext = createContext(null);

const safeJsonParse = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const normalizeRole = (role) => {
  if (!role) return '';

  const lowered = String(role).toLowerCase();
  if (lowered.includes('admin')) return 'admin';
  if (lowered.includes('theater')) return 'theater_owner';
  if (lowered.includes('reseller')) return 'reseller';
  return lowered;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() => safeJsonParse(localStorage.getItem(USER_KEY), null));

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = (payload) => {
    const resolvedToken =
      payload?.token ||
      payload?.accessToken ||
      payload?.data?.token ||
      payload?.data?.accessToken ||
      '';

    const resolvedUser =
      payload?.user ||
      payload?.data?.user || {
        name: payload?.name || payload?.mobile || 'User',
        role: normalizeRole(payload?.role || payload?.data?.role),
      };

    setToken(resolvedToken);
    setUser({
      ...resolvedUser,
      role: normalizeRole(resolvedUser?.role),
    });
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      role: normalizeRole(user?.role),
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
