import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Financeiro = () => {

    const [faturamentoAcumulado, setFaturamentoAcumulado] = useState(null);
    const [manutencaoTotal, setManutencaoTotal] = useState(null);
    const [multaTotal, setMultaTotal] = useState(null);
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
                                    <h1 className="card-number">R$  {faturamentoAcumulado}</h1>
                                    <p className="card-message">+20.1% from last month</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card-1">
                        <div className="card-body">
                            <h5 className="card-title">Custos totais de Manutenções</h5>
                            <h1 className="card-number"> R$ {manutencaoTotal}</h1>
                            <p className="card-message">+180.1% from last month</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="card-1">
                        <div className="card-body">
                            <h5 className="card-title">Valor Total de Multas</h5>
                            <h1 className="card-number"> R$ {multaTotal}</h1>
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
