import { CategoriaType } from "../Types/CategoriaType";
import Api from "./Api";

/**
 * Função de Cadastro de categoria
 * @param categoria
 * @returns
 */
export const Create = async (categoria: CategoriaType): Promise<CategoriaType> => {
  try {
    const response = await Api.post("/Categoria/create", categoria);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar categoria: " + error);
  }
};

/**
 * Função de atualização de categoria
 * @param categoria
 * @returns
 */
export const Update = async (categoria: CategoriaType): Promise<string> => {
  try {
    const response = await Api.put(`/Categoria/update/${categoria.id}`, categoria );
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar categoria: " + error);
  }
};

/**
 * Função de delete de categoria
 * @param id
 * @returns
 */
export const Delete = async (id: number): Promise<unknown> => {
  try {
    const response = await Api.delete(`/Categoria/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar categorias: " + error);
  }
};

/**
 * Função de buscar todas categorias
 * @returns
 */
export const GetAll = async (): Promise<CategoriaType[]> => {
  try {
    const response = await Api.get("/Categoria/getAll");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar categorias: " + error);
  }
};

/**
 * Função de buscar todas categorias por tipo receita despesa
 * @returns
 */
export const GetAllByTipoReceitaDespesa = async (tipoReceitaDespesa: string): Promise<CategoriaType[]> => {
  try {
    const response = await Api.get(`/Categoria/getAllByTipoReceitaDespesa/${tipoReceitaDespesa}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar categorias: " + error);
  }
};


/**
 * Função de buscar categoria por id
 * @param id
 * @returns
 */
export const GetById = async (id: number): Promise<CategoriaType> => {
  try {
    const response = await Api.get(`/Categoria/getById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar categoria: " + error);
  }
};
