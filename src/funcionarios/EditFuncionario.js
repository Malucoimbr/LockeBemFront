import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export default function EditFuncionario() {
  let navigate = useNavigate();
  
  const [funcionario, setFuncionario] = useState({
    nome: "",
    email: "",
    cargo: "",
    telefone: "",
    dataAdmissao: "",
    filialId: "",
    supervisorId: ""
  });

  const [loading, setLoading] = useState(true); 

  const { id } = useParams(); 
  
  const onInputChange = (e) => {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(funcionario);  
    
    const updatedData = {};
    Object.keys(funcionario).forEach(key => {
      if (funcionario[key]) {
        updatedData[key] = funcionario[key];
      }
    });
  
    try {
      await axios.put(`http://localhost:8080/api/funcionario/${id}`, updatedData);
      navigate("/listfuncionario");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error.response ? error.response.data : error);
    }
  };
  
  useEffect(() => {
    loadFuncionario();
  }, [id]);

  const loadFuncionario = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/funcionario/${id}`);
      console.log(result.data);  
      setFuncionario(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar funcionário:", error);
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
          <h2 className="text-center m-4">Editar Funcionário</h2>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o nome" 
                name="nome" 
                value={funcionario.nome} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Digite o email" 
                name="email" 
                value={funcionario.email} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cargo" className="form-label">Cargo</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o cargo" 
                name="cargo" 
                value={funcionario.cargo} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o telefone" 
                name="telefone" 
                value={funcionario.telefone} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dataAdmissao" className="form-label">Data de Admissão</label>
              <input 
                type="date" 
                className="form-control" 
                name="dataAdmissao" 
                value={funcionario.dataAdmissao} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="filialId" className="form-label">Filial ID</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o ID da filial" 
                name="filialId" 
                value={funcionario.filialId} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="supervisorId" className="form-label">Supervisor ID</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o ID do supervisor" 
                name="supervisorId" 
                value={funcionario.supervisorId} 
                onChange={onInputChange} 
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-outline-primary">Atualizar</button>
            <Link className="btn btn-outline-danger d-flex align-items-center" to="/listfuncionario" style={{
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
