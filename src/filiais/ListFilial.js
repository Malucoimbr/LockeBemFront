import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListFilial() {
  const [filiais, setFiliais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFiliais();
  }, []);

  const loadFiliais = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/filial");
      setFiliais(result.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao carregar as filiais.');
      setLoading(false);
    }
  };

  const deleteFilial = async (codigoFilial) => {
    try {
      await axios.delete(`http://localhost:8080/api/filial/${codigoFilial}`);
      loadFiliais(); 
    } catch (error) {
      console.error('Erro ao deletar a filial.', error);
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
      <h2 className="my-4">Lista de Filiais</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Código da Filial</th>
            <th>Nome</th>
            <th>Rua</th>
            <th>Número</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Telefone</th>
            <th>CNPJ</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filiais.map(filial => (
            <tr key={filial.id}>
              <td>{filial.id}</td>
              <td>{filial.nome}</td>
              <td>{filial.rua}</td>
              <td>{filial.numero}</td>
              <td>{filial.cidade}</td>
              <td>{filial.estado}</td>
              <td>{filial.telefone}</td>
              <td>{filial.cnpj}</td>
              <td>
                <Link to={`/viewfilial/${filial.id}`} className="btn btn-info">Ver</Link>
                <Link to={`/editfilial/${filial.id}`} className="btn btn-outline-primary mx-2">Editar</Link>
                <button onClick={() => deleteFilial(filial.id)} className="btn btn-danger mx-2">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
