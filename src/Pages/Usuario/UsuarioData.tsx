import { TableColumnsType } from "antd";
import { UsuarioType } from "../../Types/UsuarioType";

const columns: TableColumnsType<UsuarioType> = [
  {
    title: "Id",
    dataIndex: "id",
    width: "auto",
    hidden: true,
    sorter: (a, b) => (a.id ?? 0) - (b.id ?? 0),
  },
  {
    title: "Nome",
    dataIndex: "nome",
    width: "auto",
    sorter: (a, b) => a.nome.localeCompare(b.nome),
  },
  {
    title: "Usuário",
    dataIndex: "usuario",
    width: "auto",
    sorter: (a, b) => (a.usuario ?? "").localeCompare(b.usuario ?? ""),
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "auto",
    sorter: (a, b) => a.email.localeCompare(b.email),
  },
  {
    title: "Data de Cadastro",
    dataIndex: "dataCadastro",
    width: "180px",
    hidden: true,
    sorter: (a, b) => {
      const parseDate = (dateString: string | "") => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      };

      const dateA = parseDate(a.dataCadastro ?? "");
      const dateB = parseDate(b.dataCadastro ?? "");

      return dateA - dateB;
    },
  },
  {
    title: "Ativo",
    dataIndex: "ativo",
    width: "auto",
    sorter: (a, b) => Number(a.ativo) - Number(b.ativo),
    render: (value: boolean) => (value ? "Sim" : "Não"),
  },
  {
    title: "Ações",
    dataIndex: "action",
    align: "center",
  },
];

export default columns;
