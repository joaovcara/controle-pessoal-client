import React from "react";
import { Button, Form, Input, ConfigProvider, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import ptBR from "antd/es/locale/pt_BR";
import { ResetPassword } from "../../services/UsuarioService";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const colorBase = "#621d7e";

  const handleSubmit = async (values: { email: string; newPassword: string; confirmPassword: string }) => {
    // Recupera o token e o email da URL
    let token = new URLSearchParams(location.search).get("token") || "";
    const email = new URLSearchParams(location.search).get("email") || "";

    // Substitui os espaços por '+' para garantir que o token seja consistente
    // No seu caso, isso ajuda a garantir que o '+' no token seja interpretado corretamente
    token = token.replace(/ /g, '+'); // Substitui espaços por '+', caso existam, no token.

    try {
      await ResetPassword({ ...values, token, email });
      notification.success({
        message: "Sucesso",
        description: "Senha redefinida com sucesso.",
      });
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Erro ao redefinir senha.",
      });
    }
  };

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: colorBase,
          colorInfo: colorBase,
        },
        components: {
          Input: {
            colorBorder: colorBase,
          },
          Button: {
            colorBorder: colorBase,
          },
        },
      }}
    >
      <AuthLayout
        title="Redefinir Senha"
        description="Preencha os campos abaixo para redefinir sua senha"
      >
        <Form
          onFinish={handleSubmit}
          autoComplete="off"
          style={{
            maxWidth: 500,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: "Digite a nova senha!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Nova Senha"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Confirme a nova senha!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Confirme a Nova Senha"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="large" type="primary" htmlType="submit">
              Redefinir Senha
            </Button>
          </Form.Item>
        </Form>
      </AuthLayout>
    </ConfigProvider>
  );
};

export default ResetPasswordPage;