import axios from "axios";
import { Logout } from "./LoginService";
import { notification } from "antd";
import { isTokenExpired } from "../utils/Jwt";

// Identifica o ambiente atual
const apiUrl = import.meta.env.VITE_API_URL;

const Api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para adicionar o token em todas as requisições
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (isTokenExpired(token)) {
      // Token expirou, redirecione para a página de login
      notification.error({
        message: "Sessão Expirada",
        description: "Sua sessão expirou. Por favor, faça login novamente.",
      });
      Logout();
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor para capturar erros de resposta
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Caso a API esteja indisponível (exemplo: status >= 500 ou sem resposta)
    if (!error.response || error.response.status >= 500) {
      Logout();
    }
    // Verifica se o status é 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      notification.error({
        message: "Sessão Expirada",
        description: "Sua sessão expirou. Por favor, faça login novamente.",
      });
    }
    return Promise.reject(error);
  }
);

export default Api;