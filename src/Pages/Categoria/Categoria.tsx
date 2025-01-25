import Pagina from "../../Layout/Pagina/Pagina";
import { TagsOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { CategoriaType } from "../../Types/CategoriaType";
import { useLoading } from "../../contexts/PaginaContext";
import columns from "./CategoriaData";
import TableActions from "../../components/Table/TableActions";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import { useCategoria } from "../../contexts/CategoriaContext";
import CategoriaForm from "./CategoriaForm";
import { handleDownloadCSV } from "../../utils/ExportToCsv";

export default function Categoria() {
  const { getAll, delete: deleteCategoria } = useCategoria();
  const { setLoading } = useLoading();
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<CategoriaType | undefined>(undefined);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState<CategoriaType | undefined>(undefined);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    const categorias = await getAll();
    const formattedCategorias = categorias.map((categoria: CategoriaType) => ({
      key: categoria.id,
      id: categoria.id,
      descricao: categoria.descricao,
      idTipoReceitaDespesa: categoria.idTipoReceitaDespesa,
      ativo: categoria.ativo,
      cor: categoria.cor,
      icone: categoria.icone,
    }));
    setCategorias(formattedCategorias);
    setLoading(false);
  }, [getAll, setLoading]);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategoria(undefined);
    fetchCategorias();
  };

  const handleEdit = (categoria: CategoriaType) => {
    setEditingCategoria(categoria);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCategoria(id);
    fetchCategorias();
  };

  const handleConfirmDelete = (categoria: CategoriaType) => {
    setCategoriaToDelete(categoria);
    setIsModalConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setCategoriaToDelete(undefined);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmDeleteModal = async () => {
    if (categoriaToDelete) {
      await handleDelete(categoriaToDelete.id!);
      setIsModalConfirmOpen(false);
    }
  };

  const handleDownload = () => {
    handleDownloadCSV(categorias, columns, "Categorias");
  };

  return (
    <>
      <Pagina<CategoriaType>
        pageTitle="Categorias"
        pageIcon={<TagsOutlined />}
        dataSource={categorias}
        columns={columns.map((col) => {
          if ('dataIndex' in col && col.dataIndex === "action") {
            return {
              ...col,
              render: (_, record) => (
                <TableActions
                  onEdit={() => handleEdit(record)}
                  onDelete={() => handleConfirmDelete(record)}
                  onPrint={() => alert(`Imprimir dados da Categoria ${record.id}`)}
                  actions={["edit", "delete"]}
                />
              ),
            };
          }
          return col;
        })}
        tituloAcaoIncluir="Cadastro de Categoria"
        formulario={<CategoriaForm onClose={handleModalClose} initialValues={editingCategoria} />}
        isModalOpen={isModalOpen}
        setIsModalOpen={(open) => {
          if (!open) {
            setEditingCategoria(undefined);
          }
          setIsModalOpen(open);
        }}
        modalWidth="30%"
        onDownload={handleDownload}
      />
      <ModalConfirm
        title="Deletar Categoria"
        visible={isModalConfirmOpen}
        onConfirm={handleConfirmDeleteModal}
        onCancel={handleCancelDelete}
        text={"Deseja realmente deletar esta Categoria " + (categoriaToDelete?.descricao ?? "") + "?"} 
      />
    </>
  );
}