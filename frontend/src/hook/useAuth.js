import { useState, createContext, useContext } from "react";
import * as auth from "../services/userService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(auth.getUser());

  const login = async (email, password) => {
    try {
      const user = await auth.login(email, password);
      setUser(user);
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const register = async (data) => {
    try {
      const user = await auth.register(data);
      setUser(user);
      toast.success("Register successful");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    toast.info("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
