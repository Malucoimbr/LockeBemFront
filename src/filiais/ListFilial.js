import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

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
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center my-4">Lista de Filiais</h2>
      <table className="table border shadow">
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
              <td className="d-flex justify-content-center">
                {/* Botões com ícones para as ações */}
                <Link to={`/viewfilial/${filial.id}`} className="btn btn-outline-info mx-2">
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link to={`/editfilial/${filial.id}`} className="btn btn-outline-warning mx-2">
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button onClick={() => deleteFilial(filial.id)} className="btn btn-outline-danger mx-2">
                  <FaTrash size={18} /> <span className="d-none d-sm-inline">Deletar</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
