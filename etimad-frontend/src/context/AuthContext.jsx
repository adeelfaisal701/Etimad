import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // LOGIN
  const login = async (data) => {
    const res = await API.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);

    return res.data.user;
  };

  // SWITCH ROLE
  const switchRole = async () => {
    const res = await API.post("/auth/switch-role");

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);

    return res.data.user;
  };

  // REGISTER
  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    return res.data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
  localStorage.removeItem("user");
    localStorage.clear();
    setUser(null);
  };

  const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, getUser, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);