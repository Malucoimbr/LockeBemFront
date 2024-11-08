// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Bem-vindo ao Sistema de Gestão</h1>
      
      <div className="row">
        {/* Seção de Usuários */}
        <div className="col-md-4">
          <h3>Usuários</h3>
          <p>Gerencie os usuários do sistema.</p>
          <div className="d-grid gap-2">
            <Link to="/users" className="btn btn-primary">Gerenciar Usuários</Link>
          </div>
        </div>

        {/* Seção de Carros */}
        <div className="col-md-4">
          <h3>Carros</h3>
          <p>Gerencie os carros no sistema.</p>
          <div className="d-grid gap-2">
            <Link to="/cars" className="btn btn-primary">Gerenciar Carros</Link>
          </div>
        </div>

        {/* Seção de Filiais */}
        <div className="col-md-4">
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
