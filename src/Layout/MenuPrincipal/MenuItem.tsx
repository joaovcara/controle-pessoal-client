import { DashboardOutlined, DollarOutlined, ShoppingOutlined, TagsOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export const menuItems: MenuItem[] = [
  /**
   * Menu do Dashboard
   */
  {
    key: "dashboard",
    label: "DashBoard",
    icon: <DashboardOutlined />
  },

  /**
   * Menu do Receita
   */
  {
    key: "receitas",
    label: "Receita",
    icon: <DollarOutlined />,
  },

  /**
   * Menu do Despesa
   */
  {
    key: "despesas",
    label: "Despesa",
    icon: <ShoppingOutlined />,
  },

  /**
 * Menu do Categorias
 */
  {
    key: "categorias",
    label: "Categorias",
    icon: <TagsOutlined />
  },

];
