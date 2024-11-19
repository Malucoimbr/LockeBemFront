import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const RecursosHumanos = () => {
  useEffect(() => {
    // Gráfico de funcionários por filial
    const ctxBar = document.getElementById('chartjs-dashboard-bar').getContext('2d');
    const chartBar = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Espírito Santo'],  // Filiais
        datasets: [
          {
            label: 'Funcionários por Filial',
            backgroundColor: '#4e73df',
            data: [45, 38, 30, 25, 18], // Dados de funcionários por filial
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { stepSize: 10 }, grid: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });

    return () => {
      chartBar.destroy();
    };
  }, []);

  // Dados dos funcionários recém admitidos
  const recemAdmitidos = [
    { nome: 'Carlos Pereira', cargo: 'Analista Financeiro', dataAdmissao: '2024-10-01' },
    { nome: 'Ana Lima', cargo: 'Assistente Administrativo', dataAdmissao: '2024-10-03' },
    { nome: 'Marcelo Costa', cargo: 'Desenvolvedor Frontend', dataAdmissao: '2024-09-25' },
    { nome: 'Juliana Almeida', cargo: 'Gerente de TI', dataAdmissao: '2024-08-15' },
  ];

  return (
    <div>
      <div className="row">
        <h1 className="dashboard-title">Dashboard</h1>
        <div>
          <div className="button-container">
            <Link to="/" className="button-style">Operacional</Link>
            <Link to="/dashfinanceiro" className="button-style">Financeiro</Link>
            <Link to="/dashrh" className="button-style">RH</Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Total de Funcionários</h5>
              <h1 className="card-number">$45,231.89</h1>
              <p className="card-message">+20.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Funcionários Recém Admitidos</h5>
              <h1 className="card-number">+2350</h1>
              <p className="card-message">+180.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Média de Funcionários Por Filial</h5>
              <h1 className="card-number">+12,234</h1>
              <p className="card-message">+19% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
    
        </div>
        <div className="col-lg-6 col-md-6">
  <div className="chart-container">
    <p className="chart-title">Funcionários por Filial</p>
    <canvas id="chartjs-dashboard-bar" width="200" height="400"></canvas> 
  </div>
</div>

<div className="col-lg-6 col-md-6">
  <div className="chart-container2">
    <div>
      <p className="table-title">Recém Admitidos</p>
      <p className="table-subtitle">Funcionários contratados recentemente.</p>
    </div>

    {recemAdmitidos.map((funcionario, index) => (
      <div className="table-row" key={index}>
        <div className="table-contract">
          <div className="table-icon">
            <FaUser style={{ fontSize: '1.5rem', marginRight: '10px', backgroundColor:'#343a40', borderRadius: '50%', width: '30px', height:'30px' }} />
            <div className="user">
              <p className="user-name">{funcionario.nome}</p>
              <p className="user-email">{funcionario.cargo}</p>
            </div>
          </div>
        </div>
        <div className="user-reais">{funcionario.dataAdmissao}</div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default RecursosHumanos;
