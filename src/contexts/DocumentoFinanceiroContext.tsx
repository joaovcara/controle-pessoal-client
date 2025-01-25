import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { DocumentoFinanceiroType } from "../Types/DocumentoFinanceiroType";
import { Create, GetAll, Update, Delete, Pagamento } from "../services/DocumentoFinanceiroService";
import { notification } from "antd";

interface DocumentoFinanceiroContextProps {
  create: (documentoFinanceiro: DocumentoFinanceiroType) => Promise<boolean>;
  getAll: (tipoReceitaDespesa?: string) => Promise<DocumentoFinanceiroType[]>;
  update: (documentoFinanceiro: DocumentoFinanceiroType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
  pagamento: (documentoFinanceiro: DocumentoFinanceiroType) => Promise<boolean>;
  tipoDocumento?: string;
  setTipoDocumento: (tipo: string) => void;
}

const DocumentoFinanceiroContext = createContext<DocumentoFinanceiroContextProps | undefined>(undefined);

interface DocumentoFinanceiroProviderProps {
  children: ReactNode;
  tipoDocumento: string;
}

export const DocumentoFinanceiroProvider: React.FC<DocumentoFinanceiroProviderProps> = ({ children, tipoDocumento }) => {
  const [tipoDocumentoState, setTipoDocumento] = useState<string>(tipoDocumento);

  useEffect(() => {
    setTipoDocumento(tipoDocumento);
  }, [tipoDocumento]);

  const create = async (documentoFinanceiro: DocumentoFinanceiroType): Promise<boolean> => {
    try {
      await Create(documentoFinanceiro);
      notification.success({
        message: "Sucesso",
        description: `${tipoDocumento} criada com sucesso`,
      });
      return true;
    } catch (error) {
      console.error(`Erro ao criar ${tipoDocumento}:`, error);
      notification.error({
        message: "Erro",
        description: `Erro ao criar ${tipoDocumento}!`,
      });
      return false;
    }
  };

  const getAll = async (tipoReceitaDespesa: string = tipoDocumento): Promise<DocumentoFinanceiroType[]> => {
    try {
      const data = await GetAll(tipoReceitaDespesa);
      return data;
    } catch (error) {
      console.error(`Erro ao recuperar ${tipoDocumento}:`, error);
      notification.error({
        message: "Erro",
        description: `Erro ao recuperar ${tipoDocumento}!`,
      });
      return [];
    }
  };

  const update = async (documentoFinanceiro: DocumentoFinanceiroType): Promise<boolean> => {
    try {
      await Update(documentoFinanceiro);
      notification.success({
        message: "Sucesso",
        description: `${tipoDocumento} atualizada com sucesso`,
      });
      return true;
    } catch (error) {
      console.error(`Erro ao atualizar ${tipoDocumento}:`, error);
      notification.error({
        message: "Erro",
        description: `Erro ao atualizar ${tipoDocumento}!`,
      });
      return false;
    }
  };

  const deleteDocumentoFinanceiro = async (id: number): Promise<boolean> => {
    try {
      await Delete(id);
      notification.success({
        message: "Sucesso",
        description: `${tipoDocumento} deletada com sucesso`,
      });
      return true;
    } catch (error) {
      console.error(`Erro ao deletar ${tipoDocumento}:`, error);
      notification.error({
        message: "Erro",
        description: `Erro ao deletar ${tipoDocumento}!`,
      });
      return false;
    }
  };

  const pagamento = async (documentoFinanceiro: DocumentoFinanceiroType): Promise<boolean> => {
    try {
      await Pagamento(documentoFinanceiro);
      documentoFinanceiro.dataPagamento ?
        notification.success({
          message: "Sucesso",
          description: `${tipoDocumento} paga com sucesso`,
        }) :
        notification.success({
          message: "Sucesso",
          description: `${tipoDocumento} reaberta com sucesso`,
        });
      return true;
    } catch (error) {
      console.error(`Erro ao pagar ${tipoDocumento}:`, error);
      notification.error({
        message: "Erro",
        description: `Erro ao pagar ${tipoDocumento}!`,
      });
      return false;
    }
  }

  return (
    <DocumentoFinanceiroContext.Provider value={{ create, getAll, update, delete: deleteDocumentoFinanceiro, tipoDocumento: tipoDocumentoState, setTipoDocumento, pagamento }}>
      {children}
    </DocumentoFinanceiroContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDocumentoFinanceiro = () => {
  const context = useContext(DocumentoFinanceiroContext);
  if (!context) {
    throw new Error("useDocumentoFinanceiro deve ser usado dentro de um DocumentoFinanceiroProvider");
  }
  return context;
};