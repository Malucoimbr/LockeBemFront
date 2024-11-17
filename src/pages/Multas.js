import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaListAlt } from 'react-icons/fa';

export default function Multas() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gerenciar Multas</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaUserPlus size={40} className="mb-3" />
              <h4>Adicionar Nova Multa</h4>
              <p>Adicione uma nova multa ao sistema.</p>
              <Link to="/addmulta" className="btn btn-success btn-lg w-100">Adicionar Multa</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Multas</h4>
              <p>Visualize todas as multas cadastradas.</p>
              <Link to="/listmulta" className="btn btn-info btn-lg w-100">Listar Multas</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
