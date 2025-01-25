import { useEffect, useState, useCallback } from "react";
import { Row, Col, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Pagina from "../../Layout/Pagina/Pagina";
import { DollarCircleOutlined, ShoppingOutlined, LeftOutlined, RightOutlined, CalendarOutlined } from "@ant-design/icons";
import { DocumentoFinanceiroType } from "../../Types/DocumentoFinanceiroType";
import { useLoading } from "../../contexts/PaginaContext";
import columns from "./DocumentoFinanceiroData";
import TableActions from "../../components/Table/TableActions";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import { useDocumentoFinanceiro } from "../../contexts/DocumentoFinanceiroContext";
import DocumentoFinanceiroForm from "./DocumentoFinanceiroForm";
import { formatDate } from "../../utils/FormatDate";
import { handleDownloadCSV } from "../../utils/ExportToCsv";
import ModalLayout from "../../components/Modal/ModalLayout";
import DocumentoFinanceiroPagarForm from "./DocumentoFinanceiroPagarForm";

type DocumentoFinanceiroReopenType = Pick<DocumentoFinanceiroType, 'id' | 'dataPagamento' | 'valor' | 'idCategoria'>;
const colorBase = "#621d7e";

export default function DocumentoFinanceiro() {
  const { getAll, delete: deleteDocumentoFinanceiro, tipoDocumento, pagamento } = useDocumentoFinanceiro();
  const { setLoading } = useLoading();
  const [documentoFinanceiros, setDocumentoFinanceiros] = useState<DocumentoFinanceiroType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPagamentoOpen, setIsModalPagamentoOpen] = useState(false);
  const [editingDocumentoFinanceiro, setEditingDocumentoFinanceiro] = useState<DocumentoFinanceiroType | undefined>(undefined);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [documentoFinanceiroToDelete, setDocumentoFinanceiroToDelete] = useState<DocumentoFinanceiroType | undefined>(undefined);
  const [documentoFinanceiroPagar, setDocumentoFinanceiroPagar] = useState<DocumentoFinanceiroType | undefined>(undefined);
  const [isModalReopenOpen, setIsModalReopenOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [documentoFinanceiroReopen, setDocumentoFinanceiroReopen] = useState<DocumentoFinanceiroType | undefined>(undefined);

  const fetchDocumentoFinanceiros = useCallback(async () => {
    setLoading(true);
    const documentoFinanceiros = await getAll();
    const filteredDocumentoFinanceiros = documentoFinanceiros.filter((documentoFinanceiro) => {
      const date = new Date(documentoFinanceiro.dataVencimento);
      const selectedMonthYear = `${selectedMonth.month() + 1}-${selectedMonth.year()}`;
      const documentMonthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      return documentMonthYear === selectedMonthYear;
    });
    const formattedDocumentoFinanceiros = filteredDocumentoFinanceiros.map(
      (documentoFinanceiro: DocumentoFinanceiroType) => ({
        key: documentoFinanceiro.id,
        id: documentoFinanceiro.id,
        dataDocumento: formatDate(documentoFinanceiro.dataDocumento),
        numeroDocumento: documentoFinanceiro.numeroDocumento,
        descricao: documentoFinanceiro.descricao,
        idCategoria: documentoFinanceiro.idCategoria,
        descricaoCategoria: documentoFinanceiro.descricaoCategoria,
        corCategoria: documentoFinanceiro.corCategoria,
        iconeCategoria: documentoFinanceiro.iconeCategoria,
        valor: documentoFinanceiro.valor,
        dataVencimento: formatDate(documentoFinanceiro.dataVencimento),
        dataPagamento: documentoFinanceiro.dataPagamento
          ? formatDate(documentoFinanceiro.dataPagamento)
          : undefined,
        situacao: documentoFinanceiro.dataPagamento ? "Paga" : "Pendente",
      })
    );

    // Ordenar para colocar as pendentes no início
    const sortedDocumentoFinanceiros = formattedDocumentoFinanceiros.sort((a, b) => {
      if (a.situacao === "Pendente" && b.situacao === "Paga") {
        return -1; // a vem antes de b
      }
      if (a.situacao === "Paga" && b.situacao === "Pendente") {
        return 1; // b vem antes de a
      }
      return 0; // sem alteração
    });

    setDocumentoFinanceiros(sortedDocumentoFinanceiros);
    setLoading(false);
  }, [getAll, selectedMonth, setLoading]);

  useEffect(() => {
    fetchDocumentoFinanceiros();
  }, [fetchDocumentoFinanceiros]);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedMonth(date);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingDocumentoFinanceiro(undefined);
    fetchDocumentoFinanceiros();
  };

  const handleEdit = (documentoFinanceiro: DocumentoFinanceiroType) => {
    setEditingDocumentoFinanceiro(documentoFinanceiro);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteDocumentoFinanceiro(id);
    fetchDocumentoFinanceiros();
  };

  const handleConfirmDelete = (documentoFinanceiro: DocumentoFinanceiroType) => {
    setDocumentoFinanceiroToDelete(documentoFinanceiro);
    setIsModalConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setDocumentoFinanceiroToDelete(undefined);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmDeleteModal = async () => {
    if (documentoFinanceiroToDelete) {
      await handleDelete(documentoFinanceiroToDelete.id!);
      setIsModalConfirmOpen(false);
    }
  };

  const handleDownload = () => {
    handleDownloadCSV(documentoFinanceiros, columns, tipoDocumento ?? "");
  };

  const handlePagamento = (documentoFinanceiro: DocumentoFinanceiroType) => {
    setDocumentoFinanceiroPagar(documentoFinanceiro);
    setIsModalPagamentoOpen(true);
  };

  const handleCancelPagamento = () => {
    setIsModalPagamentoOpen(false);
    fetchDocumentoFinanceiros();
  };

  // Função para abrir o modal de reabertura
  const handleReopen = (documentoFinanceiro: DocumentoFinanceiroType) => {
    setDocumentoFinanceiroReopen(documentoFinanceiro);
    setIsModalReopenOpen(true);
  };

  // Função para confirmar a reabertura
  const handleConfirmReopen = async () => {
    if (documentoFinanceiroReopen) {
      const updatedDocumentoFinanceiro: DocumentoFinanceiroReopenType = {
        id: documentoFinanceiroReopen.id,
        dataPagamento: undefined,
        valor: documentoFinanceiroReopen.valor,
        idCategoria: documentoFinanceiroReopen.idCategoria,
      };
      await pagamento(updatedDocumentoFinanceiro as DocumentoFinanceiroType);
      setIsModalReopenOpen(false);
      fetchDocumentoFinanceiros();
    }
  };

  // Função para cancelar a reabertura
  const handleCancelReopen = () => {
    setDocumentoFinanceiroReopen(undefined);
    setIsModalReopenOpen(false);
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setSelectedMonth((prevMonth) =>
      direction === "prev" ? prevMonth.subtract(1, "month") : prevMonth.add(1, "month")
    );
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" align="middle" style={{ marginBottom: 16 }}>
        <Col style={{ padding: 0 }}>
          <Button
            icon={<LeftOutlined />}
            onClick={() => handleMonthChange("prev")}
            style={{ 
              margin: 0,
              backgroundColor: colorBase,
              color: "#FFF",
              border: "none",               
              maxWidth: 30,
              maxHeight: 30,
            }}
          />
        </Col>
        <Col>
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={handleDateChange}
            format={(date) => {
              const monthName = date.format("MMMM/YYYY");
              return monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase(); // Primeira letra maiúscula e as demais minúsculas
            }}
            allowClear={false}
            style={{
              background: colorBase,
              color: "#FFF",
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              border: "none"
            }}
            suffixIcon={<CalendarOutlined style={{ color: "#FFF" }} />}
          />
        </Col>
        <Col style={{ padding: 0 }}>
          <Button
            icon={<RightOutlined />}
            onClick={() => handleMonthChange("next")}
            style={{ 
              margin: 0,
              backgroundColor: colorBase,
              color: "#FFF",
              border: "none",
              maxWidth: 30,
              maxHeight: 30,
            }}
          />
        </Col>
      </Row>
      <Pagina<DocumentoFinanceiroType>
        pageTitle={tipoDocumento ?? ""}
        pageIcon={
          tipoDocumento == "Receita" ? (
            <DollarCircleOutlined />
          ) : (
            <ShoppingOutlined />
          )
        }
        dataSource={documentoFinanceiros}
        columns={columns.map((col) => {
          if ("dataIndex" in col && col.dataIndex === "action") {
            return {
              ...col,
              render: (_, record) => (
                <TableActions
                  actions={record.dataPagamento ? ["edit", "delete", "reopen"] : ["edit", "delete", "pay"]}
                  onEdit={() => handleEdit(record)}
                  onDelete={() => handleConfirmDelete(record)}
                  onPay={() => handlePagamento(record)}
                  onReopen={() => handleReopen(record)}
                />
              ),
            };
          }
          return col;
        })}
        tituloAcaoIncluir={`Cadastro de ${tipoDocumento}`}
        formulario={
          <DocumentoFinanceiroForm
            onClose={handleModalClose}
            initialValues={editingDocumentoFinanceiro}
          />
        }
        isModalOpen={isModalOpen}
        setIsModalOpen={(open) => {
          if (!open) {
            setEditingDocumentoFinanceiro(undefined);
          }
          setIsModalOpen(open);
        }}
        modalWidth="45%"
        onDownload={handleDownload}
      />
      <ModalConfirm
        title={`Deletar ${tipoDocumento}`}
        visible={isModalConfirmOpen}
        onConfirm={handleConfirmDeleteModal}
        onCancel={handleCancelDelete}
        text={`Deseja realmente deletar a ${tipoDocumento} número ${documentoFinanceiroToDelete?.numeroDocumento ?? ""}?`}
      />
      <ModalLayout
        formulario={<DocumentoFinanceiroPagarForm initialValues={documentoFinanceiroPagar} onClose={handleCancelPagamento} />}
        onClose={handleCancelPagamento}
        open={isModalPagamentoOpen}
        titulo={
          documentoFinanceiroPagar?.dataPagamento == undefined
            ? `Efetuar pagamento da ${tipoDocumento}`
            : `Reabrir ${tipoDocumento}`
        }
        width={400}
      />
      <ModalConfirm
        title={`Reabrir ${tipoDocumento}`}
        visible={isModalReopenOpen}
        onConfirm={handleConfirmReopen}
        onCancel={handleCancelReopen}
        text={`Deseja realmente reabrir a ${tipoDocumento} número ${documentoFinanceiroReopen?.numeroDocumento ?? ""}?`}
      />
    </>
  );
}
