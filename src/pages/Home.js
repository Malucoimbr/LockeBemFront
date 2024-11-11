import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCar, FaBuilding } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4 mb-5">Bem-vindo ao Sistema de Gestão</h1>

      <div className="row justify-content-center">
        <div className="col-md-4 text-center mb-4">
          <FaUsers size={50} />
          <h3>Clientes</h3>
          <p>Gerencie os clientes no sistema.</p>
          <div className="d-grid gap-2">
            <Link to="/clientes" className="btn btn-primary">Gerenciar Clientes</Link>
          </div>
        </div>

        <div className="col-md-4 text-center mb-4">
          <FaCar size={50} />
          <h3>Carros</h3>
          <p>Gerencie os carros no sistema.</p>
          <div className="d-grid gap-2">
            <Link to="/carros" className="btn btn-primary">Gerenciar Carros</Link>
          </div>
        </div>

        <div className="col-md-4 text-center mb-4">
          <FaBuilding size={50} />
          <h3>Filiais</h3>
          <p>Gerencie as filiais do sistema.</p>
          <div className="d-grid gap-2">
            <Link to="/filiais" className="btn btn-primary">Gerenciar Filiais</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
