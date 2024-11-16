import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditManutencao() {
  let navigate = useNavigate();
  
  const [manutencao, setManutencao] = useState({
    dataMan: "",
    tipoMan: "",
    custoMan: "",
    funcionarioId: "",
    carroId: ""
  });

  const [loading, setLoading] = useState(true); 

  const { id } = useParams(); 
  
  const onInputChange = (e) => {
    setManutencao({ ...manutencao, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(manutencao);  
    
    const updatedData = {};
    Object.keys(manutencao).forEach(key => {
      if (manutencao[key]) {
        updatedData[key] = manutencao[key];
      }
    });
  
    try {
      await axios.put(`http://localhost:8080/api/manutencao/${id}`, updatedData);
      navigate("/listmanutencao");
    } catch (error) {
      console.error("Erro ao atualizar manutenção:", error.response ? error.response.data : error);
    }
  };
  
  useEffect(() => {
    loadManutencao();
  }, [id]);

  const loadManutencao = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/manutencao/${id}`);
      console.log(result.data);  
      setManutencao(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar manutenção:", error);
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
          <h2 className="text-center m-4">Editar Manutenção</h2>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="dataMan" className="form-label">Data da Manutenção</label>
              <input 
                type="date" 
                className="form-control" 
                placeholder="Digite a Data da Manutenção" 
                name="dataMan" 
                value={manutencao.dataMan} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoMan" className="form-label">Tipo de Manutenção</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o Tipo de Manutenção" 
                name="tipoMan" 
                value={manutencao.tipoMan} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="custoMan" className="form-label">Custo da Manutenção</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o Custo da Manutenção" 
                name="custoMan" 
                value={manutencao.custoMan} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="funcionarioId" className="form-label">ID do Funcionário</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o ID do Funcionário" 
                name="funcionarioId" 
                value={manutencao.funcionarioId} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="carroId" className="form-label">ID do Carro</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o ID do Carro" 
                name="carroId" 
                value={manutencao.carroId} 
                onChange={onInputChange} 
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">Atualizar</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
