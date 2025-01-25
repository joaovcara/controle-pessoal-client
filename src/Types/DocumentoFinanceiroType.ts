export interface DocumentoFinanceiroType {
  id: number;
  dataDocumento: string;
  numeroDocumento: string;
  descricao: string;
  idCategoria: number;
  descricaoCategoria: string;
  corCategoria?: string;
  iconeCategoria?: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
}