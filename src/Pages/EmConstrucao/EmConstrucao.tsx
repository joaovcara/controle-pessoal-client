import React from "react";
import { Layout, Typography, Image } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

interface EmConstrucaoProps {
    title: string
}

const EmConstrucao: React.FC<EmConstrucaoProps> = ({
    title
}) => {
    return (
        <Content
            style={{
                margin: "16px",
                padding: 10,
                marginTop: 80,
                minHeight: 280,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                src="assets/img/em-construcao.png"
                alt="Em Construção"
                style={{ marginBottom: 20, maxWidth: 500 }}
                preview={false}
            />
            <Title level={2}>Página {title} em Construção</Title>
            <Text>Esta página ainda está em construção.</Text>
        </Content>
    );
};

export default EmConstrucao;