import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewFilial() {
  const { codigoFilial } = useParams();  // Obtém o 'id' da URL
  const [filial, setFilial] = useState({
    nome: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    telefone: '',
    codigoFilial: '',
    cnpj: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFilial();
  }, [codigoFilial]);  // Recarrega os dados sempre que o 'id' mudar

  // Função para carregar a filial com o id
  const loadFilial = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/filial/${codigoFilial}`);
      setFilial(result.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar os dados da filial.');
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
      <h2 className="my-4">Detalhes da Filial</h2>
      {filial ? (
        <div className="card">
          <div className="card-header">
            Detalhes da Filial: {filial.codigoFilial} {/* Exibindo o código da filial */}
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Código da Filial:</strong> {filial.codigoFilial}</li>
              <li className="list-group-item"><strong>Nome:</strong> {filial.nome}</li>
              <li className="list-group-item"><strong>Rua:</strong> {filial.rua}</li>
              <li className="list-group-item"><strong>Número:</strong> {filial.numero}</li>
              <li className="list-group-item"><strong>Cidade:</strong> {filial.cidade}</li>
              <li className="list-group-item"><strong>Estado:</strong> {filial.estado}</li>
              <li className="list-group-item"><strong>Telefone:</strong> {filial.telefone}</li>
    
              <li className="list-group-item"><strong>CNPJ:</strong> {filial.cnpj}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>Filial não encontrada</div>
      )}
      <div className="text-center mt-3">
        <Link to="/listfilial" className="btn btn-outline-primary">Voltar</Link>
      </div>
    </div>
  );
}
