import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { register } = useAuth();
  const nav = useNavigate();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    setGlobalError("");

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10,12}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 to 12 digits.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must contain at least one special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim().toLowerCase(),
        phone: phone,
        password: password,
        role: role,
      });
      setSuccess(true);
      setTimeout(() => {
        nav("/login");
      }, 1000);
    } catch (err) {
      setGlobalError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
      background: "#F0FDFD", // Matches the light teal background
      minHeight: "100vh",
      color: "#1A1A2E",
      display: "flex",
      flexDirection: "column"
    }}>
      <style>{`
        .hover-teal:hover { color: #115E59 !important; }
        .btn-create {
          width: 100%;
          padding: 14px;
          background: #115E59;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(17, 94, 89, 0.25);
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.2px;
        }
        .btn-create:hover { background: #134E4A; box-shadow: 0 4px 18px rgba(17, 94, 89, 0.35); }
        .btn-create:active { transform: translateY(1px); }
        .btn-create:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .spinner {
          display: none;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .btn-create.loading .spinner { display: block; }
        .btn-create.loading .btn-text { opacity: 0.8; }
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

          <div style={{ marginBottom: "28px" }}>
            <h1 style={{
              fontSize: "1.75rem",
              fontWeight: "800",
              color: "#1A1A2E",
              letterSpacing: "-0.4px",
              lineHeight: "1.2"
            }}>Create your account</h1>
            <p style={{
              marginTop: "6px",
              color: "#4B5563",
              fontSize: "0.9rem",
              lineHeight: "1.5"
            }}>Join thousands of buyers and sellers on Etimad</p>
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

          {success && (
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
              background: "#F0FDF4",
              color: "#065F46",
              border: "1px solid #A7F3D0"
            }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ flexShrink: 0, width: "16px", height: "16px", marginTop: "1px" }}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Registration successful! Redirecting to login...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            {/* Account Type Toggle */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>Account type</label>
              <div style={{ display: "flex", gap: "16px" }}>
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  style={{
                    background: role === "buyer" ? "#E6F4F1" : "transparent",
                    color: "#115E59",
                    border: "none",
                    padding: "8px 24px",
                    borderRadius: "6px",
                    fontWeight: role === "buyer" ? "bold" : "normal",
                    fontFamily: "Georgia, serif",
                    fontSize: "0.95rem",
                    cursor: "pointer"
                  }}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("seller")}
                  style={{
                    background: role === "seller" ? "#E6F4F1" : "transparent",
                    color: "#115E59",
                    border: "none",
                    padding: "8px 24px",
                    borderRadius: "6px",
                    fontWeight: role === "seller" ? "bold" : "normal",
                    fontFamily: "Georgia, serif",
                    fontSize: "0.95rem",
                    cursor: "pointer"
                  }}
                >
                  Seller
                </button>
              </div>
            </div>

            {/* First & Last Name */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>First name</label>
                <input
                  type="text"
                  placeholder="Ali"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors({ ...errors, firstName: "" });
                  }}
                  className="input-teal"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: errors.firstName ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    color: "#1A1A2E",
                    background: "#FFFFFF",
                    outline: "none",
                    fontFamily: "Georgia, serif"
                  }}
                />
                {errors.firstName && <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#EF4444" }}>{errors.firstName}</div>}
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>Last name</label>
                <input
                  type="text"
                  placeholder="Khan"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) setErrors({ ...errors, lastName: "" });
                  }}
                  className="input-teal"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: errors.lastName ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    color: "#1A1A2E",
                    background: "#FFFFFF",
                    outline: "none",
                    fontFamily: "Georgia, serif"
                  }}
                />
                {errors.lastName && <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#EF4444" }}>{errors.lastName}</div>}
              </div>
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>Email address</label>
              <input
                type="email"
                placeholder="ali@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className="input-teal"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  color: "#1A1A2E",
                  background: "#FFFFFF",
                  outline: "none",
                  fontFamily: "Georgia, serif"
                }}
              />
              {errors.email && <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#EF4444" }}>{errors.email}</div>}
            </div>

            {/* Phone Number */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>Phone number</label>
              <input
                type="text"
                placeholder="03xx-xxxxxxx"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                className="input-teal"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: errors.phone ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  color: "#1A1A2E",
                  background: "#FFFFFF",
                  outline: "none",
                  fontFamily: "Georgia, serif"
                }}
              />
              {errors.phone && <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#EF4444" }}>{errors.phone}</div>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                className="input-teal"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: errors.password ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  color: "#1A1A2E",
                  background: "#FFFFFF",
                  outline: "none",
                  fontFamily: "Georgia, serif"
                }}
              />
              {errors.password && <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#EF4444" }}>{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#1A1A2E", marginBottom: "6px" }}>Confirm password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                }}
                className="input-teal"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: errors.confirmPassword ? "1.5px solid #EF4444" : "1.5px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  color: "#1A1A2E",
                  background: "#FFFFFF",
                  outline: "none",
                  fontFamily: "Georgia, serif"
                }}
              />
              {errors.confirmPassword && <div style={{ marginTop: "4px", fontSize: "0.75rem", color: "#EF4444" }}>{errors.confirmPassword}</div>}
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn-create ${loading ? "loading" : ""}`}
            >
              <div className="spinner"></div>
              <span className="btn-text">Create account</span>
            </button>

          </form>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0"
          }}>
            <hr style={{ flex: "1", border: "none", borderTop: "1px solid #E5E7EB" }} />
            <span style={{ fontSize: "0.78rem", color: "#9CA3AF" }}>Already have an account?</span>
            <hr style={{ flex: "1", border: "none", borderTop: "1px solid #E5E7EB" }} />
          </div>

          <div style={{ textAlign: "center", fontSize: "0.88rem", color: "#4B5563" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); nav("/login"); }} style={{
              color: "#115E59",
              fontWeight: "700",
              textDecoration: "none"
            }}>Log in</a>
          </div>

        </div>
      </main>
    </div>
  );
}