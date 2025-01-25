import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { theme } from "antd";

interface ColorPickerProps {
  selectedColor?: string;
  onSelectColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onSelectColor }) => {
  const [colorDropdownVisible, setColorDropdownVisible] = useState(false);
  const { token } = theme.useToken();

  const colors = [
    "#007BFF", "#6F42C1", "#28A745", "#FFC107", "#FF5733", "#FF6347", "#FFD700",
    "#40E0D0", "#8A2BE2", "#FF69B4", "#A52A2A", "#5F9EA0", "#D2691E", "#556B2F",
    "#FF4500", "#2E8B57", "#4682B4", "#DA70D6", "#C71585", "#6A5ACD", "#808000",
    "#FF8C00", "#B22222", "#4169E1", "#9ACD32",
  ];

  const handleColorSelect = (color: string) => {
    onSelectColor(color);
    setColorDropdownVisible(false);
  };

  const colorGrid = (
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
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleColorSelect(color)}
          style={{
            backgroundColor: color,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <Space align="center" style={{ display: "flex", gap: "15px" }}>
      {/* Cor Selecionada */}
      <div
        style={{
          backgroundColor: selectedColor || "#d9d9d9",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      ></div>

      {/* Botão Selecionar Cor */}
      <Dropdown
        overlay={colorGrid}
        trigger={["click"]}
        visible={colorDropdownVisible}
        onVisibleChange={(visible) => setColorDropdownVisible(visible)}
        overlayStyle={{ padding: 0 }} // Cor de fundo do dropdown
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

export default ColorPicker;