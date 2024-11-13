import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditarContrato() {
  const navigate = useNavigate();
  
  const [contrato, setContrato] = useState({
    data_inicio: "",
    data_fim: "",
    carro_id: "",
    cliente_id: "",
    valor_pago: "",
  });

  const [loading, setLoading] = useState(true); 
  const { id } = useParams(); // Pegando o ID do contrato pela URL
  
  const onInputChange = (e) => {
    setContrato({ ...contrato, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {};
    Object.keys(contrato).forEach(key => {
      if (contrato[key]) {
        updatedData[key] = contrato[key];
      }
    });

    try {
      await axios.put(`http://localhost:8080/api/contrato-aluguel/${id}`, updatedData);
      navigate("/listcontrato");
    } catch (error) {
      console.error("Erro ao atualizar contrato:", error.response ? error.response.data : error);
    }
  };
  
  useEffect(() => {
    loadContrato();
  }, [id]);

  const loadContrato = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/contrato-aluguel/${id}`);
      setContrato(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar contrato:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Contrato</h2>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="data_inicio" className="form-label">Data Início</label>
              <input 
                type="date" 
                className="form-control" 
                name="data_inicio" 
                value={contrato.data_inicio} 
                onChange={onInputChange} 
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="data_fim" className="form-label">Data Fim</label>
              <input 
                type="date" 
                className="form-control" 
                name="data_fim" 
                value={contrato.data_fim} 
                onChange={onInputChange} 
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="carro_id" className="form-label">ID do Carro</label>
              <input 
                type="text" 
                className="form-control" 
                name="carro_id" 
                value={contrato.carro_id} 
                onChange={onInputChange} 
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cliente_id" className="form-label">ID do Cliente</label>
              <input 
                type="text" 
                className="form-control" 
                name="cliente_id" 
                value={contrato.cliente_id} 
                onChange={onInputChange} 
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="valor_pago" className="form-label">Valor Pago</label>
              <input 
                type="number" 
                className="form-control" 
                name="valor_pago" 
                value={contrato.valor_pago} 
                onChange={onInputChange} 
                required
              />
            </div>

            <div className="d-flex flex-column">
    <button type="submit" className="btn btn-outline-primary w-100 mb-2">Atualizar Contrato</button>
    <Link className="btn btn-outline-danger w-100" to="/listcontrato">Cancelar</Link>
  </div>
          </form>
        </div>
      </div>
    </div>
  );
}
