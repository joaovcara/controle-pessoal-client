import { DocumentoFinanceiroType } from "../Types/DocumentoFinanceiroType";
import Api from "./Api";

/**
 * Função de Cadastro de documentoFinanceiro
 * @param documentoFinanceiro
 * @returns
 */
export const Create = async (documentoFinanceiro: DocumentoFinanceiroType): Promise<DocumentoFinanceiroType> => {
  try {
    const response = await Api.post("/DocumentoFinanceiro/create", documentoFinanceiro);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar despesa: " + error);
  }
};

/**
 * Função de atualização de documentoFinanceiro
 * @param documentoFinanceiro
 * @returns
 */
export const Update = async (documentoFinanceiro: DocumentoFinanceiroType): Promise<string> => {
  try {
    const response = await Api.put(`/DocumentoFinanceiro/update/${documentoFinanceiro.id}`, documentoFinanceiro);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao atualizar despesa: " + error);
  }
};

/**
 * Função de delete de documentoFinanceiro
 * @param id
 * @returns
 */
export const Delete = async (id: number): Promise<unknown> => {
  try {
    const response = await Api.delete(`/DocumentoFinanceiro/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao deletar despesa: " + error);
  }
};

/**
 * Função de buscar todos documentoFinanceiro
 * @returns
 */
export const GetAll = async (tipoReceitaDespesa: string): Promise<DocumentoFinanceiroType[]> => {
  try {
    const response = await Api.get(`/DocumentoFinanceiro/getAll/${tipoReceitaDespesa}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar despesas: " + error);
  }
};

/**
 * Função de buscar documentoFinanceiro por id
 * @param id
 * @returns
 */
export const GetById = async (id: number): Promise<DocumentoFinanceiroType> => {
  try {
    const response = await Api.get(`/DocumentoFinanceiro/getById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar despesa: " + error);
  }
};

/**
 * Função de pagamento de documentoFinanceiro
 * @param documentoFinanceiro
 * @returns
 */
export const Pagamento = async (documentoFinanceiro: DocumentoFinanceiroType): Promise<string> => {
  try {
    const response = await Api.post(`/DocumentoFinanceiro/pagamento/${documentoFinanceiro.id}`, documentoFinanceiro);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao pagar despesa: " + error);
  }
}