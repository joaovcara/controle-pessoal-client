import React, { useEffect, useState } from "react";
import { Card, Col, DatePicker, Row, Typography, Layout, List, Tooltip } from "antd";
import { useDocumentoFinanceiro } from "../../contexts/DocumentoFinanceiroContext";
import { DocumentoFinanceiroType } from "../../Types/DocumentoFinanceiroType";
import { DollarCircleFilled, ShoppingFilled, AreaChartOutlined, DashboardOutlined, CalendarOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';
import dayjs from "dayjs";
import { Link } from "react-router";
import { formatDate } from "../../utils/FormatDate";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const { Title, Text } = Typography;
const { Content } = Layout;
const colorBase = "#621d7e";

const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [despesas, setDespesas] = useState<DocumentoFinanceiroType[]>([]);
  const [receitas, setReceitas] = useState<DocumentoFinanceiroType[]>([]);
  const { getAll } = useDocumentoFinanceiro();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchData = async () => {
      const allReceitas = await getAll("Receita");
      const allDespesas = await getAll("Despesa");

      const filteredDespesas = allDespesas.filter((despesa) => {
        const date = new Date(despesa.dataVencimento);
        const selectedMonthYear = `${selectedMonth.month() + 1}-${selectedMonth.year()}`;
        const documentMonthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        return documentMonthYear === selectedMonthYear;
      });

      const filteredReceitas = allReceitas.filter((receita) => {
        const date = new Date(receita.dataVencimento);
        const selectedMonthYear = `${selectedMonth.month() + 1}-${selectedMonth.year()}`;
        const documentMonthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        return documentMonthYear === selectedMonthYear;
      });

      setReceitas(filteredReceitas);
      setDespesas(filteredDespesas);
    };

    fetchData();
  }, [selectedMonth, getAll]);

  // Filtra receitas e despesas pagas
  const receitasPagas = receitas.filter(receita => receita.dataPagamento);
  const despesasPagas = despesas.filter(despesa => despesa.dataPagamento);

  // Calcula o total de receitas e despesas pagas
  const totalDespesasPagas = despesasPagas.reduce((acc, despesa) => acc + despesa.valor, 0);
  const totalReceitasPagas = receitasPagas.reduce((acc, receita) => acc + receita.valor, 0);

  // Calcula a diferença entre receitas e despesas pagas
  const diferencaReceitasDespesas = totalReceitasPagas - totalDespesasPagas;

  // Filtra receitas e despesas em aberto
  const despesasEmAberto = despesas.filter(despesa => !despesa.dataPagamento).sort((a, b) => new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime());
  const receitasEmAberto = receitas.filter(receita => !receita.dataPagamento).sort((a, b) => new Date(b.dataVencimento).getTime() - new Date(a.dataVencimento).getTime());

  // Calcula o total de receitas e despesas em aberto
  const totalDespesasEmAberto = despesasEmAberto.reduce((acc, despesa) => acc + despesa.valor, 0);
  const totalReceitasEmAberto = receitasEmAberto.reduce((acc, receita) => acc + receita.valor, 0);

  const handleMonthChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedMonth(date);
    }
  };

  const isVencida = (dataVencimento: string) => {
    return dayjs(dataVencimento).isBefore(dayjs(), 'day');
  };

  const groupByCategoria = (items: DocumentoFinanceiroType[]) => {
    return items.reduce((acc, item) => {
      const categoria = item.descricaoCategoria;
      if (!acc[categoria]) {
        acc[categoria] = { valor: 0, cor: item.corCategoria };
      }
      acc[categoria].valor += item.valor;
      return acc;
    }, {} as Record<string, { valor: number, cor?: string }>);
  };

  const groupedReceitas = groupByCategoria(receitasPagas);
  const groupedDespesas = groupByCategoria(despesasPagas);

  const dataReceitas = {
    labels: Object.keys(groupedReceitas), //apresentar abaixo do grafico
    datasets: [
      {
        data: Object.values(groupedReceitas).map((categoria) => (categoria.valor / totalReceitasPagas) * 100),
        backgroundColor: Object.values(groupedReceitas).map((categoria) => categoria.cor),
        borderWidth: 0,
      },
    ],
  };

  const dataDespesas = {
    labels: Object.keys(groupedDespesas), //apresentar abaixo do grafico
    datasets: [
      {
        data: Object.values(groupedDespesas).map((categoria) => (categoria.valor / totalDespesasPagas) * 100),
        backgroundColor: Object.values(groupedDespesas).map((categoria) => categoria.cor),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw || 0;
            return `Percentual ${value.toFixed(2)}%`;
          },
        },
      },
      legend: {
        position: 'bottom' as 'bottom',
        labels: {
          boxWidth: 20, // Ajusta a largura da caixa da legenda
          padding: 10,  // Ajusta o espaço entre os itens da legenda
        },
      }
    },
  };

  return (
    <Content
      style={{
        margin: isMobile ? 20 : 80,
        padding: 10,
        marginTop: 0,
        minHeight: 280,
      }}
    >
      <Row gutter={[16, 16]} justify={isMobile ? "space-between" : "start"} align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}><DashboardOutlined /> Dashboard</Title>
        </Col>
        <Col>
          <DatePicker
            size="middle"
            picker="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            format={(date) => {
              const monthName = date.format("MMMM/YYYY");
              return monthName.charAt(0).toUpperCase() + monthName.slice(1).toLowerCase(); // Primeira letra maiúscula e as demais minúsculas
            }}
            inputReadOnly={true}
            allowClear={false}
            placeholder="Selecione o mês"
            style={{
              width: isMobile ? '100%' : 'auto',
              background: colorBase,
              color: "#FFF",
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              border: "none"
            }}
            suffixIcon={<CalendarOutlined style={{ color: "#FFF" }} />}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Link to="/receitas">
            <Card style={{ background: '#4CAF50', border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
              <Title level={5} style={{ color: "#FFFFFF", margin: 0 }}>
                <DollarCircleFilled /> Receitas
              </Title>
              <Title level={3} style={{ color: "#FFFFFF", margin: 0 }}>
                R$ {totalReceitasPagas.toFixed(2).replace(".", ",")}
              </Title>
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={8}>
          <Link to="/despesas">
            <Card style={{ background: '#F44336', border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
              <Title level={5} style={{ color: "#FFFFFF", margin: 0 }}>
                <ShoppingFilled /> Despesas
              </Title>
              <Title level={3} style={{ color: "#FFFFFF", margin: 0 }}>
                R$ {totalDespesasPagas.toFixed(2).replace(".", ",")}
              </Title>
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ background: diferencaReceitasDespesas >= 0 ? "#2196F3" : "#FAAD14", border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <Title level={5} style={{ color: "#FFFFFF", margin: 0 }}>
              <AreaChartOutlined /> Balanço Mensal
            </Title>
            <Title level={3} style={{ color: "#FFFFFF", margin: 0 }}>
              R$ {(diferencaReceitasDespesas).toFixed(2).replace(".", ",")}
            </Title>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card style={{ border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title style={{ color: "#4CAF50", margin: 0 }} level={5}><DollarCircleFilled /> Receitas em Aberto</Title>
              <Title level={5} style={{ color: "#4CAF50", margin: 0 }}>
                R$ {totalReceitasEmAberto.toFixed(2).replace(".", ",")}
              </Title>
            </div>
            <List
              dataSource={receitasEmAberto}
              renderItem={item => (
                <List.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Text>{item.descricao}</Text>
                    <div>
                      <Tooltip title={`Despesa vencida em ${formatDate(item.dataVencimento)}`}>
                        <Text>
                          {isVencida(item.dataVencimento) && (
                            <ExclamationCircleOutlined style={{ color: "#FAAD14" }} />
                          )}
                        </Text>
                      </Tooltip>
                      <Text strong> R$ {item.valor.toFixed(2).replace(".", ",")}</Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title style={{ color: "#F44336", margin: 0 }} level={5}><ShoppingFilled /> Despesas em Aberto</Title>
              <Title level={5} style={{ color: "#F44336", margin: 0 }}>
                R$ {totalDespesasEmAberto.toFixed(2).replace(".", ",")}
              </Title>
            </div>
            <List
              dataSource={despesasEmAberto}
              renderItem={item => (
                <List.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Text>{item.descricao}</Text>
                    <div>
                      <Tooltip title={`Despesa vencida em ${formatDate(item.dataVencimento)}`}>
                        <Text>
                          {isVencida(item.dataVencimento) && (
                            <ExclamationCircleOutlined style={{ color: "#FAAD14" }} />
                          )}
                        </Text>
                      </Tooltip>
                      <Text strong> R$ {item.valor.toFixed(2).replace(".", ",")}</Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card style={{ border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <Title level={5} style={{ margin: 0, marginBottom: 20 }}>Gráfico de Receitas</Title>
            {receitasPagas.length > 0 ? (
              <Doughnut data={dataReceitas} options={options} style={{ maxHeight: '450px' }} />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text type="secondary">Não há dados</Text>
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ border: "none", boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }}>
            <Title level={5} style={{ margin: 0, marginBottom: 20 }}>Gráfico de Despesas</Title>
            {despesasPagas.length > 0 ? (
              <Doughnut data={dataDespesas} options={options} style={{ maxHeight: '450px' }} />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Text type="secondary">Não há dados</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default Dashboard;