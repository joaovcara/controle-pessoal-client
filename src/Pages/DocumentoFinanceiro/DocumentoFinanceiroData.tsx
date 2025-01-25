import { TableColumnsType, Tooltip } from "antd";
import { DocumentoFinanceiroType } from "../../Types/DocumentoFinanceiroType";
import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Icons } from "../../components/IconPicker/Icons";

const columns: TableColumnsType<DocumentoFinanceiroType> = [
  {
    title: "Situação",
    dataIndex: "situacao",
    width: "70px",
    align: "center",
    render: (_, record) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {record.dataPagamento ? (
          <Tooltip title="Pago">
            <CheckCircleFilled style={{ color: "green", fontSize: "20px" }} />
          </Tooltip>
        ) : (
          <Tooltip title="Pendente">
            <ExclamationCircleFilled style={{ color: "#F44336", fontSize: "20px" }} />
          </Tooltip>
        )}
      </div>
    ),
  },
  {
    title: "Id",
    dataIndex: "id",
    width: "auto",
    hidden: true,
    sorter: (a, b) => (a.id ?? 0) - (b.id ?? 0),
  },
  {
    title: "Data",
    dataIndex: "dataDocumento",
    sorter: (a, b) => {
      const parseDate = (dateString: string | "") => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      const dateA = parseDate(a.dataDocumento ?? "");
      const dateB = parseDate(b.dataDocumento ?? "");

      return dateA - dateB;
    },
  },
  {
    title: "Documento",
    dataIndex: "numeroDocumento",
    width: "auto",
    hidden: true,
    sorter: (a, b) => a.numeroDocumento.localeCompare(b.numeroDocumento),
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    width: "auto",
    sorter: (a, b) => a.descricao.localeCompare(b.descricao),
  },
  {
    title: "idCategoria",
    dataIndex: "idCategoria",
    width: "auto",
    hidden: true,
    sorter: (a, b) => a.idCategoria - b.idCategoria,
  },
  {
    title: "Categoria",
    dataIndex: "descricaoCategoria",
    width: "auto",
    sorter: (a, b) => a.descricaoCategoria.localeCompare(b.descricaoCategoria),
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: record.corCategoria,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            color: "#fff"
          }}
        >
          {record.iconeCategoria ? Icons[record.iconeCategoria] : null}
        </div>
        {record.descricaoCategoria}
      </div>
    ),
  },
  {
    title: "Valor",
    dataIndex: "valor",
    width: "auto",
    sorter: (a, b) => a.valor - b.valor,
    render: (value) => (`R$ ${value.toFixed(2)}`).replace(".", ","),
  },
  {
    title: "Vencimento",
    dataIndex: "dataVencimento",
    sorter: (a, b) => {
      const parseDate = (dateString: string | "") => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      const dateA = parseDate(a.dataVencimento ?? "");
      const dateB = parseDate(b.dataVencimento ?? "");

      return dateA - dateB;
    },
  },
  {
    title: "Data de Pagamento",
    dataIndex: "dataPagamento",
    hidden: true,
    sorter: (a, b) => {
      const parseDate = (dateString: string | "") => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      const dateA = parseDate(a.dataPagamento ?? "");
      const dateB = parseDate(b.dataPagamento ?? "");

      return dateA - dateB;
    },
  },
  {
    title: "Ações",
    dataIndex: "action",
    align: "center",
  },
];

export default columns;