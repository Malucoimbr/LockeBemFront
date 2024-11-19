import React, { useEffect, useState  } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const Financeiro = () => {

    const [faturamentoAcumulado, setFaturamentoAcumulado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
   
      const fetchFaturamento = async () => {
        try {
          const response = await fetch('/api/contrato-aluguel/faturamento-acumulado'); 
          if (!response.ok) {
            throw new Error('Erro ao buscar o faturamento acumulado');
          }
          const data = await response.text();
       
          setFaturamentoAcumulado(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchFaturamento();
    }, []);
  useEffect(() => {
    // Gráfico de barras
    const ctxBar = document.getElementById('chartjs-dashboard-bar').getContext('2d');
    const chartBar = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'This year',
            backgroundColor: '#4e73df',
            data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { stepSize: 20 }, grid: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });

    // Gráfico de linhas
    const ctxLine = document.getElementById('chartjs-dashboard-line').getContext('2d');
    const chartLine = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Expenses',
            borderColor: '#e74a3b',
            backgroundColor: 'rgba(231, 74, 59, 0.1)',
            data: [40, 52, 37, 50, 60, 45, 56, 72, 61, 77, 50, 80],
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { stepSize: 20 }, grid: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });

    return () => {
      chartBar.destroy();
      chartLine.destroy();
    };
  }, []);

  return (
    <div>
      <div className="row">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="button-container">
          <Link to="/" className="button-style">Operacional</Link>
          <Link to="/dashfinanceiro" className="button-style">Financeiro</Link>
          <Link to="/dashrh" className="button-style">RH</Link>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Faturamento Acumulado</h5>
              {loading ? (
                <p>Carregando...</p>
              ) : error ? (
                <p>Erro: {error}</p>
              ) : (
                <>
                  <h1 className="card-number">R$ {faturamentoAcumulado.toFixed}</h1>
                  <p className="card-message">+20.1% from last month</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Custos totais de Manutenções</h5>
              <h1 className="card-number">+2350</h1>
              <p className="card-message">+180.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Total de Multas Aplicadas</h5>
              <h1 className="card-number">+12,234</h1>
              <p className="card-message">+19% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
         
        </div>

        <div className="col-lg-6">
          <div className="chart-container">
            <p className="chart-title">Custos com Manutenção por tipo de carro</p>
            <canvas id="chartjs-dashboard-bar"></canvas>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="chart-container">
            <p className="chart-title">Faturamento ao Longo do tempo</p>
            <canvas id="chartjs-dashboard-line"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financeiro;
