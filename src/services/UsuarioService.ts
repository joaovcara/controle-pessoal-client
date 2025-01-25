import { UsuarioType } from "../Types/UsuarioType";
import Api from "./Api";

/**
 * Função de Cadastro de usuário
 * @param user
 * @returns
 */
export const Create = async (user: UsuarioType): Promise<UsuarioType> => {
  try {
    const response = await Api.post("/Usuario/create", user);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error);
  }
};

/**
 * Função de atualização de usuário
 * @param user
 * @returns
 */
export const Update = async (user: UsuarioType): Promise<string> => {
  try {
    const response = await Api.put("/Usuario/update", user);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar usuário: " + error);
  }
};

/**
 * Função de delete de usuário
 * @param id
 * @returns
 */
export const Delete = async (id: number): Promise<unknown> => {
  try {
    const response = await Api.delete(`/Usuario/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar usuários: " + error);
  }
};

/**
 * Função de buscar todos usuários
 * @returns
 */
export const GetAll = async (): Promise<UsuarioType[]> => {
  try {
    const response = await Api.get("/Usuario/getAll");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar usuários: " + error);
  }
};

/**
 * Função de buscar usuário por id
 * @param id
 * @returns
 */
export const GetById = async (id: number): Promise<UsuarioType> => {
  try {
    const response = await Api.get(`/Usuario/getById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar usuário: " + error);
  }
};

/**
 * Solicita reset de senha enviando um token temporário ao email do usuário.
 * @param email Email do usuário que receberá o link de redefinição.
 * @param frontendDomain Domínio do front-end para construir a URL de redefinição.
 * @param htmlContent Conteúdo HTML do email, com placeholders para substituição.
 * @param plainTextContent Conteúdo de texto simples do email, com placeholders para substituição.
 * @returns Resposta da API com mensagem de sucesso ou erro.
 */
export const RequestPasswordReset = async (
  email: string,
  frontendDomain: string,
  htmlContent: string,
  plainTextContent: string
): Promise<UsuarioType> => {
  try {
    const response = await Api.post(`/Usuario/requestPasswordReset`, {
      email,
      frontendDomain,
      htmlContent,
      plainTextContent,
    });
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao solicitar recuperação de senha: " + (error.response?.data?.message || error.message));
  }
};

/**
 * Reseta a senha do usuário usando o token enviado.
 * @param resetRequest
 * @returns
 */
export const ResetPassword = async (resetRequest: {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ message: string }> => {
  try {
    const response = await Api.post("/Usuario/resetPassword", resetRequest);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao resetar senha: " + error.response?.data?.message || error.message);
  }
};