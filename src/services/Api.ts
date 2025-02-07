import axios from "axios";
import { Logout } from "./LoginService";
import { isTokenExpired } from "../utils/Jwt";

// Identifica o ambiente atual
const apiUrl = import.meta.env.VITE_API_URL;

// Cria a instância do axios
const Api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Interceptor de Request (Autenticação)
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        alert("Sessão Expirada");
        Logout();

        // Cancela a requisição para evitar que vá ao response
        const cancelSource = axios.CancelToken.source();
        config.cancelToken = cancelSource.token;
        cancelSource.cancel("Sessão Expirada");

        return Promise.reject(new axios.Cancel("Sessão Expirada"));
      }

      // Adiciona o token ao cabeçalho
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de Response (Tratamento de Erros)
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ignora requisições canceladas
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        Logout();
        return Promise.reject(new Error("Não Autorizado"));
      }

      if (status >= 500) {
        Logout();
        return Promise.reject(new Error("API Indisponível"));
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
