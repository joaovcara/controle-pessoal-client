import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { theme } from "antd";
import { Icons } from "./Icons";

interface IconPickerProps {
  selectedIcon?: string;
  onSelectIcon: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onSelectIcon }) => {
  const [iconDropdownVisible, setIconDropdownVisible] = useState(false);
  const { token } = theme.useToken();

  const handleIconSelect = (icon: string) => {
    onSelectIcon(icon);
    setIconDropdownVisible(false);
  };

  const iconGrid = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 40px)", // 5 colunas por linha
        gap: "10px",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombras leves
        backgroundColor: token.colorBgBase, // Cor de fundo do dropdown seguindo o tema
      }}
    >
      {Object.keys(Icons).map((key) => (
        <div
          key={key}
          onClick={() => handleIconSelect(key)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "24px", // Aumenta o tamanho do ícone
          }}
        >
          {Icons[key]}
        </div>
      ))}
    </div>
  );

  return (
    <Space align="center" style={{ display: "flex", gap: "15px" }}>
      {/* Ícone Selecionado */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#d9d9d9",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          color: "#202020",
          fontSize: "1.3em",
        }}
      >
        {Icons[selectedIcon ?? ""]}
      </div>

      {/* Botão Selecionar Ícone */}
      <Dropdown
        overlay={iconGrid}
        trigger={["click"]}
        visible={iconDropdownVisible}
        onVisibleChange={(visible) => setIconDropdownVisible(visible)}
        overlayStyle={{ padding: 0 }}
      >
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          style={{
            width: "40px",
            height: "40px",
          }}
        />
      </Dropdown>
    </Space>
  );
};

export default IconPicker;