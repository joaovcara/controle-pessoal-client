import { createContext, useContext, ReactNode } from "react";
import { UsuarioType } from "../Types/UsuarioType";
import { Create, GetAll, Update, Delete, RequestPasswordReset } from "../services/UsuarioService";
import { notification } from "antd";

interface UsuarioContextProps {
  create: (user: UsuarioType) => Promise<boolean>;
  getAll: () => Promise<UsuarioType[]>;
  update: (user: UsuarioType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
  requestPasswordReset: (email: string, frontendDomain: string, htmlContent: string, plainTextContent: string) => Promise<boolean>;
}

const UsuarioContext = createContext<UsuarioContextProps | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  // Função de criar usuário
  const create = async (user: UsuarioType): Promise<boolean> => {
    try {
      await Create(user);
      notification.success({
        message: "Sucesso",
        description: "Usuário criado com sucesso1",
      });
      notification.info({
        message: "Info",
        description: "Senha padrão: " + user.usuario,
      });
      return true;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao criar usuário!",
      });
      return false;
    }
  };

  // Função para recuperar usuários
  const getAll = async (): Promise<UsuarioType[]> => {
    try {
      const data = await GetAll();
      return data;
    } catch (error) {
      console.error("Erro ao recuperar usuários:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar usuários!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função de atualizar usuário
  const update = async (user: UsuarioType): Promise<boolean> => {
    try {
      await Update(user);
      notification.success({
        message: "Sucesso",
        description: "Usuário atualizado com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao atualizar usuário!",
      });
      return false;
    }
  };

  // Função de deletar usuário
  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      await Delete(id);
      notification.success({
        message: "Sucesso",
        description: "Usuário deletado com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao deletar usuário!",
      });
      return false;
    }
  };

  // Função de deletar usuário
  const requestPasswordReset = async (
    email: string, 
    frontendDomain: string,   
    htmlContent: string,
    plainTextContent: string
  ): Promise<boolean> => {
    try {
      await RequestPasswordReset(email, frontendDomain, htmlContent, plainTextContent);
      notification.success({
        message: "Sucesso",
        description: "Usuário deletado com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao deletar usuário!",
      });
      return false;
    }
  };

  return (
    <UsuarioContext.Provider value={{ create, getAll, update, delete: deleteUser, requestPasswordReset }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de um UserProvider");
  }
  return context;
};