import React from "react";
import { Link } from "react-router-dom";
import { FaSlidersH, FaUser, FaTruck, FaBuilding, FaFileContract, FaUsers, FaShieldAlt, FaExclamationTriangle, FaTools } from "react-icons/fa";
import '../css/sidebar.css';
import logo from '../imgs/logo.png';

export default function Sidebar() {
  return (
    <nav id="sidebar" className="sidebar js-sidebar">
      <div className="sidebar-content js-simplebar">
        <a  href="/">
          <div>     <img src={logo}  className="logo"></img>
          </div>
     
        </a>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Páginas</li>

          <li className="sidebar-item active">
            <Link className="sidebar-link" to="/">
              <FaSlidersH className="align-middle" />
              <span className="align-middle">Dashboard</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/clientes">
              <FaUser className="align-middle" />
              <span className="align-middle">Clientes</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/carros">
              <FaTruck className="align-middle" />
              <span className="align-middle">Carros</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/filiais">
              <FaBuilding className="align-middle" />
              <span className="align-middle">Filiais</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/addcontrato">
              <FaFileContract className="align-middle" />
              <span className="align-middle">Contratos de Aluguel</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/funcionarios">
              <FaUsers className="align-middle" />
              <span className="align-middle">Funcionários</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/seguros">
              <FaShieldAlt className="align-middle" />
              <span className="align-middle">Seguros</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/multas">
              <FaExclamationTriangle className="align-middle" />
              <span className="align-middle">Multas</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link className="sidebar-link" to="/manutencoes">
              <FaTools className="align-middle" />
              <span className="align-middle">Manutenções</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
