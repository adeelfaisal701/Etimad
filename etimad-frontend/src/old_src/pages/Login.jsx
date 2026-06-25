import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();

  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#f5f5f5"
    }}>
      <div style={{
        width:"300px",
        padding:"20px",
        background:"#fff",
        borderRadius:"10px",
        boxShadow:"0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2>{t("login")}</h2>

        <input placeholder="Email" style={{width:"100%", padding:"10px", margin:"10px 0"}} />
        <input type="password" placeholder="Password" style={{width:"100%", padding:"10px", margin:"10px 0"}} />

        <button style={{
          width:"100%",
          padding:"10px",
          background:"#22666B",
          color:"#fff",
          border:"none"
        }}>
          {t("login")}
        </button>
      </div>
    </div>
  );
}

export default Login;