import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaListAlt } from 'react-icons/fa';

export default function Clientes() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gestão de Clientes</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaUserPlus size={40} className="mb-3" />
              <h4>Adicionar Usuário</h4>
              <p>Adicione um novo usuário ao sistema.</p>
              <Link to="/addcliente" className="btn btn-success btn-lg w-100">Adicionar Clientes</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Usuários</h4>
              <p>Visualize todos os usuários cadastrados no sistema.</p>
              <Link to="/listcliente" className="btn btn-info btn-lg w-100">Listar Usuários</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
