import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';  // Ícone de usuário
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const RecursosHumanos = () => {
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
      <Link to="/dashfinanceiro"className="button-style">Financeiro</Link>
      <Link to="/dashrh"className="button-style">RH</Link>
      </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="card-1">
          <div className="card-body">
            <h5 className="card-title">Total Revenue</h5>
            <h1 className="card-number">$45,231.89</h1>
            <p className="card-message">+20.1% from last month</p>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card-1">
          <div className="card-body">
            <h5 className="card-title">Subscriptions</h5>
            <h1 className="card-number">+2350</h1>
            <p className="card-message">+180.1% from last month</p>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card-1">
          <div className="card-body">
            <h5 className="card-title">Sales</h5>
            <h1 className="card-number">+12,234</h1>
            <p className="card-message">+19% from last month</p>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="card-1">
          <div className="card-body">
            <h5 className="card-title">Active Now</h5>
            <h1 className="card-number">+573</h1>
            <p className="card-message">+201 since last hour</p>
          </div>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="chart-container">
          <p className="chart-title">Overview</p>
          <canvas id="chartjs-dashboard-bar"></canvas>
        </div>
      </div>

  
      <div className="col-lg-6">
        <div className="table-container">
          <div>
            <p className="table-title">Recent Contracts</p>
            <p className="table-subtitle"> You made 265 sales this month.</p>
          </div>

   
          <div className="table-row">
            <div className="table-contract">
              <div className="table-icon">
              <FaUser style={{ fontSize: '1.5rem', marginRight: '10px',   backgroundColor:'#343a40', borderRadius: '50%', width: '100%', height:'30px',}} />
              <div className="user">
                <p className="user-name">Olivia Martin</p>
                <p className="user-email">olivia.martin@email.com</p>
              </div>
              </div>
            </div>
            <div className="user-reais">+$1,999.00</div>
          </div>


          <div className="table-row">
            <div className="table-contract">
              <div className="table-icon">
              <FaUser style={{ fontSize: '1.5rem', marginRight: '10px',   backgroundColor:'#343a40', borderRadius: '50%', width: '100%', height:'30px',}} />
              <div className="user">
                <p className="user-name">Olivia Martin</p>
                <p className="user-email">olivia.martin@email.com</p>
              </div>
              </div>
            </div>
            <div className="user-reais">+$1,999.00</div>
          </div>

          <div className="table-row">
            <div className="table-contract">
              <div className="table-icon">
              <FaUser style={{ fontSize: '1.5rem', marginRight: '10px',   backgroundColor:'#343a40', borderRadius: '50%', width: '100%', height:'30px',}} />
              <div className="user">
                <p className="user-name">Olivia Martin</p>
                <p className="user-email">olivia.martin@email.com</p>
              </div>
              </div>
            </div>
            <div className="user-reais">+$1,999.00</div>
          </div>

          <div className="table-row">
            <div className="table-contract">
              <div className="table-icon">
              <FaUser style={{ fontSize: '1.5rem', marginRight: '10px',   backgroundColor:'#343a40', borderRadius: '50%', width: '100%', height:'30px',}} />
              <div className="user">
                <p className="user-name">Olivia Martin</p>
                <p className="user-email">olivia.martin@email.com</p>
              </div>
              </div>
            </div>
            <div className="user-reais">+$1,999.00</div>
          </div>



          <div className="table-row">
            <div className="table-contract">
              <div className="table-icon">
              <FaUser style={{ fontSize: '1.5rem', marginRight: '10px',   backgroundColor:'#343a40', borderRadius: '50%', width: '100%', height:'30px',}} />
              <div className="user">
                <p className="user-name">Olivia Martin</p>
                <p className="user-email">olivia.martin@email.com</p>
              </div>
              </div>
            </div>
            <div className="user-reais">+$1,999.00</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecursosHumanos;
