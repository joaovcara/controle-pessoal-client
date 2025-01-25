import { Image } from "antd";
import MenuPrincipal from "../MenuPrincipal/MenuPrincipal";

interface SideMenuProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SideMenuProps> = ({ collapsed, setCollapsed, darkMode }) => {
  return (
    <>
      <div
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          backgroundColor: "transparent",
        }}
      >
        {collapsed ? (
          <Image
            preview={false}
            width="50%"
            height="auto"
            src={darkMode ? "assets/img/logo-icon-branco.png" : "assets/img/logo-icon.png"}
          />
        ) : (
          <Image
            preview={false}
            width="50%"
            height="auto"
            src={darkMode ? "assets/img/logo-branco.png" : "assets/img/logo.png"}
          />
        )}
      </div>
      <MenuPrincipal 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />
    </>
  );
};

export default Sidebar;