import Pagina from "../../Layout/Pagina/Pagina";
import { TeamOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { formatDate } from "../../utils/FormatDate";
import { UsuarioType } from "../../Types/UsuarioType";
import { useUsuario } from "../../contexts/UsuarioContext";
import UsuarioForm from "./UsuarioForm";
import { useLoading } from "../../contexts/PaginaContext";
import columns from "./UsuarioData";
import TableActions from "../../components/Table/TableActions";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import { handleDownloadCSV } from "../../utils/ExportToCsv";

export default function Usuario() {
  const { getAll, delete: deleteUser } = useUsuario();
  const { setLoading } = useLoading();
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UsuarioType | undefined>(undefined);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UsuarioType | undefined>(undefined);

  const fetchUsuarios = useCallback(async () => {
    setLoading(true);
    const users = await getAll();
    const formattedUsers = users.map((user: UsuarioType) => ({
      key: user.id,
      id: user.id,
      nome: user.nome,
      usuario: user.usuario,
      email: user.email,
      dataCadastro: formatDate(user.dataCadastro ?? ""),
      ativo: user.ativo,
    }));
    setUsuarios(formattedUsers);
    setLoading(false);
  }, [getAll, setLoading]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(undefined);
    fetchUsuarios();
  };

  const handleEdit = (user: UsuarioType) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsuarios();
  };

  const handleConfirmDelete = (user: UsuarioType) => {
    setUserToDelete(user);
    setIsModalConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setUserToDelete(undefined);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmDeleteModal = async () => {
    if (userToDelete) {
      await handleDelete(userToDelete.id!);
      setIsModalConfirmOpen(false);
    }
  };

  const handleDownload = () => {
    handleDownloadCSV(usuarios, columns, "Usuários");
  };

  return (
    <>
      <Pagina<UsuarioType>
        pageTitle="Usuários"
        pageIcon={<TeamOutlined />}
        dataSource={usuarios}
        columns={columns.map((col) => {
          if ('dataIndex' in col && col.dataIndex === "action") {
            return {
              ...col,
              render: (_, record) => (
                <TableActions
                  onEdit={() => handleEdit(record)}
                  onDelete={() => handleConfirmDelete(record)}
                  onPrint={() => alert(`Imprimir dados do usuário ${record.id}`)}
                  actions={["edit", "delete"]}
                />
              ),
            };
          }
          return col;
        })}
        tituloAcaoIncluir="Cadastro de Usuário"
        formulario={<UsuarioForm onClose={handleModalClose} initialValues={editingUser} />}
        isModalOpen={isModalOpen}
        setIsModalOpen={(open) => {
          if (!open) {
            setEditingUser(undefined);
          }
          setIsModalOpen(open);
        }}
        modalWidth="40%"
        onDownload={handleDownload}
      />
      <ModalConfirm
        title="Deletar Usuário"
        visible={isModalConfirmOpen}
        onConfirm={handleConfirmDeleteModal}
        onCancel={handleCancelDelete}
        text={"Deseja realmente deletar este usuário " + (userToDelete?.nome ?? "") + "?"} 
      />
    </>
  );
}