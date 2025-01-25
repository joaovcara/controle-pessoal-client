import { ColumnType } from "antd/es/table";

// Função para converter dados em CSV
export const convertToCSV = <T>(data: T[], columns: ColumnType<T>[]) => {
  const header = columns.map((col) => col.title).join(";"); // Obtém o título das colunas para o cabeçalho

  const rows = data
    .map((row) =>
      columns
        .map((col) => {
          const value = row[col.dataIndex as keyof T];
          // Escapa caracteres especiais e envolve valores com aspas duplas
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(";")
    )
    .join("\n"); // Junta as linhas com nova linha

  return `${header}\n${rows}`;
};

/**
 * Função para download do CSV
 * @param data Dados
 * @param columnsData Colunas
 * @param pageTitle Titulo do CSV
 */
export const handleDownloadCSV = <T>(
  data: T[],
  columnsData: ColumnType<T>[],
  pageTitle: string
) => {
  // Remove a coluna de ações
  const columnsAux = columnsData.filter((x) => x.title != "Ações");

  const csvData = convertToCSV(data, columnsAux);
  const bom = "\uFEFF"; // Adiciona BOM para UTF-8
  const blob = new Blob([bom + csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${pageTitle}.csv`);
    link.click(); // Aciona o download
  }
};