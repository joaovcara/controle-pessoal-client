import { TableColumnsType } from "antd";
import { CategoriaType } from "../../Types/CategoriaType";
import { Icons } from "../../components/IconPicker/Icons";

const columns: TableColumnsType<CategoriaType> = [
  {
    title: "Id",
    dataIndex: "id",
    width: "auto",
    hidden: true,
    sorter: (a, b) => (a.id ?? 0) - (b.id ?? 0),
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    width: "auto",
    sorter: (a, b) => a.descricao.localeCompare(b.descricao),
  },
  {
    title: "Cor",
    dataIndex: "cor",
    width: "auto",
    sorter: (a, b) => (a.cor ?? "").localeCompare(b.cor ?? ""),
    render: (value) => (
      <div
        style={{
          backgroundColor: value,
          width: "20px",
          height: "20px",
          borderRadius: "50%",
        }}
      ></div>
    ),
  },
  {
    title: "Ícone",
    dataIndex: "icone",
    width: "auto",
    sorter: (a, b) => (a.icone ?? "").localeCompare(b.icone ?? ""),
    render: (value) => Icons[value] || value,
  },
  {
    title: "Tipo",
    dataIndex: "idTipoReceitaDespesa",
    width: "auto",
    sorter: (a, b) => a.idTipoReceitaDespesa - b.idTipoReceitaDespesa,
    render: (value) => (value == 1 ? "Receita" : "Despesa"),
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