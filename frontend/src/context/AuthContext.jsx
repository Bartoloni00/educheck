import { useState, useEffect } from "react";
import { loginRequest, registerRequest } from "@/services/services.api.js";
import { setAuthToken } from "@/services/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const restoreSession = () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setToken(savedToken);
          setAuthToken(savedToken);
        }
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await loginRequest(email, password);

      const token = data.token;
      const user = data.usuario;

      if (!user || !token) return false;

      setUser(user);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthToken(token);

      return true;
    } catch {
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await registerRequest(formData);

      const token = data.token;
      const user = data.usuario;

      if (!user || !token) return false;

      setUser(user);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setAuthToken(token);

      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
