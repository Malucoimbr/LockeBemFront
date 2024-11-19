import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Financeiro = () => {
    const [faturamentoAcumulado, setFaturamentoAcumulado] = useState(null);
    const [manutencaoTotal, setManutencaoTotal] = useState(null);
    const [multaTotal, setMultaTotal] = useState(null);
    const [faturamentoAnoAtual, setFaturamentoAnoAtual] = useState(null);
    const [top5Manutencao, setTop5Manutencao] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchFaturamento = async () => {
            const resposta = await axios.get('http://localhost:8080/api/contrato-aluguel/faturamento-acumulado');
            setFaturamentoAcumulado(resposta.data); 
            setLoading(false); 
        };
        fetchFaturamento();
    }, []); 

    useEffect(() => {
        const fetchManutencao = async () => {
            const resposta = await axios.get('http://localhost:8080/api/manutencao/custoTotal');
            setManutencaoTotal(resposta.data); 
            setLoading(false); 
        };
        fetchManutencao();
    }, []); 

    useEffect(() => {
        const fetchMulta = async () => {
            const resposta = await axios.get('http://localhost:8080/api/multa/total');
            setMultaTotal(resposta.data); 
            setLoading(false); 
        };
        fetchMulta();
    }, []); 

    useEffect(() => {
        const fetchFaturamento = async () => {
            try {
                const resposta = await axios.get('http://localhost:8080/api/contrato-aluguel/faturamentoAnoAtual');
                setFaturamentoAnoAtual(resposta.data); 
                setLoading(false); 
            } catch (error) {
                console.error("Erro ao buscar faturamento:", error);
                setLoading(false); 
            }
        };
        fetchFaturamento();
    }, []);

    useEffect(() => {
        const fetchTop5Manutencao = async () => {
            try {
                const resposta = await axios.get('http://localhost:8080/api/manutencao/top5manutencao');
                setTop5Manutencao(resposta.data); 
            } catch (error) {
                console.error("Erro ao buscar top 5 manutenções:", error);
            }
        };
        fetchTop5Manutencao();
    }, []);

    useEffect(() => {
        if (faturamentoAnoAtual) {
            const meses = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const dadosFaturamento = Object.values(faturamentoAnoAtual);
            const labelsMeses = meses.slice(0, dadosFaturamento.length); // Associa os meses com os valores recebidos

            const ctxLine = document.getElementById('chartjs-dashboard-line').getContext('2d');

            // Verifique se já existe um gráfico antes de criar outro
            if (window.chartLine) {
                window.chartLine.destroy();  // Destrói o gráfico existente
            }

            window.chartLine = new Chart(ctxLine, {
                type: 'line',
                data: {
                    labels: labelsMeses,
                    datasets: [
                        {
                            label: 'Faturamento ao longo do ano',
                            borderColor: '#4e73df',
                            backgroundColor: 'rgba(78, 115, 223, 0.1)',
                            data: dadosFaturamento,
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { stepSize: 500 }, grid: { display: false } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }
    }, [faturamentoAnoAtual]);

    

    useEffect(() => {
        if (top5Manutencao.length > 0) {
            const manutencaoLabels = top5Manutencao.map(item => item.tipoMan);  
            const manutencaoCustos = top5Manutencao.map(item => item.total_custo);  

            const ctxBar = document.getElementById('chartjs-dashboard-bar').getContext('2d');

            
            if (window.chartBar) {
                window.chartBar.destroy(); 
            }

            window.chartBar = new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: manutencaoLabels,
                    datasets: [
                        {
                            label: 'Custos de Manutenções',
                            backgroundColor: '#4e73df',
                            data: manutencaoCustos,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { stepSize: 1000 }, grid: { display: false } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }
    }, [top5Manutencao]);

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
                            <h1 className="card-number">R$  {faturamentoAcumulado}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card-1">
                        <div className="card-body">
                            <h5 className="card-title">Custos Totais de Manutenções</h5>
                            <h1 className="card-number"> R$ {manutencaoTotal}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card-1">
                        <div className="card-body">
                            <h5 className="card-title">Valor Total de Multas</h5>
                            <h1 className="card-number"> R$ {multaTotal}</h1>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                </div>

                    <div className="col-lg-6">
                        <div className="chart-container">
                            <p className="chart-title">Faturamento ao Longo do Ano</p>
                            <canvas id="chartjs-dashboard-line"></canvas> 
                        </div>
                    </div>
            <div className="col-lg-6">
                <div className="chart-container">
                    <p className="chart-title">Custo por Tipo de Manutenção</p>
                    <canvas id="chartjs-dashboard-bar"></canvas>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Financeiro;
