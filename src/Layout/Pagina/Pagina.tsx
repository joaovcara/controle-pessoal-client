import { theme, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import TableBase from "../../components/Table/TableBase";
import { ColumnType } from "antd/es/table";
import { useLoading } from "../../contexts/PaginaContext";
import { useMediaQuery } from "react-responsive";

export interface PaginaProps<T extends object> {
  pageTitle: string; // Título da página
  pageIcon: React.ReactNode; // Ícone da página
  dataSource: T[]; // Dados para a tabela
  columns: ColumnType<T>[]; // Definição das colunas da tabela
  tituloAcaoIncluir: string; // Título da ação de inclusão
  formulario: React.ReactNode; // Formulário de inclusão
  isModalOpen: boolean; // Estado do modal
  setIsModalOpen: (open: boolean) => void; // Função para abrir/fechar o modal
  modalWidth?: string | number; // Adicione a propriedade modalWidth
  onDownload: () => void; // Função para download de dados
}

export default function Pagina<T extends object>({
  pageTitle,
  pageIcon,
  dataSource,
  columns,
  tituloAcaoIncluir,
  formulario,
  isModalOpen,
  setIsModalOpen,
  modalWidth, // Adicione a propriedade modalWidth
  onDownload,
}: PaginaProps<T>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { isLoading } = useLoading();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "calc(100vh - 160px)",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Content
      style={{        
        padding: 10,
        marginInline: isMobile ?  20 : 80,
        marginTop: 20,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        border: "none", 
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)'
      }}
    >
      <TableBase<T>
        tituloAcaoIncluir={tituloAcaoIncluir}
        pageTitle={pageTitle}
        pageIcon={pageIcon}
        data={dataSource}
        columnsData={columns}
        formulario={formulario}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalWidth={modalWidth} // Passe a propriedade modalWidth
        onDownload={onDownload}
      />
    </Content>
  );
}