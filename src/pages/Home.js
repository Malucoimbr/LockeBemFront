import React, { useEffect, useState } from 'react';
import { FaUsers, FaCar, FaBuilding, FaFileAlt } from 'react-icons/fa';
import Chart from 'chart.js/auto'; 

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ctxLine = document.getElementById("chartjs-dashboard-line").getContext("2d");

    var gradient = ctxLine.createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
    gradient.addColorStop(1, "rgba(215, 227, 244, 0)");

    const chartLine = new Chart(ctxLine, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Sales ($)",
          fill: true,
          backgroundColor: gradient,
          borderColor: '#4e73df', 
          data: [2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917, 3327]
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        tooltips: { intersect: false },
        hover: { intersect: true },
        plugins: { filler: { propagate: false } },
        scales: {
          x: {
            reverse: true,
            grid: { color: "rgba(0,0,0,0.0)" }
          },
          y: {
            ticks: { stepSize: 1000 },
            display: true,
            borderDash: [3, 3],
            grid: { color: "rgba(0,0,0,0.0)" }
          }
        }
      }
    });

    window.chartLine = chartLine;


    const ctxPie = document.getElementById("chartjs-dashboard-pie").getContext("2d");
    const chartPie = new Chart(ctxPie, {
      type: "pie",
      data: {
        labels: ["Clientes", "Carros", "Filiais"],
        datasets: [{
          data: [4306, 3801, 1689],
          backgroundColor: [
            "#4e73df", 
            "#fd7e14", 
            "#dc3545"  
          ],
          borderWidth: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        cutoutPercentage: 75
      }
    });


    window.chartPie = chartPie;


    const ctxBar = document.getElementById("chartjs-dashboard-bar").getContext("2d");
    const chartBar = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "This year",
          backgroundColor: "#4e73df", 
          borderColor: "#4e73df", 
          hoverBackgroundColor: "#4e73df", 
          hoverBorderColor: "#4e73df", 
          data: [54, 67, 41, 55, 62, 45, 55, 73, 60, 76, 48, 79],
          barPercentage: .75,
          categoryPercentage: .5
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          yAxes: [{
            gridLines: { display: false },
            stacked: false,
            ticks: { stepSize: 20 }
          }],
          xAxes: [{
            stacked: false,
            gridLines: { color: "transparent" }
          }]
        }
      }
    });

    
    window.chartBar = chartBar;

    return () => {
      if (window.chartLine) {
        window.chartLine.destroy();
      }
      if (window.chartPie) {
        window.chartPie.destroy();
      }
      if (window.chartBar) {
        window.chartBar.destroy();
      }
    };
  }, []);

  return (
    <div className="row">
      <h1>Analytics Dashboard</h1>
      <div className="col-xl-6 col-xxl-5 d-flex">
        <div className="w-100">
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body-card">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Sales</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <FaCar />
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">2.382</h1>
                  <div className="mb-0">
                    <span className="text-danger">
                      <i className="mdi mdi-arrow-bottom-right"></i> -3.65%
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body-card">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Visitors</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <FaUsers />
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">14.212</h1>
                  <div className="mb-0">
                    <span className="text-success">
                      <i className="mdi mdi-arrow-bottom-right"></i> 5.25%
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body-card">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Earnings</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <FaBuilding />
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-2 mb-3">$21.300</h1>
                  <div className="mb-0">
                    <span className="text-success">
                      <i className="mdi mdi-arrow-bottom-right"></i> 6.65%
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body-card">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Orders</h5>
                    </div>
                    <div className="col-auto">
                      <div className="stat text-primary">
                        <FaFileAlt />
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-1 mb-3">64</h1>
                  <div className="mb-0">
                    <span className="text-danger">
                      <i className="mdi mdi-arrow-bottom-right"></i> -2.25%
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4 col-xxl-3 d-flex">
        <div className="card flex-fill w-100">
          <div className="card-header">
            <h5 className="card-title mb-0">Browser Usage</h5>
          </div>
          <div className="card-body py-3">
            <div className="chart chart-xs">
              <canvas id="chartjs-dashboard-pie"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4 col-xxl-3 d-flex">
        <div className="card flex-fill w-100">
          <div className="card-header">
            <h5 className="card-title mb-0">Monthly Visits</h5>
          </div>
          <div className="card-body py-3">
            <div className="chart chart-xs">
              <canvas id="chartjs-dashboard-bar"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6 col-xxl-4 offset-xl-6 offset-xxl-8" >
        <div className="card flex-fill w-100">
          <div className="card-header">
            <h5 className="card-title mb-0">Recent Movement</h5>
          </div>
          <div className="card-body py-3">
            <div className="chart chart-sm">
              <canvas id="chartjs-dashboard-line"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default Home;