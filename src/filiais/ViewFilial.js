import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewFilial() {
  const [filial, setFilial] = useState({
    nome: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    telefone: '',
  });

  const { id } = useParams();  // Obtém o 'id' da URL

  useEffect(() => {
    loadFilial();
  }, [id]);  // Recarrega os dados sempre que o 'id' mudar

  const loadFilial = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/filial/${id}`);
      setFilial(result.data);
    } catch (error) {
      console.error('Erro ao carregar os dados da filial.', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalhes da Filial</h2>

          <div className="card">
            <div className="card-header">
              Detalhes da Filial Código: {filial.codigoFilial} {/* Exibindo o código da filial */}
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Nome:</b> {filial.nome}</li>
                <li className="list-group-item"><b>Rua:</b> {filial.rua}</li>
                <li className="list-group-item"><b>Número:</b> {filial.numero}</li>
                <li className="list-group-item"><b>Cidade:</b> {filial.cidade}</li>
                <li className="list-group-item"><b>Estado:</b> {filial.estado}</li>
                <li className="list-group-item"><b>Telefone:</b> {filial.telefone}</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link className="btn btn-outline-primary mt-3" to="/listfilial">Voltar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
