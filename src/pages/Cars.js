import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaListAlt, FaFileAlt } from 'react-icons/fa';

export default function Cars() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gerenciar Carros</h1>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <FaCar size={40} className="mb-3" />
              <h4>Adicionar Carro</h4>
              <p>Cadastre um novo carro no sistema.</p>
              <Link to="/addcarro" className="btn btn-success btn-lg w-100 mt-auto">Adicionar Carro</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <FaListAlt size={40} className="mb-3" />
              <h4>Listar Carros</h4>
              <p>Veja os carros cadastrados no sistema.</p>
              <Link to="/listcarro" className="btn btn-info btn-lg w-100 mt-auto">Listar Carros</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <FaFileAlt size={40} className="mb-3" />
              <h4>Listar Documentos</h4>
              <p>Veja todos os documentos cadastrados.</p>
              <Link to="/listdocumento" className="btn btn-info btn-lg w-100 mt-auto">Listar Documentos</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <FaFileAlt size={40} className="mb-3" />
              <h4>Editar Documentos</h4>
              <p>Edite os documentos cadastrados.</p>
              <Link to="/listdocumento" className="btn btn-info btn-lg w-100 mt-auto">Listar Documentos</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
