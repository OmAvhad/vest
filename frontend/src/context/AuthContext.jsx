import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { api } from "@/api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (token) {
        const response = await api.get("/users/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.username);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      // Get the new 
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    const response = await api.post("/users/login", { username, password });
    Cookies.set("accessToken", response.data.access_token);
    Cookies.set("refreshToken", response.data.refresh_token);
    setUser(username);
    setIsAuthenticated(true);
  };

  const register = async (name, username, password, email) => {
    const response = await api.post("/users/register", {
      name,
      username,
      password,
      email
    });
    Cookies.set("accessToken", response.data.access_token);
    Cookies.set("refreshToken", response.data.refresh_token);
    setUser(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
