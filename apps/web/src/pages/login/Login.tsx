import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";
import {
  LuUser,
  LuMail,
  LuLock,
  LuEye,
  LuEyeOff,
  LuArrowRight,
  LuRotateCw,
} from "react-icons/lu";
import { useAuth } from "@/contexts/AuthContext";
import { useT } from "@/i18n";
import Icon from "@/assets/icons/pulse-white.svg";
import Logo from "@/assets/icons/pulse-gradient.svg";

const Login = () => {
  const { isAuthenticated, login, register } = useAuth();
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const toggleMode = () => {
    setMode((mode) => (mode === "login" ? "signup" : "login"));
    setError(null);
  };

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/";

  // Already logged in? Skip the login screen entirely.
  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isSignup) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (isSignup && status === 409) {
          setError(t("login.error.emailTaken"));
        } else if (!isSignup && status === 401) {
          setError(t("login.error.badCredentials"));
        } else if (isSignup) {
          setError(t("login.error.signupFailed"));
        } else {
          setError(t("login.error.loginFailed"));
        }
      } else {
        setError(t("common.error.generic"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-backgroundBlack px-6 py-8 text-lightGrey">
      {/* subtle ambient glow */}
      <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-indigo/20 blur-3xl animate-auth-blob" />
      <div
        className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-darkIndigo/30 blur-3xl animate-auth-blob"
        style={{ animationDelay: "4s" }}
      />

      {/* ---- Centered card ---- */}
      <div className="relative z-10 flex w-full max-w-3xl overflow-hidden rounded-2xl border border-mediumGrey bg-darkGrey shadow-2xl animate-auth-fade-up">
        {/* Brand side */}
        <div className="relative hidden w-2/5 flex-col justify-center gap-4 overflow-hidden bg-linear-to-br from-indigo to-darkIndigo p-8 sm:flex">
          <div className="flex items-center gap-2.5">
            <img src={Icon} alt="Pulso" className="size-12" />
            <span className="text-xl font-extrabold tracking-tight text-white">
              Pulso
            </span>
          </div>
          <h1 className="auth-shimmer-text bg-linear-to-r from-white via-lightIndigo to-white bg-clip-text text-2xl font-extrabold leading-snug text-transparent">
            {t("login.tagline")}
          </h1>
          <p className="text-sm text-white/70">{t("login.subtitle")}</p>
        </div>

        {/* Form side */}
        <div className="flex w-full flex-col justify-center p-8 sm:w-3/5 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* compact logo for mobile */}
            <div className="flex items-center gap-2.5 sm:hidden">
              <div className="relative flex shrink-0 items-center">
                <div className="absolute inset-0 rounded-xl bg-indigo/40 blur-xl" />
                <img src={Logo} alt="Pulso" className="relative size-9" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Pulso
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold text-white">
                {isSignup ? t("login.signupHeading") : t("login.loginHeading")}
              </h2>
              <p className="text-sm text-lightGrey/50">
                {isSignup
                  ? t("login.signupSubheading")
                  : t("login.loginSubheading")}
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 animate-auth-fade-up">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {isSignup && (
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-lightGrey/50">
                    {t("login.nameLabel")}
                  </span>
                  <div className="group relative">
                    <LuUser
                      size={18}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lightGrey/40 transition-colors group-focus-within:text-lightIndigo"
                    />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("login.namePlaceholder")}
                      className="w-full rounded-lg border border-mediumGrey bg-mediumGrey/40 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-lightGrey/30 outline-none transition-all focus:border-indigo focus:bg-mediumGrey focus:ring-2 focus:ring-indigo/30"
                    />
                  </div>
                </label>
              )}

              <label className="block space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-lightGrey/50">
                  {t("login.emailLabel")}
                </span>
                <div className="group relative">
                  <LuMail
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lightGrey/40 transition-colors group-focus-within:text-lightIndigo"
                  />
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("login.emailPlaceholder")}
                    className="w-full rounded-lg border border-mediumGrey bg-mediumGrey/40 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-lightGrey/30 outline-none transition-all focus:border-indigo focus:bg-mediumGrey focus:ring-2 focus:ring-indigo/30"
                  />
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-lightGrey/50">
                  {t("login.passwordLabel")}
                </span>
                <div className="group relative">
                  <LuLock
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lightGrey/40 transition-colors group-focus-within:text-lightIndigo"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-mediumGrey bg-mediumGrey/40 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-lightGrey/30 outline-none transition-all focus:border-indigo focus:bg-mediumGrey focus:ring-2 focus:ring-indigo/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lightGrey/40 transition-colors hover:text-lightIndigo"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </button>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-indigo to-darkIndigo font-semibold text-white shadow-lg shadow-indigo/20 transition-all hover:shadow-indigo/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <LuRotateCw size={20} className="animate-spin" />
              ) : (
                <>
                  {isSignup ? t("login.signupSubmit") : t("login.loginSubmit")}
                  <LuArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

            <p className="text-center text-sm text-lightGrey/50">
              {isSignup ? t("login.hasAccount") : t("login.noAccount")}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-semibold text-lightIndigo transition-colors hover:text-indigo cursor-pointer"
              >
                {isSignup
                  ? t("login.switchToLogin")
                  : t("login.switchToSignup")}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
