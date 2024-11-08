import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaListAlt } from 'react-icons/fa';

export default function Filiais() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gestão de Filiais</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaBuilding size={40} className="mb-3" />
              <h4>Adicionar Filial</h4>
              <p>Cadastre uma nova filial no sistema.</p>
              <Link to="/addfilial" className="btn btn-success btn-lg w-100">Adicionar Filial</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Filiais</h4>
              <p>Veja todas as filiais cadastradas no sistema.</p>
              <Link to="/listfilial" className="btn btn-info btn-lg w-100">Listar Filiais</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
