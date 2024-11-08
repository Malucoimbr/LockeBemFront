// src/pages/Users.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
  return (
    <div className="container">
      <h1 className="text-center my-4">Gestão de Usuários</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <Link to="/adduser" className="btn btn-success">Adicionar Usuário</Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <Link to="/listusers" className="btn btn-info">Listar Usuários</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
