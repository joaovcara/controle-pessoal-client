import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Space, Tooltip, DatePicker, Typography } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { DocumentoFinanceiroType } from "../../Types/DocumentoFinanceiroType";
import { useDocumentoFinanceiro } from "../../contexts/DocumentoFinanceiroContext";
import { useCategoria } from "../../contexts/CategoriaContext";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { CategoriaType } from "../../Types/CategoriaType";
import { useMediaQuery } from "react-responsive";

const { Text } = Typography;

interface DocumentoFinanceiroFormProps {
  onClose: () => void;
  initialValues?: DocumentoFinanceiroType;
}

const DocumentoFinanceiroForm: React.FC<DocumentoFinanceiroFormProps> = ({ onClose, initialValues }) => {
  const [form] = Form.useForm<DocumentoFinanceiroType>();
  const { pagamento, tipoDocumento } = useDocumentoFinanceiro();
  const { getAllByTipoReceitaDespesa: getAllCategorias } = useCategoria();
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

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
        dataPagamento: initialValues.dataPagamento
          ? moment(initialValues.dataPagamento, "DD/MM/YYYY")
          : undefined,
        valor: initialValues.valor.toFixed(2).replace('.', ',') // Formata o valor inicial
      };
      form.setFieldsValue(transformedValues as never); // Use `as any` para contornar a verificação de tipos.
    } else {
      form.resetFields(); // Reseta os campos do formulário se não houver valores iniciais
    }
  }, [initialValues, form]);

  const onSubmit: FormProps<DocumentoFinanceiroType>["onFinish"] = async (values) => {
    const processedValues = {
      ...values,
      valor: parseFloat(values.valor.toString().replace(/\./g, "").replace(",", ".")),
    };

    const success = await pagamento(processedValues);

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
      <Form.Item<DocumentoFinanceiroType>
        label="Data de Pagamento"
        name="dataPagamento"
        rules={[
          {
            validator: (_, value) => {
              if (value && initialValues?.dataDocumento && value.isBefore(moment(initialValues.dataDocumento, "DD/MM/YYYY"))) {
                return Promise.reject(new Error(`A data de pagamento não pode ser inferior à data de cadastro ${initialValues.dataDocumento}.`));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <DatePicker 
          style={{ width: "100%" }} 
          format={"DD/MM/YYYY"}
          inputReadOnly={isMobile}
        />
      </Form.Item>

      <Form.Item<DocumentoFinanceiroType> label="Valor Pago" name="valor">
        <NumericFormat
          customInput={Input}
          thousandSeparator="."
          decimalSeparator=","
          fixedDecimalScale={true}
          decimalScale={2}
          allowNegative={false}
          inputMode="numeric"
          placeholder="R$ 0,00"
        />
      </Form.Item>

      <Form.Item<DocumentoFinanceiroType> label="Categoria" name="idCategoria">
        <Select placeholder="Selecione uma categoria" disabled>
          {categorias.map((categoria) => (
            <Select.Option key={categoria.id} value={categoria.id}>
              {categoria.descricao}
            </Select.Option>
          ))}
        </Select>
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