import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewCar() {
  const { id } = useParams();
  const [carro, setCarro] = useState({
    placa: '',
    modelo: '',
    anoFab: '',
    km: '',
    tipo_carro: '',
    filialId: '',
    valorDiaria: '',
  });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    loadCar();
  }, [id]);

  const loadCar = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/carro/${id}`);
      setCarro(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar carro:", error);
      setErro("Erro ao carregar os dados do carro.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalhes do Carro</h2>

          {erro && <div className="alert alert-danger">{erro}</div>}

          <div className="card">
            <div className="card-header">
              <strong>Detalhes do Carro:</strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Quilometragem:</b> {carro.km}
              </li>
              <li className="list-group-item">
                <b>Tipo de Carro:</b> {carro.tipo_carro}
              </li>
              <li className="list-group-item">
                <b>Filial ID:</b> {carro.filialId}
              </li>
              <li className="list-group-item">
                <b>Valor da Diária:</b> {carro.valorDiaria}
              </li>
            </ul>
          </div>

          <Link className="btn btn-primary my-2" to="/listcarro">Voltar para a Lista de Carros</Link>
        </div>
      </div>
    </div>
  );
}
