import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecursosHumanos = () => {

  const [funcionariosTotal, setFuncionariosTotal] = useState(null);
  const [funcionariosRecentes, setFuncionariosRecentes] = useState(null);
  const [funcionariosRecentesList, setFuncionariosRecentesList] = useState(null);
  const [mediaDeFuncionarioPorFilial, setMediaDeFuncionarioPorFilial] = useState(null);
  const [loading, setLoading] = useState(true);
   
  // Contagem de funcionários totais
  useEffect(() => {
    const fetchFuncionarioTotal = async () => {
      const resposta = await axios.get('http://localhost:8080/api/funcionario/total');
      setFuncionariosTotal(resposta.data); 
      setLoading(false); 
    };
    fetchFuncionarioTotal();
  }, []); 

  // Contagem de funcionários recentes (último mês)
  useEffect(() => {
    const fetchFuncionariosRecentes = async () => {
      const resposta = await axios.get('http://localhost:8080/api/funcionario/totalAdmitidosUltimoMes');
      setFuncionariosRecentes(resposta.data); // Contagem total de funcionários recentes
      setLoading(false); 
    };
    fetchFuncionariosRecentes();
  }, []); 

  // Lista completa de funcionários recentes (para a tabela)
  useEffect(() => {
    const fetchFuncionariosRecentesList = async () => {
      const resposta = await axios.get('http://localhost:8080/api/funcionario/recentesAdmitidos');
      setFuncionariosRecentesList(resposta.data); // Lista dos funcionários recentes
      setLoading(false); 
    };
    fetchFuncionariosRecentesList();
  }, []); 

  // Média de funcionários por filial
  useEffect(() => {
    const fetchMediaDeFuncionariosPorFilial = async () => {
      const resposta = await axios.get('http://localhost:8080/api/funcionario/mediaFuncionariosPorFilial');
      setMediaDeFuncionarioPorFilial(resposta.data); 
      setLoading(false); 
    };
    fetchMediaDeFuncionariosPorFilial();
  }, []); 

  // Gráfico de funcionários por filial
  useEffect(() => {
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

    console.log(funcionariosRecentesList)

    return () => {
      chartBar.destroy();
    };
  }, []);

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
              <h1 className="card-number">{funcionariosTotal}</h1>
              <p className="card-message">+20.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Funcionários Recém-Admitidos</h5>
              <h1 className="card-number">{funcionariosRecentes}</h1>
              <p className="card-message">+180.1% from last month</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card-1">
            <div className="card-body">
              <h5 className="card-title">Média de Funcionários Por Filial</h5>
              <h1 className="card-number">{mediaDeFuncionarioPorFilial}</h1>
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

            {funcionariosRecentesList && funcionariosRecentesList.length > 0 ? (
              funcionariosRecentesList.map((funcionariosRecentesList, index) => (
                <div className="table-row" key={index}>
                  <div className="table-contract">
                    <div className="table-icon">
                      <FaUser style={{ fontSize: '1.5rem', marginRight: '10px', backgroundColor:'#343a40', borderRadius: '50%', width: '30px', height:'30px' }} />
                      <div className="user">
                        <p className="user-name">{funcionariosRecentesList.nome}</p>
                      
                        
                        <p className="user-email">{funcionariosRecentesList.cargo}</p>
                      </div>
                    </div>
                  </div>
                  <div className="user-reais">{funcionariosRecentesList.dataAdmissao}</div>
                </div>
              ))
            ) : (
              <p>Nenhum funcionário recente encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecursosHumanos;
