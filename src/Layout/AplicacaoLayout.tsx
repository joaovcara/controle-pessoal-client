import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Typography, ConfigProvider } from "antd";
import MenuUsuario from "./MenuUsuario/MenuUsuario";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router";
import { useLogin } from "../contexts/LoginContext";
import { useMediaQuery } from 'react-responsive';
import ptBR from "antd/es/locale/pt_BR";

const { Text } = Typography;
const { Header, Content } = Layout;

export default function AplicacaoLayout() {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useLogin();
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const siderWidth = 250;
  const colorBase = "#621d7e";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const handleSetDarkMode = (mode: boolean) => {
    setDarkMode(mode);
    localStorage.setItem("theme", mode ? "dark" : "light");
  };

  const toggleDarkMode = () => {
    handleSetDarkMode(!darkMode);
  };

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: colorBase,
          colorInfo: colorBase,
          colorBgBase: darkMode ? "#1f1f1f" : "#ffffff",
          colorTextBase: darkMode ? "#ffffff" : "#1F1F1F",
        },
        components: {
          Tooltip: {
            colorBgSpotlight: colorBase
          },
          DatePicker: {
            colorBorder: colorBase
          },
          Input: {
            colorBorder: colorBase
          },
          Button: {
            colorBorder: colorBase
          },
          Select: {
            colorBorder: colorBase
          },
          Checkbox: {
            colorBorder: colorBase
          }
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Layout.Sider
          width={siderWidth}
          style={{
            transition: "transform 0.3s ease",
            overflow: "hidden",
            position: isMobile ? "fixed" : "relative",
            zIndex: 2,
            transform: isMobile && collapsed ? "translateX(-100%)" : "translateX(0)",
          }}
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} darkMode={darkMode} />
        </Layout.Sider>
        <Layout
          style={{
            transition: "margin-left 0.3s ease",
          }}
        >
          <Header
            style={{
              width: "100%",
              background: "transparent",
              paddingLeft: 0,
              paddingRight: 30,
              paddingTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Alinha os itens aos extremos
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: isMobile && !collapsed ? siderWidth : 0,
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Space size="middle" style={{ lineHeight: 0 }}>
              <Text>{isMobile && !collapsed ? "" : user ?? "Usuário"}</Text>
              <MenuUsuario darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Space>
          </Header>
          <Content
            style={{
              transition: "margin-left 0.3s ease",
              width: "100%",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}