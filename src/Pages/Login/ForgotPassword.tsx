import React from "react";
import { Button, Form, Input, Typography, ConfigProvider, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import ptBR from "antd/es/locale/pt_BR";
import { RequestPasswordReset } from "../../services/UsuarioService";

const { Text } = Typography;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const colorBase = "#621d7e";

  const handleSubmit = async (values: { email: string }) => {
    const { email } = values;
    const frontendDomain = window.location.href.split('#')[0];

    // Modelo de e-mail HTML
    const htmlContent = `
      <div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; color: #666;'>
        <div style='background-color: ${colorBase}; color: #fff; padding: 10px; border-radius: 5px 5px 0 0; text-align: center;'>
          <h1 style='font-size: 18px; margin: 0;'>Redefinição de sua senha de acesso</h1>
        </div>
        <div style='padding: 20px;'>
          <p style='color: #666;'>Prezado(a),</p>
          <p style='color: #666;'>Você solicitou um link para redefinição de sua senha de acesso. Para redefinir sua senha, clique no botão abaixo:</p>
          <div style='text-align: center; margin: 20px 0;'>
            <a href='{resetPasswordUrl}' style='background-color: ${colorBase}; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;'>REDEFINIR SENHA</a>
          </div>
          <p style='color: #666;'>Se você não solicitou esta redefinição, pode ignorar este e-mail.</p>
        </div>
        <div style='font-size: 12px; color: #666; text-align: center; margin-top: 20px;'>
          <p>Este e-mail foi enviado automaticamente, por favor não responda.</p>
          <p>Em caso de dúvidas, entre em contato com nosso suporte.</p>
        </div>
      </div>
    `;

    // Modelo de e-mail em texto simples
    const plainTextContent = `
      Prezado(a), você solicitou um link para redefinição de sua senha de acesso.
      Para redefinir sua senha, acesse o seguinte link: {resetPasswordUrl}.
      Se você não solicitou esta redefinição, pode ignorar este e-mail.
    `;

    try {
      await RequestPasswordReset(email, frontendDomain, htmlContent, plainTextContent);
      notification.success({
        message: "Sucesso",
        description: "Email de recuperação de senha enviado com sucesso.",
      });
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Erro",
        description: "Erro ao enviar email de recuperação de senha.",
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
            colorBorder: colorBase
          },
          Button: {
            colorBorder: colorBase
          },
        },
      }}
    >
      <AuthLayout
        title="Recuperação de Senha"
        description="Qual o email da conta que você esqueceu a senha?"
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
          style={{
            maxWidth: 500,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Digite seu email!" }]}
          >
            <Input
              size="large"
              placeholder="Email"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button size="large" type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>

          <Form.Item>
            <Text type="secondary">
              Voltar para tela de <a onClick={() => navigate("/login")}>Login</a>
            </Text>
          </Form.Item>
        </Form>
      </AuthLayout>
    </ConfigProvider>
  );
};

export default ForgotPassword;