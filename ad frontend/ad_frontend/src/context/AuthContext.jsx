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

// ✅ EXPORT FIX (keep as named export)
export const normalizeRole = (role) => {
  if (!role) {
    return '';
  }

  const lowered = String(role).trim().toLowerCase().replace(/\s+/g, '_');

  if (lowered.includes('admin')) {
    return 'admin';
  }

  if (lowered.includes('theater')) {
    return 'theater_owner';
  }

  if (lowered === 'user' || lowered.includes('customer')) {
    return 'user';
  }

  return lowered;
};

const resolveToken = (payload) =>
  payload?.token ||
  payload?.accessToken ||
  payload?.data?.token ||
  payload?.data?.accessToken ||
  payload?.user?.token ||
  payload?.data?.user?.token ||
  '';

const resolveUser = (payload) => {
  const rawUser =
    payload?.user ||
    payload?.data?.user ||
    payload?.data ||
    payload ||
    null;

  if (!rawUser || typeof rawUser !== 'object') {
    return null;
  }

  return {
    ...rawUser,
    role: normalizeRole(rawUser.role),
  };
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState(() =>
    safeJsonParse(localStorage.getItem(USER_KEY), null)
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const login = (payload) => {
    const resolvedToken = resolveToken(payload);
    const resolvedUser = resolveUser(payload);

    setToken(resolvedToken);
    setUser(resolvedUser);
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  const role = normalizeRole(user?.role);

  const value = useMemo(
    () => ({
      token,
      user: user ? { ...user, role } : null,
      role,
      isAuthenticated: Boolean(token || user),
      login,
      logout,
    }),
    [token, user, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ FIX: both exports available
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;