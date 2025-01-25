import React, { useState } from "react";
import { Button, Form, Input, Typography, ConfigProvider } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useUsuario } from "../../contexts/UsuarioContext";
import { UsuarioType } from "../../Types/UsuarioType";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import ptBR from "antd/es/locale/pt_BR";

const { Text } = Typography;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { create } = useUsuario();
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const colorBase = "#621d7e";

  const handleSubmit = async (values: UsuarioType) => {
    await create(values);
    navigate("/login");
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
        title="Cadastro de Usuário"
        description="Preencha os campos abaixo para criar sua conta"
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
          <Form.Item<UsuarioType>
            name="nome"
            rules={[{ required: true, message: "Digite seu nome completo!" }]}
          >
            <Input
              size="large"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item<UsuarioType>
            name="usuario"
            rules={[{ required: true, message: "Digite o nome de usuário!" }]}
          >
            <Input
              size="large"
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item<UsuarioType>
            name="email"
            rules={[{ required: true, message: "Digite o endereço de email!" }]}
          >
            <Input
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="emailConfirm"
            rules={[{ 
              required: true, 
              message: "Digite o endereço de email!" },
              {
                validator: (_, value) => {
                  if (value != email) {
                    return Promise.reject(new Error("Os emails não conferem!"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Confirmação de email"
              value={emailConfirm}
              onChange={(e) => setEmailConfirm(e.target.value)}
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button size="large" type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </Form.Item>
          <Form.Item>
            <Text type="secondary">
              Já tem uma conta?{" "}
              <a onClick={() => navigate("/login")}>Fazer login</a>
            </Text>
          </Form.Item>
        </Form>
      </AuthLayout>
    </ConfigProvider>
  );
};

export default SignUp;