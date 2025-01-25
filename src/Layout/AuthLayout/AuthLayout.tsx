import React from "react";
import { Col, Row, Typography, Image, Space, theme } from "antd";

const { Title, Text } = Typography;

interface AuthLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, description, children }) => {
    const {
        token: { colorBgBase, colorTextBase },
    } = theme.useToken();

    return (
        <Row style={{ backgroundColor: colorBgBase, minHeight: "100vh" }}>
            <Col
                xs={0}
                sm={0}
                md={12}
                style={{
                    background: "linear-gradient(0deg, rgba(0,25,42,1) 0%, rgba(98,29,126,1) 100%)",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 50px",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Title style={{ textAlign: "center", color: "#FFF", marginTop: "8%" }} level={3}>
                        Chegou a hora de organizar suas <span style={{ fontWeight: "bold" }}>FINANÇAS!</span>
                    </Title>

                    <Image
                        preview={false}
                        width="65%"
                        height="auto"
                        src="assets/img/img-home.png"
                        style={{ maxWidth: "600px" }}
                    />

                    <Text style={{ color: "#FFF", textAlign: "center", marginBottom: 20 }}>
                        &copy; {new Date().getFullYear()} Controle Pessoal. Todos os direitos reservados.
                    </Text>
                </div>
            </Col>
            <Col
                xs={24}
                sm={24}
                md={12}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 20px",
                    height: "100vh",
                }}
            >
                <Space
                    direction="vertical"
                    style={{
                        width: "100%",
                        maxWidth: 400,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        <Image
                            preview={false}
                            style={{
                                maxWidth: "60%",
                                display: "block",
                                margin: "0 auto",
                            }}
                            src="assets/img/logo.png?v=2"
                        />
                        <Title style={{ color: colorTextBase, textAlign: "center" }} level={2}>
                            {title}
                        </Title>
                        <Text type="secondary" style={{ textAlign: "center" }}>
                            {description}
                        </Text>
                    </div>

                    {children}
                </Space>
            </Col>
        </Row>
    );
};

export default AuthLayout;