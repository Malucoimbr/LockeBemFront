// src/pages/Cars.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Cars() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Gestão de Carros</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <Link to="/addcar" className="btn btn-success">Adicionar Carro</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <Link to="/listcars" className="btn btn-info">Listar Carros</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
