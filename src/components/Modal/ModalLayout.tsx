import React from "react";
import { Modal } from "antd";

interface ModalLayoutProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
  formulario: React.ReactNode;
  width?: string | number;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  open,
  onClose,
  titulo,
  formulario,
  width = "50%",
}) => {
  return (
    <Modal
      title={titulo}
      centered
      footer={null}
      open={open}
      onCancel={() => onClose()}
      width={width}
      style={{
        top: 0,
        transform: 'translateY(0)',
        margin: 0,
        paddingTop: '10px',
        paddingBottom: '10px',
        overflow: 'auto',
        maxHeight: '100vh',
      }}
    >
      {formulario}
    </Modal>
  );
};

export default ModalLayout;