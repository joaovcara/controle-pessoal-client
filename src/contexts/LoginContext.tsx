import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import { CheckApi, Login, Logout } from "../services/LoginService";
import { notification } from "antd";

interface LoginContextProps {
  isLoginAutenticated: boolean;
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginAutenticated, setIsLoginAutenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Função de login
  const login = async (user: string, password: string) => {
    const isApiAvailable = await CheckApi();

    if (!isApiAvailable) {
      notification.error({
        message: "Erro",
        description: "A API está indisponível. Por favor, tente novamente mais tarde.",
      });
      return;
    }

    try {
      const { token, nomeUsuario } = await Login(user, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", nomeUsuario);
      setIsLoginAutenticated(true);
      setUser(nomeUsuario);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      notification.error({
        message: "Erro",
        description: "Credenciais inválidas!",
      });
    }
  };

  // Função de logout
  const logout = () => {
    setIsLoginAutenticated(false);
    setUser(null);
    Logout();
  };

  return (
    <LoginContext.Provider value={{ isLoginAutenticated, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin deve ser usado dentro de um LoginProvider");
  }
  return context;
};