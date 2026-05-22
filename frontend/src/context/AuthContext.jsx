import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { fetchMe, loginUser, registerUser } from '../api/auth';
import { getAuthToken, setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = useCallback((payload) => {
    const rawUser = payload?.user ?? payload?.data ?? payload;
    if (!rawUser) {
      return null;
    }
    const rawRole =
      typeof rawUser.role === 'string'
        ? rawUser.role
        : rawUser.role?.name || rawUser.role?.value;
    const role =
      typeof rawRole === 'string' ? rawRole.trim().toLowerCase() : '';
    const rolesList = Array.isArray(rawUser.roles)
      ? rawUser.roles
          .map((item) =>
            typeof item === 'string'
              ? item.trim().toLowerCase()
              : item?.name?.toLowerCase(),
          )
          .filter(Boolean)
      : role
        ? [role]
        : [];
    return { ...rawUser, role, rolesList };
  }, []);

  const loadUser = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      setUser(null);
      return;
    }

    try {
      const data = await fetchMe();
      setUser(normalizeUser(data));
    } catch (error) {
      setAuthToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [normalizeUser]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (payload) => {
    const data = await loginUser(payload);
    setAuthToken(data.token);
    setUser(normalizeUser(data));
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    setAuthToken(data.token);
    setUser(normalizeUser(data));
    return data;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      refresh: loadUser,
    }),
    [user, loading, loadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
