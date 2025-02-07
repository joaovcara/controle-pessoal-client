import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { ConfigProvider, notification } from "antd";
import ptBR from "antd/es/locale/pt_BR";
import daysjs from "dayjs";
import "dayjs/locale/pt-br";

daysjs.locale("pt-br");

// Configura a posição das notificações
notification.config({
  placement: "bottomRight",
});

const App = () => {
  return (
    <ConfigProvider locale={ptBR}>
      <BrowserRouter basename="/controlepessoal">
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);