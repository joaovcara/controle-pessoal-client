import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Space, Tooltip, Typography } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { UsuarioType } from "../../Types/UsuarioType";
import { useUsuario } from "../../contexts/UsuarioContext";

const { Text } = Typography;

interface UsuarioFormProps {
  onClose: () => void;
  initialValues?: UsuarioType;
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({ onClose, initialValues }) => {
  const [form] = Form.useForm<UsuarioType>();
  const { create, update } = useUsuario();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onSubmit: FormProps<UsuarioType>["onFinish"] = async (values) => {
    const success = initialValues ? await update(values) : await create(values);
    if (success) {
      form.resetFields();
      onClose();
    }
  };

  const handleLimpar = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
      style={{
        width: "100%",
      }}
    >
      <Form.Item<UsuarioType> label="Nome" name="nome">
        <Input placeholder="Nome completo" />
      </Form.Item>

      <Form.Item<UsuarioType> label="Usuário" name="usuario">
        <Input placeholder="Nome de usuário" />
      </Form.Item>

      <Form.Item<UsuarioType> label="Email" name="email">
        <Input placeholder="Endereço de email" />
      </Form.Item>

      <Form.Item<UsuarioType> name="ativo" valuePropName="checked">
        <Checkbox>Ativo</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Form.Item name="id" style={{ margin: 0 }}>
            <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
              ID: {initialValues?.id}
            </Text>
          </Form.Item>
          <Space>
            <Tooltip title="Limpar campos">
              <Button icon={<ClearOutlined />} onClick={handleLimpar} />
            </Tooltip>
            <Tooltip title="Salvar usuário">
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Tooltip>
          </Space>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UsuarioForm;