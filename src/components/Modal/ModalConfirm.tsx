import React from "react";
import { Modal, Button } from "antd";

interface ModalConfirmProps {
    title: string;
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    text: string;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
    title,
    visible,
    onConfirm,
    onCancel,
    text,
}) => {
    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancelar
                </Button>,
                <Button key="confirm" type="primary" onClick={onConfirm}>
                    Confirmar
                </Button>,
            ]}
        >
            <p>{text}</p>
        </Modal>
    );
};

export default ModalConfirm;