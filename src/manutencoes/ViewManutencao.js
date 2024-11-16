import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ViewMantencao() {
  const [manutencao, setManutencao] = useState({
    dataMan: "",
    tipoMan: "",
    custoMan: "",
    funcionarioId: "",
    carroId: ""
  });
  const [erro, setErro] = useState('');
  
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    loadMantencao();
  }, [id]);

  const loadMantencao = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/manutencao/${id}`);
      setManutencao(result.data); 
    } catch (error) {
      console.error("Erro ao carregar manutencao:", error);
      setErro("Erro de rede ou servidor.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalhes da Manutenção</h2>

          {erro && <div className="alert alert-danger">{erro}</div>} 

          <div className="card">
            <div className="card-header">
              <strong>Detalhes da Manutenção: </strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Data da Manutenção:</b> {manutencao.dataMan}
              </li>
              <li className="list-group-item">
                <b>Tipo de Manutenção:</b> {manutencao.tipoMan}
              </li>
              <li className="list-group-item">
                <b>Custo da Manutenção:</b> {manutencao.custoMan}
              </li>
              <li className="list-group-item">
                <b>ID Funcionário:</b> {manutencao.funcionarioId}
              </li>
              <li className="list-group-item">
                <b>ID Carro:</b> {manutencao.carroId}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
}
