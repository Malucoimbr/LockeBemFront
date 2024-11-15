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
    Filial_id: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCar();
  }, [id]);  


  const loadCar = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/carro/${id}`);
      setCarro(result.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar os dados do carro.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="my-4">Detalhes do Carro</h2>
      {carro ? (
        <div className="card">
          <div className="card-header">
            Detalhes do Carro: {carro.id} {/* Exibindo a placa do carro */}
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Código do Documento:</strong> {carro.id}</li>
              <li className="list-group-item"><strong>Quilometragem:</strong> {carro.km}</li>
              <li className="list-group-item"><strong>Tipo de Carro:</strong> {carro.carroTipo}</li>
              <li className="list-group-item"><strong>Código da Filial:</strong> {carro.filialId}</li>
              <li className="list-group-item"><strong>Valor da Diária:</strong> {carro.valorDiaria}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>Carro não encontrado</div>
      )}
      <div className="text-center mt-3">
        <Link to="/listcarro" className="btn btn-outline-primary">Voltar</Link>
      </div>
    </div>
  );
}
