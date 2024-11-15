import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ViewFuncionario() {
  const [funcionario, setFuncionario] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    dataAdmissao: "",
    filialId: "",
    supervisorId: ""
  });
  const [erro, setErro] = useState('');
  
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    loadFuncionario();
  }, [id]);

  const loadFuncionario = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/funcionario/${id}`);
      setFuncionario(result.data); // Atualiza o estado com os dados do funcionário
    } catch (error) {
      console.error("Erro ao carregar funcionário:", error);
      setErro("Erro de rede ou servidor.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalhes do Funcionário</h2>

          {erro && <div className="alert alert-danger">{erro}</div>} 

          <div className="card">
            <div className="card-header">
              <strong>Detalhes do Funcionário: </strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Nome:</b> {funcionario.nome}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {funcionario.email}
              </li>
              <li className="list-group-item">
                <b>Telefone:</b> {funcionario.telefone}
              </li>
              <li className="list-group-item">
                <b>Cargo:</b> {funcionario.cargo}
              </li>
              <li className="list-group-item">
                <b>Data de Admissão:</b> {funcionario.dataAdmissao}
              </li>
              <li className="list-group-item">
                <b>Filial ID:</b> {funcionario.filialId}
              </li>
              <li className="list-group-item">
                <b>Supervisor ID:</b> {funcionario.supervisorId}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
}
