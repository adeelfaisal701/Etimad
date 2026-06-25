import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import LoginModal from "./LoginModal";

function Navbar() {
  
  const inputRef = useRef();
  const { t, i18n } = useTranslation();
  const [activeBtn, setActiveBtn] = useState("login");

const [openLogin, setOpenLogin] = useState(true);

  // const [openLogin, setOpenLogin] = useState(false);

  const handleSearch = () => {
    inputRef.current.focus();
  };

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div style={{ background:"#fff", padding:"10px 20px" }}>

      <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        direction:"ltr"
      }}>

        {/* LOGO */}
        <img src={logo} style={{ width:"120px" }} />

        {/* SEARCH */}
        <div style={{
          display:"flex",
          width:"50%",
          border:"1px solid #ccc",
          borderRadius:"5px",
          overflow:"hidden"
        }}>

          <input
            ref={inputRef}
            placeholder={t("search")}
            style={{
              flex:1,
              padding:"10px",
              border:"none",
              outline:"none"
            }}
          />

          <div
            onClick={handleSearch}
            style={{
              background:"#22666B",
              padding:"0 18px",
              display:"flex",
              alignItems:"center",
              cursor:"pointer"
            }}
          >
            <FaSearch style={{ color:"#fff" }} />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div style={{
          display:"flex",
          alignItems:"center",
          gap:"10px"
        }}>

          {/* LOGIN (MODAL OPEN) */}
          <button
  onClick={() => {
    setOpenLogin(true);
    setActiveBtn("login");   
  }}
  style={{
    padding:"6px 15px",
    borderRadius:"20px",
    border:"1px solid #22666B",
    background: activeBtn === "login" ? "#22666B" : "white",
    color: activeBtn === "login" ? "white" : "black",
    cursor:"pointer"
  }}
>
  {t("login")}
</button>

          {/* SIGNUP (abhi simple button rakha) */}
          <button
  onClick={() => setActiveBtn("signup")}   
  style={{
    padding:"6px 15px",
    borderRadius:"20px",
    border:"none",
    background: activeBtn === "signup" ? "#22666B" : "#e0e0e0",
    color: activeBtn === "signup" ? "white" : "black",
    cursor:"pointer"
  }}
>
  {t("signup")}
</button>
          {/* LANGUAGE */}
          <span
            onClick={changeLanguage}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif"
            }}
          >
            {i18n.language === "en"
              ? "زبان تبدیل کریں"
              : "Change Language"}
          </span>

        </div>

      </div>

      {/* ✅ MODAL YAHAN HOGA (IMPORTANT) */}
      <LoginModal 
        isOpen={openLogin} 
        onClose={() => setOpenLogin(false)} 
      />

    </div>
  );
}

export default Navbar;