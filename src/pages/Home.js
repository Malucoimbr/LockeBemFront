import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [dataDisponiveis, setDataDisponiveis] = useState(null); 
  const [dataAlugados, setDataAlugados] = useState(null); 
  const [dataManutencao, setDataManutencao] = useState(null);
  const [dataContratos, setDataContratos] = useState(null);
  const [clientesPorBairro, setClientesPorBairro] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/carro/qtdedisponiveis")
      .then(response => {
        setDataDisponiveis(response.data);  // Corrigido o acesso aos dados
      })
      .catch(error => {
        console.error("There was an error fetching the data: ", error);
      });
  
    axios.get("http://localhost:8080/api/contrato-aluguel/alugadosHoje")
    .then(response => {
      setDataAlugados(response.data);  // Corrigido o acesso aos dados
    })
    .catch(error => {
      console.error("There was an error fetching the data: ", error);
    });

    axios.get("http://localhost:8080/api/manutencao/manutencaoHoje")
    .then(response => {
      setDataManutencao(response.data);  // Corrigido o acesso aos dados
    })
    .catch(error => {
      console.error("There was an error fetching the data: ", error);
    });

    axios.get("http://localhost:8080/api/contrato-aluguel/contratosEmAndamentoHoje")
    .then(response => {
      setDataContratos(response.data);  // Corrigido o acesso aos dados
    })
    .catch(error => {
      console.error("There was an error fetching the data: ", error);
    });

    fetchDataAndRenderCharts();

  }, []); // Esse efeito será executado uma vez no carregamento do componente

  // Função que irá buscar os dados e renderizar os gráficos
  const fetchDataAndRenderCharts = async () => {
    try {
      // Gráfico de Barras Horizontal
      const responseBairro = await axios.get('http://localhost:8080/api/cliente/porBairro'); // Substitua pela sua rota correta
      const dataBairro = responseBairro.data;
      const labelsBairro = Object.keys(dataBairro);
      const valuesBairro = Object.values(dataBairro);

      const ctxBarHorizontal = document.getElementById('chartjs-dashboard-bar-horizontal').getContext('2d');
      new Chart(ctxBarHorizontal, {
        type: 'bar',
        data: {
          labels: labelsBairro,
          datasets: [
            {
              label: 'Clientes por Bairro',
              backgroundColor: '#36b9cc',
              data: valuesBairro,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: true } },
          scales: {
            x: { ticks: { stepSize: 1 }, grid: { display: false } },
            y: { grid: { display: false } },
          },
        },
      });

      // Gráfico de Barras Verticais (ou outro gráfico desejado)
      const responseAlugados = await axios.get('http://localhost:8080/api/contrato-aluguel/carrosAlugadosPorTipo');
      const dataAlugados = responseAlugados.data;
      const labelsAlugados = Object.keys(dataAlugados);
      const valuesAlugados = Object.values(dataAlugados);

      const ctxBarVertical = document.getElementById('chartjs-dashboard-bar-vertical').getContext('2d');
      new Chart(ctxBarVertical, {
        type: 'bar',
        data: {
          labels: labelsAlugados,
          datasets: [
            {
              label: 'Alugados Hoje',
              backgroundColor: '#ffb84d',
              data: valuesAlugados,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: true } },
          scales: {
            x: { ticks: { stepSize: 1 }, grid: { display: false } },
            y: { grid: { display: false } },
          },
        },
      });

    } catch (error) {
      console.error('Erro ao buscar dados para os gráficos:', error);
    }
  };

  return (
    <div>
      <div className="row">
        <h1 className="dashboard-title">Dashboard</h1>
        <div>
          <div className="button-container">
            <Link to="/" className="button-style">Operacional</Link>
            <Link to="/dashfinanceiro"className="button-style">Financeiro</Link>
            <Link to="/dashrh"className="button-style">RH</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Veículos Disponíveis</h5>
              <h1 className="card-number">{dataDisponiveis !== null ? dataDisponiveis : 'Carregando...'}</h1>
              <p className="card-message">veículos</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Veículos Alugados</h5>
              <h1 className="card-number">{dataAlugados !== null ? dataAlugados : 'Carregando...'}</h1>
              <p className="card-message">veículos</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Veículos em Manutenção</h5>
              <h1 className="card-number">{dataManutencao !== null ? dataManutencao : 'Carregando...'}</h1>
              <p className="card-message">veículos</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Contratos Ativos</h5>
              <h1 className="card-number">{dataContratos !== null ? dataContratos : 'Carregando...'}</h1>
              <p className="card-message">contratos</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="chart-container">
            <p className="chart-title">Quantidade de Carros Alugados por Tipo</p>
            <canvas id="chartjs-dashboard-bar-vertical"></canvas> {/* Alterei o ID aqui */}
          </div>
        </div>
   
        <div className="col-lg-6">
          <div className="chart-container">
            <p className="chart-title">Clientes por Bairro</p>
            <canvas id="chartjs-dashboard-bar-horizontal"></canvas>
          </div>
        </div>
          </div>
        </div>

  );
};

export default Home;