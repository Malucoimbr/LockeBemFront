import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileContract, FaClipboardList, FaPen } from 'react-icons/fa'; 

export default function Contratos() {
  return (
    <div className="container min-vh-100 d-flex flex-column">
      <h1 className="text-center my-4">Gestão de Contratos</h1>
      
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaFileContract size={40} className="mb-3" /> 
              <h4>Adicionar Contrato</h4>
              <p>Adicione um novo contrato ao sistema.</p>
              <Link to="/addcontrato" className="btn btn-success btn-lg w-100">Adicionar Contrato</Link> 
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <FaClipboardList size={40} className="mb-3" />
              <h4>Listar Contratos</h4>
              <p>Visualize todos os contratos cadastrados no sistema.</p>
              <Link to="/listcontrato" className="btn btn-info btn-lg w-100">Listar Contratos</Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
