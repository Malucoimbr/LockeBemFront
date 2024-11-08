import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaListAlt } from 'react-icons/fa';

export default function Cars() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gestão de Carros</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaCar size={40} className="mb-3" />
              <h4>Adicionar Carro</h4>
              <p>Cadastre um novo carro no sistema.</p>
              <Link to="/addcar" className="btn btn-success btn-lg w-100">Adicionar Carro</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Carros</h4>
              <p>Veja todos os carros cadastrados no sistema.</p>
              <Link to="/listcars" className="btn btn-info btn-lg w-100">Listar Carros</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
