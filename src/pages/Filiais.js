// src/pages/Filiais.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Filiais() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Gestão de Filiais</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <Link to="/addfilial" className="btn btn-success">Adicionar Filial</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <Link to="/listfilial" className="btn btn-info">Listar Filiais</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
