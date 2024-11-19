import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function EditarContrato() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pegando o ID do contrato
  const [contrato, setContrato] = useState({});
  const [error, setError] = useState('');

  // Carrega os dados do contrato para edição
  useEffect(() => {
    loadContrato();
  }, [id]);

  const loadContrato = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/contrato-aluguel/${id}`);
      setContrato(result.data); // Preenche os dados do contrato
    } catch (err) {
      setError('Erro ao carregar contrato');
      console.error(err);
    }
  };

  const onInputChange = (e) => {
    setContrato({ ...contrato, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/contrato-aluguel/${id}`, contrato);
      navigate("/listcontrato"); // Redireciona para a lista de contratos
    } catch (err) {
      setError('Erro ao atualizar contrato');
      console.error(err);
    }
  };

  return (
    <div className="container">
     <div className="row">
     <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      {error && <div className="alert alert-danger">{error}</div>}

    
          <h2 className="text-center mb-4">Editar Contrato</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="clienteId" className="form-label">Cliente</label>
              <input
                type="text"
                className="form-control"
                name="clienteId"
                value={contrato.clienteId || ""}
                onChange={onInputChange}
                placeholder="ID do Cliente"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="carroId" className="form-label">Carro</label>
              <input
                type="text"
                className="form-control"
                name="carroId"
                value={contrato.carroId || ""}
                onChange={onInputChange}
                placeholder="ID do Carro"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="seguroId" className="form-label">Seguro</label>
              <input
                type="text"
                className="form-control"
                name="seguroId"
                value={contrato.seguroId || ""}
                onChange={onInputChange}
                placeholder="ID do Seguro"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="funcionarioId" className="form-label">Funcionario</label>
              <input
                type="text"
                className="form-control"
                name="funcionarioId"
                value={contrato.funcionarioId || ""}
                onChange={onInputChange}
                placeholder="ID do Funcionário"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="valorPago" className="form-label">Valor Pago</label>
              <input
                type="number"
                className="form-control"
                name="valorPago"
                value={contrato.valorPago || ""}
                onChange={onInputChange}
                placeholder="Valor Pago"
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary">Salvar</button>
              <Link className="btn btn-outline-danger d-flex align-items-center" to="/listcontrato" style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '10px',
              padding: '6px 12px',
              fontSize: '1rem'
            }}>
                <FaTimes style={{ marginRight: '8px', fontSize: '1.2rem' }} />
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
