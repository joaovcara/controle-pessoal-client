import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown, Switch, Space } from "antd";
import {
  PoweroffOutlined,
  SettingOutlined,
  // TeamOutlined,
  UserOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useLogin } from "../../contexts/LoginContext";

interface MenuUsuarioProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MenuUsuario: React.FC<MenuUsuarioProps> = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const { logout } = useLogin();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Perfil",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/perfil");
      }
    },
    // {
    //   key: "2",
    //   label: "Usuários",
    //   icon: <TeamOutlined />,
    //   onClick: () => {
    //     navigate("/usuarios");
    //   }
    // },
    {
      key: "3",
      label: "Configurações",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/configuracoes")
      }
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Sair",
      icon: <PoweroffOutlined />,
      onClick: () => {
        logout();
      }
    },
    {
      type: "divider",
    },
    {
      key: "5",
      label: (
        <Space>
          <BulbOutlined />
          Tema Escuro
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </Space>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Button shape="circle" type="primary">
          <UserOutlined />
        </Button>
      </a>
    </Dropdown>
  );
};

export default MenuUsuario;