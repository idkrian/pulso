import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import {
  getMe,
  login as loginRequest,
  register as registerRequest,
  resendCode as resendCodeRequest,
  updateMe,
  verifyRegistration as verifyRegistrationRequest,
} from "@/api/auth";
import type {
  AuthUser,
  LanguagePreference,
  LoginResponseDto,
  UnitPreference,
  UpdateMeDto,
} from "@/dtos/auth.dto";
import {
  applyAuthHeader,
  applyLocaleHeader,
  clearSession,
  detectBrowserLocale,
  getStoredToken,
  getStoredUser,
  isTokenValid,
  persistSession,
  persistUser,
} from "@/utils/auth";

interface AuthContextValue {
  user: AuthUser | null;
  unit: UnitPreference;
  locale: LanguagePreference;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyRegistration: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  updateProfile: (data: UpdateMeDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const bootstrap = (): { token: string | null; user: AuthUser | null } => {
  const token = getStoredToken();
  if (!isTokenValid(token)) {
    clearSession();
    applyLocaleHeader(detectBrowserLocale());
    return { token: null, user: null };
  }
  applyAuthHeader(token);
  const storedUser = getStoredUser();
  applyLocaleHeader(storedUser?.languagePreference ?? detectBrowserLocale());
  return { token, user: storedUser };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ token, user }, setSession] = useState(bootstrap);

  const locale: LanguagePreference =
    user?.languagePreference ?? detectBrowserLocale();

  useEffect(() => {
    applyLocaleHeader(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const logout = useCallback(() => {
    clearSession();
    applyAuthHeader(null);
    setSession({ token: null, user: null });
  }, []);

  const startSession = useCallback((response: LoginResponseDto) => {
    const { token: newToken, ...authUser } = response;
    persistSession(newToken, authUser);
    applyAuthHeader(newToken);
    setSession({ token: newToken, user: authUser });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      startSession(await loginRequest({ email, password }));
    },
    [startSession],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await registerRequest({ name, email, password });
    },
    [],
  );

  const verifyRegistration = useCallback(
    async (email: string, code: string) => {
      startSession(await verifyRegistrationRequest({ email, code }));
    },
    [startSession],
  );

  const resendCode = useCallback(async (email: string) => {
    await resendCodeRequest({ email });
  }, []);

  const updateProfile = useCallback(async (data: UpdateMeDto) => {
    const updated = await updateMe(data);
    persistUser(updated);
    setSession((prev) => ({ ...prev, user: updated }));
  }, []);

  useEffect(() => {
    if (!isTokenValid(token)) return;
    getMe()
      .then((freshUser) => {
        persistUser(freshUser);
        setSession((prev) => ({ ...prev, user: freshUser }));
      })
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) logout();
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      unit: user?.unitPreference ?? "KG",
      locale,
      isAuthenticated: isTokenValid(token),
      login,
      register,
      verifyRegistration,
      resendCode,
      updateProfile,
      logout,
    }),
    [
      user,
      token,
      locale,
      login,
      register,
      verifyRegistration,
      resendCode,
      updateProfile,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
