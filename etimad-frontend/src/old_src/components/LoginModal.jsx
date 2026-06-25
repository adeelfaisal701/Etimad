import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

function LoginModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("password");

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999
    }}>

      <div style={{
        width: "420px",
        background: "#f9f9f9",
        padding: "25px",
        borderRadius: "12px",
        position: "relative"
      }}>

        {/* CLOSE */}
        <span onClick={onClose} style={{
          position: "absolute",
          right: "15px",
          top: "10px",
          fontSize: "22px",
          cursor: "pointer"
        }}>✕</span>

        {/* TABS */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "25px",
          fontWeight: "bold"
        }}>
          <span
            onClick={() => setActiveTab("password")}
            style={{
              cursor: "pointer",
              color: activeTab === "password" ? "#000" : "#aaa"
            }}
          >
            Password
          </span>

          <span>|</span>

          <span
            onClick={() => setActiveTab("phone")}
            style={{
              cursor: "pointer",
              color: activeTab === "phone" ? "#000" : "#aaa"
            }}
          >
            Phone Number
          </span>
        </div>

        {/* ================= PASSWORD VIEW ================= */}
        {activeTab === "password" && (
          <>
            <input
              placeholder="Please enter your Phone or Email"
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Please enter your password"
              style={inputStyle}
            />

            <div style={forgotStyle}>Forgot password?</div>

            <button style={loginBtn}>
              LOGIN
            </button>
          </>
        )}

        {/* ================= PHONE VIEW ================= */}
        {activeTab === "phone" && (
          <>
            <div style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px"
            }}>
              {/* COUNTRY CODE */}
              <div style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                width: "80px",
                textAlign: "center"
              }}>
                PK+92
              </div>

              {/* PHONE INPUT */}
              <input
                placeholder="Please enter your phone number"
                style={{ ...inputStyle, marginBottom: 0 }}
              />
            </div>

            {/* WHATSAPP BUTTON */}
            <button style={{
              width: "100%",
              padding: "12px",
              background: "#22666B", // orange jaisa screenshot
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}>
              <FaWhatsapp size={20} />
              Send code via Whatsapp
            </button>
          </>
        )}

        {/* SIGNUP */}
        <p style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "14px"
        }}>
          Don't have an account?{" "}
          <span style={{ color: "#22666B", cursor: "pointer" }}>
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

/* STYLES */
const inputStyle = {
  width: "95%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const loginBtn = {
  width: "100%",
  padding: "12px",
  background: "#22666B",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};

const forgotStyle = {
  textAlign: "right",
  fontSize: "13px",
  color: "#777",
  marginBottom: "15px",
  cursor: "pointer"
};

export default LoginModal;