import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ViewCliente() {
  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    bairro: "",
    rg: "",
    rua: "",
    numero: "",
    telefone: ""
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  
  const { rg } = useParams(); 
  const navigate = useNavigate(); // For redirecting in case of error

  useEffect(() => {
    loadCliente();
  }, [rg]);

  const loadCliente = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/${rg}`);
      setCliente(result.data); // Atualiza o estado com os dados do cliente
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
      setErro("Erro de rede ou servidor.");
    }
  };
  
  
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalhes do Cliente</h2>

          {erro && <div className="alert alert-danger">{erro}</div>} 

          <div className="card">
            <div className="card-header">
              <strong>Detalhes do Cliente: </strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Nome:</b> {cliente.nome}
              </li>
              <li className="list-group-item">
                <b>Rg:</b> {cliente.rg}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {cliente.email}
              </li>
              <li className="list-group-item">
                <b>Bairro:</b> {cliente.bairro}
              </li>
              <li className="list-group-item">
                <b>Rua:</b> {cliente.rua}
              </li>
              <li className="list-group-item">
                <b>Numero:</b> {cliente.numero}
              </li>
              <li className="list-group-item">
                <b>Telefone:</b> {cliente.telefone}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
}
