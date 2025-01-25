import React, { useState } from "react";
import { Button, Form, Input, Row, Col, Typography, ConfigProvider } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useLogin } from "../../contexts/LoginContext";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import ptBR from "antd/es/locale/pt_BR";

const { Text } = Typography;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorBase = "#621d7e";

  const handleSubmit = async (values: { username: string; password: string }) => {
    const { username, password } = values;
    await login(username, password);
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
        title="Bem-vindo de volta!"
        description="Faça login para continuar"
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ padding: 20 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Digite seu usuário!" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Usuário"
              autoComplete="current-username"
              autoCapitalize="none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            style={{ margin: 0 }}
            name="password"
            rules={[{ required: true, message: "Digite sua senha!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Row justify="end">
              <Col>
                <a onClick={() => navigate("/forgot")}>Esqueci minha senha</a>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
          <Form.Item>
            <Text type="secondary">
              Ainda não possui conta?{" "}
              <a onClick={() => navigate("/registro")}>Registre-se</a>
            </Text>
          </Form.Item>
        </Form>
      </AuthLayout>
    </ConfigProvider>
  );
};

export default SignIn;