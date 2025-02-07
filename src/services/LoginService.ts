import Api from "./Api";

/**
 * Função de login
 * @param user 
 * @param password 
 * @returns 
 */
export const Login = async (user: string, password: string) => {
  try {
    const response = await Api.post("/Login/login", {
      usuario: user,
      senha: password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao fazer login: " + error);
  }
};

/**
 * Função de logout
 */
export const Logout = () => {
  // Remove os dados da sessão
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redireciona para a rota de login
  setTimeout(() => {
    window.location.href = "/controlepessoal/login";
  }, 2000);
};

/**
 * Função para checar disponibilidade da api
 * @returns 
 */
export const CheckApi = async (): Promise<boolean> => {
  try {
    await Api.get("/Login/ping");
    return true; // API está disponível
  } catch (error) {
    console.error("A API está indisponível:", error);
    return false; // API não está disponível
  }
};