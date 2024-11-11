import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewCar() {
  const { id } = useParams();  // Obtém o 'id' da URL
  const [car, setCar] = useState({
    placa: '',
    modelo: '',
    anoFab: '',
    km: '',
    tipoCarro: '',
    codigoFilial: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCar();
  }, [id]);  // Recarrega os dados sempre que o 'id' mudar

  // Função para carregar os dados do carro com o id
  const loadCar = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/carros/${id}`);
      setCar(result.data);
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
      {car ? (
        <div className="card">
          <div className="card-header">
            Detalhes do Carro: {car.placa} {/* Exibindo a placa do carro */}
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Placa:</strong> {car.placa}</li>
              <li className="list-group-item"><strong>Modelo:</strong> {car.modelo}</li>
              <li className="list-group-item"><strong>Ano de Fabricação:</strong> {car.anoFab}</li>
              <li className="list-group-item"><strong>Quilometragem:</strong> {car.km}</li>
              <li className="list-group-item"><strong>Tipo de Carro:</strong> {car.tipoCarro}</li>
              <li className="list-group-item"><strong>Código da Filial:</strong> {car.codigoFilial}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>Carro não encontrado</div>
      )}
      <div className="text-center mt-3">
        <Link to="/listcarros" className="btn btn-outline-primary">Voltar</Link>
      </div>
    </div>
  );
}
