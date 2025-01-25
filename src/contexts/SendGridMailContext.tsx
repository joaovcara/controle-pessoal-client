import { createContext, useContext, ReactNode } from "react";
import { sendEmail } from "../services/SendGridMailService";
import { useNavigate } from "react-router";
import { notification } from "antd";

interface SendGridMailContextProps {
    send: (email: string) => Promise<void>;
}

const SendGridMailContext = createContext<SendGridMailContextProps | undefined>(undefined);

export const SendGridMailProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    // Função de enviar email
    const send = async (email: string) => {
        try {
            await sendEmail(email);
            notification.success({
                message: "Sucesso",
                description: "Email enviado com sucesso",
            });
            navigate("/login");
        } catch (error) {
            console.error("Erro ao enviar email:", error);
            notification.error({
                message: "Erro",
                description: "Erro ao enviar email!",
            });
        }
    };

    return (
        <SendGridMailContext.Provider value={{ send }}>
            {children}
        </SendGridMailContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSendGridMail = () => {
    const context = useContext(SendGridMailContext);
    if (!context) {
        throw new Error("useSendGridMail deve ser usado dentro de um SendGridMailProvider");
    }
    return context;
};
