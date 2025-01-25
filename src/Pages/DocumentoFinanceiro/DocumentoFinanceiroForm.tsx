import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Space, Tooltip, DatePicker, Row, Col, Typography } from "antd";
import { CalendarOutlined, ClearOutlined } from "@ant-design/icons";
import { DocumentoFinanceiroType } from "../../Types/DocumentoFinanceiroType";
import { useDocumentoFinanceiro } from "../../contexts/DocumentoFinanceiroContext";
import { useCategoria } from "../../contexts/CategoriaContext";
import { NumericFormat } from "react-number-format";
import { CategoriaType } from "../../Types/CategoriaType";
import dayjs from "dayjs";

const { Text } = Typography;

interface DocumentoFinanceiroFormProps {
  onClose: () => void;
  initialValues?: DocumentoFinanceiroType;
}

const DocumentoFinanceiroForm: React.FC<DocumentoFinanceiroFormProps> = ({ onClose, initialValues }) => {
  const [form] = Form.useForm<DocumentoFinanceiroType>();
  const { create, update, tipoDocumento } = useDocumentoFinanceiro();
  const { getAllByTipoReceitaDespesa: getAllCategorias } = useCategoria();
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [dataCadastro, setDataCadastro] = useState<dayjs.Dayjs | undefined>(dayjs());
  const [dataVencimento, setDataVencimento] = useState<dayjs.Dayjs | undefined>(undefined);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await getAllCategorias(tipoDocumento ?? "");
      setCategorias(categorias);
    };

    fetchCategorias();
  }, [getAllCategorias, tipoDocumento]);

  useEffect(() => {
    if (initialValues) {
      const transformedValues = {
        ...initialValues,
        dataDocumento: initialValues.dataDocumento
          ? dayjs(initialValues.dataDocumento, "DD/MM/YYYY")
          : undefined,
        dataVencimento: initialValues.dataVencimento
          ? dayjs(initialValues.dataVencimento, "DD/MM/YYYY")
          : undefined,
        dataPagamento: initialValues.dataPagamento
          ? dayjs(initialValues.dataPagamento, "DD/MM/YYYY")
          : undefined,
        valor: initialValues.valor.toFixed(2).replace('.', ',') // Formata o valor inicial
      };
      form.setFieldsValue(transformedValues as never); // Use `as any` para contornar a verificação de tipos.
      setDataCadastro(transformedValues.dataDocumento);
      setDataVencimento(transformedValues.dataVencimento);
    } else {
      form.resetFields(); // Reseta os campos do formulário se não houver valores iniciais
    }
  }, [initialValues, form]);

  const onSubmit: FormProps<DocumentoFinanceiroType>["onFinish"] = async (values) => {
    const processedValues = {
      ...values,
      valor: parseFloat(values.valor.toString().replace(/\./g, "").replace(",", ".")),
    };

    const success = initialValues
      ? await update(processedValues)
      : await create(processedValues);

    if (success) {
      form.resetFields();
      onClose();
    }
  };

  const handleLimpar = () => {
    form.resetFields();
  };

  const handleDataCadastroChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setDataCadastro(date);
    }
  };

  const handleDataVencimentoChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setDataVencimento(date);
    }
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
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item<DocumentoFinanceiroType> label="Data" name="dataDocumento">
            <DatePicker
              style={{ width: "100%" }}
              format={"DD/MM/YYYY"}
              placeholder="Selecione a data "
              value={dataCadastro}
              inputReadOnly={true}
              allowClear={false}
              onChange={handleDataCadastroChange}
              suffixIcon={<CalendarOutlined style={{ color: "#621d7e" }}/>}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item<DocumentoFinanceiroType> label="Documento" name="numeroDocumento">
            <Input placeholder="Número do Documento" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<DocumentoFinanceiroType> label="Descrição" name="descricao">
        <Input placeholder="Descrição" />
      </Form.Item>

      <Form.Item<DocumentoFinanceiroType> label="Categoria" name="idCategoria">
        <Select placeholder="Selecione uma categoria">
          {categorias.map((categoria) => (
            <Select.Option key={categoria.id} value={categoria.id}>
              {categoria.descricao}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item<DocumentoFinanceiroType> label="Vencimento" name="dataVencimento">
            <DatePicker
              style={{ width: "100%" }}
              format={"DD/MM/YYYY"}
              placeholder="Selecione a data "
              value={dataVencimento}
              inputReadOnly={true}
              allowClear={false}
              onChange={handleDataVencimentoChange}
              suffixIcon={<CalendarOutlined style={{ color: "#621d7e" }}/>}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item<DocumentoFinanceiroType> label="Valor" name="valor">
            <NumericFormat
              customInput={Input}
              thousandSeparator="."
              decimalSeparator=","
              fixedDecimalScale={true}
              decimalScale={2}
              allowNegative={false}
              inputMode="decimal"
              placeholder="R$ 0,00"
            />
          </Form.Item>
        </Col>
      </Row>

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
            <Tooltip title="Salvar despesa">
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

export default DocumentoFinanceiroForm;