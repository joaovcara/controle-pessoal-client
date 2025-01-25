import { createContext, useContext, ReactNode } from "react";
import { CategoriaType } from "../Types/CategoriaType";
import { Create, GetAll, Update, Delete, GetAllByTipoReceitaDespesa } from "../services/CategoriaService";
import { notification } from "antd";

interface CategoriaContextProps {
  create: (categoria: CategoriaType) => Promise<boolean>;
  getAll: () => Promise<CategoriaType[]>;
  update: (categoria: CategoriaType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
  getAllByTipoReceitaDespesa: (tipoReceitaDespesa: string) => Promise<CategoriaType[]>;
}

const CategoriaContext = createContext<CategoriaContextProps | undefined>(undefined);

export const CategoriaProvider = ({ children }: { children: ReactNode }) => {
  // Função de criar categoria
  const create = async (categoria: CategoriaType): Promise<boolean> => {
    try {
      await Create(categoria);
      notification.success({
        message: "Sucesso",
        description: "Categoria criada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao criar categoria!",
      });
      return false;
    }
  };

  // Função para recuperar categorias
  const getAll = async (): Promise<CategoriaType[]> => {
    try {
      const data = await GetAll();
      return data;
    } catch (error) {
      console.error("Erro ao recuperar categorias:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar categorias!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função para recuperar categorias
  const getAllByTipoReceitaDespesa = async (
    tipoReceitaDespesa: string
  ): Promise<CategoriaType[]> => {
    try {
      const data = await GetAllByTipoReceitaDespesa(tipoReceitaDespesa);
      return data;
    } catch (error) {
      console.error("Erro ao recuperar categorias:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar categorias!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função de atualizar categoria
  const update = async (categoria: CategoriaType): Promise<boolean> => {
    try {
      await Update(categoria);
      notification.success({
        message: "Sucesso",
        description: "categoria atualizada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao atualizar categoria!",
      });
      return false;
    }
  };

  // Função de deletar categoria
  const deletecategoria = async (id: number): Promise<boolean> => {
    try {
      await Delete(id);
      notification.success({
        message: "Sucesso",
        description: "categoria deletada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao deletar categoria!",
      });
      return false;
    }
  };

  return (
    <CategoriaContext.Provider
      value={{ create, getAll, update, delete: deletecategoria, getAllByTipoReceitaDespesa }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoria = () => {
  const context = useContext(CategoriaContext);
  if (!context) {
    throw new Error(
      "useCategoria deve ser usado dentro de um categoriaProvider"
    );
  }
  return context;
};