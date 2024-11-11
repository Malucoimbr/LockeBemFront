import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditCliente() {
  let navigate = useNavigate();
  
  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    rg: "",
    telefone: "",
    rua: "",
    bairro: "",
    numero: "",
  });

  const [loading, setLoading] = useState(true); 

  const { id } = useParams(); 

  
  const onInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(cliente);  
  
    const updatedData = {};
    Object.keys(cliente).forEach(key => {
      if (cliente[key]) {
        updatedData[key] = cliente[key];
      }
    });
  
    try {
      await axios.put(`http://localhost:8080/api/cliente/${id}`, updatedData);
      navigate("/listcliente");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error.response ? error.response.data : error);
    }
  };
  
  useEffect(() => {
    loadCliente();
  }, [id]);

  const loadCliente = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/cliente/${id}`);
      console.log(result.data);  
      setCliente(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
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
          <h2 className="text-center m-4">Editar Cliente</h2>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite seu nome" 
                name="nome" 
                value={cliente.nome} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Digite seu email" 
                name="email" 
                value={cliente.email} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefone" className="form-label">Telefone</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite seu telefone" 
                name="telefone" 
                value={cliente.telefone} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rua" className="form-label">Rua</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite sua rua" 
                name="rua" 
                value={cliente.rua} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bairro" className="form-label">Bairro</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite seu bairro" 
                name="bairro" 
                value={cliente.bairro} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o número" 
                name="numero" 
                value={cliente.numero} 
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
