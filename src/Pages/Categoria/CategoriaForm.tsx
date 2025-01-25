import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
  Row,
  Col,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { CategoriaType } from "../../Types/CategoriaType";
import { useCategoria } from "../../contexts/CategoriaContext";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import IconPicker from "../../components/IconPicker/IconPicker";

const { Text } = Typography;

interface CategoriaFormProps {
  onClose: () => void;
  initialValues?: CategoriaType;
}

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  onClose,
  initialValues,
}) => {
  const [form] = Form.useForm<CategoriaType>();
  const { create, update } = useCategoria();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedIcon, setSelectedIcon] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSelectedColor(initialValues.cor); // Define a cor inicial, se houver
      setSelectedIcon(initialValues.icone); // Define o ícone inicial, se houver
    } else {
      form.resetFields();
      setSelectedColor(undefined);
      setSelectedIcon(undefined);
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (selectedColor) {
      form.setFields([
        {
          name: "cor",
          errors: [],
        },
      ]);
    }
  }, [selectedColor, form]);

  useEffect(() => {
    if (selectedIcon) {
      form.setFields([
        {
          name: "icone",
          errors: [],
        },
      ]);
    }
  }, [selectedIcon, form]);

  const onSubmit: FormProps<CategoriaType>["onFinish"] = async (values) => {
    let valid = true;

    try {
      await form.validateFields(["descricao", "idTipoReceitaDespesa"]);
    } catch (error) {
      valid = false;
    }

    if (!selectedColor) {
      form.setFields([
        {
          name: "cor",
          errors: ["Selecione uma cor!"],
        },
      ]);
      valid = false;
    }

    if (!selectedIcon) {
      form.setFields([
        {
          name: "icone",
          errors: ["Selecione um ícone!"],
        },
      ]);
      valid = false;
    }

    if (!valid) return;

    const success = initialValues
      ? await update({ ...values, cor: selectedColor, icone: selectedIcon })
      : await create({ ...values, cor: selectedColor, icone: selectedIcon });
    if (success) {
      form.resetFields();
      onClose();
    }
  };

  const handleLimpar = () => {
    form.resetFields();
    setSelectedColor(undefined);
    setSelectedIcon(undefined);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={{ ativo: true }}
      style={{
        width: "100%",
      }}
    >
      <Form.Item<CategoriaType> label="Descrição" name="descricao" rules={[{ required: true, message: "Digite a descrição!" }]} required={false}>
        <Input placeholder="Nome completo" />
      </Form.Item>

      <Form.Item<CategoriaType> label="Tipo" name="idTipoReceitaDespesa" rules={[{ required: true, message: "Selecione o tipo!" }]} required={false}>
        <Select placeholder="Selecione uma categoria">
          <Select.Option value={1}>Receita</Select.Option>
          <Select.Option value={2}>Despesa</Select.Option>
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item<CategoriaType> label="Cor da Categoria" name="cor">
            <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item<CategoriaType> label="Ícone da Categoria" name="icone">
            <IconPicker selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<CategoriaType> name="ativo" valuePropName="checked">
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
            <Tooltip title="Salvar categoria">
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

export default CategoriaForm;