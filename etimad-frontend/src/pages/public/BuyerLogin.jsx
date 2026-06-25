import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getDashboardRoute } from "../../util/getDashboardRoutes";

export default function Login() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation();

  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) {
      nav(getDashboardRoute(user.role));
    }
  }, [user, nav]);

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isValidPhone = (v) => /^(\+92|0)?[0-9]{10,12}$/.test(v.replace(/\s|-/g, ""));

  const validate = () => {
    const errors = {};
    setGlobalError("");

    const ep = loginInput.trim();
    if (!ep) {
      errors.emailPhone = "This field is required.";
    } else if (!isValidEmail(ep) && !isValidPhone(ep)) {
      errors.emailPhone = "Enter a valid email or phone number.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const loggedUser = await login({
        login: loginInput.trim(),
        password: password,
      });
      // Redirect handled by useEffect or navigate
      if (loggedUser.role === "buyer") nav("/buyer-dashboard");
      else if (loggedUser.role === "seller") nav("/seller");
      else if (loggedUser.role === "admin") nav("/admin");
    } catch (err) {
      setGlobalError(err.response?.data?.message || "No account found with this email or password. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      background: "#F0FDFD", // Light cool teal background
      minHeight: "100vh",
      color: "#1A1A2E",
      display: "flex",
      flexDirection: "column"
    }}>
      <style>{`
        .hover-teal:hover { color: #115E59 !important; }
        .btn-signin {
          width: 100%;
          padding: 14px;
          background: #115E59;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(17, 94, 89, 0.25);
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.2px;
        }
        .btn-signin:hover { background: #134E4A; box-shadow: 0 4px 18px rgba(17, 94, 89, 0.35); }
        .btn-signin:active { transform: translateY(1px); }
        .btn-signin:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .spinner {
          display: none;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .btn-signin.loading .spinner { display: block; }
        .btn-signin.loading .btn-text { opacity: 0.8; }
        .input-teal:focus {
          border-color: #115E59 !important;
          box-shadow: 0 0 0 3px rgba(17, 94, 89, 0.12) !important;
        }
      `}</style>

      {/* HEADER */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        width: "100%"
      }}>
        <div onClick={() => nav("/")} style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer"
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#115E59",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.1rem"
          }}>E</div>
          <span style={{
            fontSize: "1.4rem",
            fontWeight: "800",
            color: "#115E59",
            letterSpacing: "-0.5px"
          }}>Etimad</span>
        </div>
        <div onClick={() => nav("/")} style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#4B5563",
          fontSize: "0.9rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "color 0.2s"
        }} className="hover-teal">
          Back to home
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{
        flex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px"
      }}>
        <div style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          boxShadow: "0 4px 32px rgba(17, 94, 89, 0.08), 0 1px 4px rgba(0,0,0,0.06)",
          padding: "44px 48px",
          width: "100%",
          maxWidth: "460px"
        }}>

          <div style={{ marginBottom: "32px" }}>
            <h1 style={{
              fontSize: "1.75rem",
              fontWeight: "800",
              color: "#1A1A2E",
              letterSpacing: "-0.4px",
              lineHeight: "1.2"
            }}>Welcome back to <span style={{ color: "#115E59" }}>Etimad</span></h1>
            <p style={{
              marginTop: "8px",
              color: "#4B5563",
              fontSize: "0.9rem",
              lineHeight: "1.5"
            }}>Sign in to continue shopping from 50,000+ products.</p>
          </div>

          {/* Global Alert */}
          {globalError && (
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "13px 16px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              fontWeight: "500",
              marginBottom: "22px",
              lineHeight: "1.4",
              background: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA"
            }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ flexShrink: 0, width: "16px", height: "16px", marginTop: "1px" }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{globalError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} noValidate>

            {/* Email / Phone */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#1A1A2E",
                marginBottom: "6px"
              }}>Email Address or Phone Number</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="you@example.com or 03001234567"
                  value={loginInput}
                  onChange={(e) => {
                    setLoginInput(e.target.value);
                    if (fieldErrors.emailPhone) setFieldErrors({ ...fieldErrors, emailPhone: "" });
                  }}
                  className="input-teal"
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    border: fieldErrors.emailPhone ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    color: "#1A1A2E",
                    background: "#FFFFFF",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    fontFamily: "Georgia, serif"
                  }}
                />
              </div>
              {fieldErrors.emailPhone && (
                <div style={{ marginTop: "5px", fontSize: "0.78rem", color: "#EF4444", fontWeight: "500" }}>
                  {fieldErrors.emailPhone}
                </div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: "600",
                color: "#1A1A2E",
                marginBottom: "6px"
              }}>Password</label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" });
                  }}
                  className="input-teal"
                  style={{
                    width: "100%",
                    padding: "13px 46px 13px 16px",
                    border: fieldErrors.password ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "0.95rem",
                    color: "#1A1A2E",
                    background: "#FFFFFF",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    fontFamily: "Georgia, serif"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9CA3AF",
                    display: "flex",
                    alignItems: "center",
                    padding: "0",
                    transition: "color 0.2s"
                  }}
                  className="hover-teal"
                >
                  {showPassword ? (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ width: "18px", height: "18px" }}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.97 9.97 0 012.59-4.342M9.88 9.88a3 3 0 104.243 4.243M3 3l18 18"/>
                    </svg>
                  ) : (
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ width: "18px", height: "18px" }}>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <div style={{ marginTop: "5px", fontSize: "0.78rem", color: "#EF4444", fontWeight: "500" }}>
                  {fieldErrors.password}
                </div>
              )}
            </div>

            {/* Remember + Forgot */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
              marginTop: "-4px"
            }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "0.85rem",
                color: "#4B5563",
                fontWeight: "500",
                userSelect: "none"
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#115E59",
                    cursor: "pointer"
                  }}
                />
                Remember me
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Reset instructions sent to your registered contact details."); }} style={{
                fontSize: "0.85rem",
                color: "#115E59",
                fontWeight: "600",
                textDecoration: "none"
              }} className="hover-underline">Forgot Password?</a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn-signin ${loading ? "loading" : ""}`}
            >
              <div className="spinner" id="spinner"></div>
              <span className="btn-text">Sign In</span>
            </button>

          </form>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0"
          }}>
            <hr style={{ flex: "1", border: "none", borderTop: "1px solid #E5E7EB" }} />
            <span style={{ fontSize: "0.78rem", color: "#9CA3AF", fontStyle: "Georgia, serif" }}>Don't have an account?</span>
            <hr style={{ flex: "1", border: "none", borderTop: "1px solid #E5E7EB" }} />
          </div>

          <div style={{ textAlign: "center", fontSize: "0.88rem", color: "#4B5563" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); nav("/signup"); }} style={{
              color: "#115E59",
              fontWeight: "700",
              textDecoration: "none"
            }}>Create a free account →</a>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "24px",
            fontSize: "0.78rem",
            color: "#9CA3AF"
          }}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ width: "14px", height: "14px", color: "#10B981" }}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Secure login · Buyer Protection · 100% Safe
          </div>

        </div>
      </main>
    </div>
  );
}