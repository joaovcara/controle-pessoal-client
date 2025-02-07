import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router";
import { menuItems } from "./MenuItem";
import { useMediaQuery } from 'react-responsive';

interface MenuPrincipalProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const MenuPrincipal: React.FC<MenuPrincipalProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
    if (isMobile) {
      setCollapsed(true); 
    }
  };

  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}
      items={menuItems}
      onClick={handleMenuClick}
      style={{ 
        height: isMobile ? '100vh' : "100%",
        paddingTop: 100,
      }}
    />
  );
};

export default MenuPrincipal;