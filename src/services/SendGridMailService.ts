import api from "./Api";

// Função envio de email
export const sendEmail = async (email: string) => {
  try {
    const response = await api.post("/SendGrid/send", {
      toEmail: email,
      subject: "Recuperação de Senha",
      plainTextContent: `Clique no link para redefinir sua senha: ${window.location.origin}#/reset-password`,
      htmlContent: `<p>Clique no link para redefinir sua senha: <a href="${window.location.origin}#/reset-password">Redefinir Senha</a></p>`
    });
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao enviar email: " + error);
  }
};