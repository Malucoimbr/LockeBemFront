import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ViewMulta() {
  const [multa, setMulta] = useState({
    dataMulta: "",
    tipoInfracao: "",
    valorMulta: "",
    cargo: "",
    contratoId: ""
  });
  const [erro, setErro] = useState('');
  
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    loadMulta();
  }, [id]);

  const loadMulta = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/multa/${id}`);
      setMulta(result.data); 
    } catch (error) {
      console.error("Erro ao carregar multa:", error);
      setErro("Erro de rede ou servidor.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalhes da Multa</h2>

          {erro && <div className="alert alert-danger">{erro}</div>} 

          <div className="card">
            <div className="card-header">
              <strong>Detalhes da Multa: </strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Data da Multa:</b> {multa.dataMulta}
              </li>
              <li className="list-group-item">
                <b>Tipo de Infração:</b> {multa.tipoInfracao}
              </li>
              <li className="list-group-item">
                <b>Valor da Multa:</b> {multa.valorMulta}
              </li>
              <li className="list-group-item">
                <b>ID Contrato:</b> {multa.contratoId}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>Voltar para Home</Link>
        </div>
      </div>
    </div>
  );
}
