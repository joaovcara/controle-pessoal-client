import { Routes, Route, Navigate } from "react-router";
import AplicacaoLayout from "../Layout/AplicacaoLayout";

import { LoginProvider } from "../contexts/LoginContext";
import { LoadingProvider } from "../contexts/PaginaContext";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "../Pages/Login/SignIn";

import { UsuarioProvider } from "../contexts/UsuarioContext";
import SignUp from "../Pages/Login/SignUp";
import Usuario from "../Pages/Usuario/Usuario";

import { SendGridMailProvider } from "../contexts/SendGridMailContext";
import ForgotPassword from "../Pages/Login/ForgotPassword";

import { CategoriaProvider } from "../contexts/CategoriaContext";
import Categoria from "../Pages/Categoria/Categoria";

import { DocumentoFinanceiroProvider } from "../contexts/DocumentoFinanceiroContext";
import DocumentoFinanceiro from "../Pages/DocumentoFinanceiro/DocumentoFinanceiro";

import Perfil from "../Pages/Perfil/Perfil";
import Configuracoes from "../Pages/Configuracoes/Configuracoes";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ResetPasswordPage from "../Pages/Login/ResetPassword";

const AppRoutes: React.FC = () => {
  return (
    <LoginProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="login" element={<SignIn />} />
        <Route
          path="registro"
          element={
            <UsuarioProvider>
              <SignUp />
            </UsuarioProvider>
          }
        />
        <Route
          path="forgot"
          element={
            <SendGridMailProvider>
              <ForgotPassword />
            </SendGridMailProvider>
          }
        />
        <Route
          path="reset-senha"
          element={<ResetPasswordPage />}
        />

        {/* Rotas protegidas */}
        <Route path="/" element={<ProtectedRoute />}>
          {/* Define o layout da aplicação (tela inicial e sua estrutura) */}
          <Route
            path="/"
            element={
              <LoadingProvider>
                <AplicacaoLayout />
              </LoadingProvider>
            }
          >
            {/* Redireciona a rota raiz para o Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* Rotas do Menu do Usuário */}
            {/* Perfil */}
            <Route path="perfil" element={<Perfil />} />

            {/* Usuários */}
            <Route
              path="usuarios"
              element={
                <UsuarioProvider>
                  <Usuario />
                </UsuarioProvider>
              }
            />

            {/* Configurações */}
            <Route path="configuracoes" element={<Configuracoes />} />

            {/* Rotas do Menu Principal */}

            {/* Rotas de Dashboard */}
            <Route
              path="dashboard"
              element={
                <DocumentoFinanceiroProvider tipoDocumento="Receita">
                  <Dashboard />
                </DocumentoFinanceiroProvider>
              }
            />

            {/* Rotas de Receita */}
            <Route
              path="receitas"
              element={
                <DocumentoFinanceiroProvider tipoDocumento="Receita">
                  <CategoriaProvider>
                    <DocumentoFinanceiro />
                  </CategoriaProvider>
                </DocumentoFinanceiroProvider>
              }
            />

            {/* Rotas de DocumentoFinanceiro */}
            <Route
              path="despesas"
              element={
                <DocumentoFinanceiroProvider tipoDocumento="Despesa">
                  <CategoriaProvider>
                    <DocumentoFinanceiro />
                  </CategoriaProvider>
                </DocumentoFinanceiroProvider>
              }
            />

            {/* Rotas de Categoria */}
            <Route
              path="categorias"
              element={
                <CategoriaProvider>
                  <Categoria />
                </CategoriaProvider>
              }
            />

          </Route>
        </Route>
      </Routes>
    </LoginProvider>
  );
};

export default AppRoutes;