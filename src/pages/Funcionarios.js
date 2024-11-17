import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaListAlt } from 'react-icons/fa';

export default function Funcionarios() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gerenciar Funcionários</h1>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaUserPlus size={40} className="mb-3" />
              <h4>Adicionar Novo Funcionário</h4>
              <p>Adicione um novo funcionário ao sistema</p>
              <Link to="/addfuncionario" className="btn btn-success btn-lg w-100">Adicionar Funcionário</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Funcionários</h4>
              <p>Visualize todos os funcionários cadastrados.</p>
              <Link to="/listfuncionario" className="btn btn-info btn-lg w-100">Listar Funcionários</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
