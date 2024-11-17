import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaListAlt } from 'react-icons/fa';

export default function Seguros() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gerenciar Seguros</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaUserPlus size={40} className="mb-3" />
              <h4>Adicionar Seguro</h4>
              <p>Adicione um novo seguro ao sistema.</p>
              <Link to="/addseguro" className="btn btn-success btn-lg w-100">Adicionar Seguro</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Seguros</h4>
              <p>Visualize todos os seguros cadastrados.</p>
              <Link to="/listseguro" className="btn btn-info btn-lg w-100">Listar Seguros</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
