import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ListFilial() {
  const [filiais, setFiliais] = useState([]);

  // Carregar todas as filiais
  useEffect(() => {
    loadFiliais();
  }, []);

  // Função para carregar as filiais
  const loadFiliais = async () => {
    try {
      const result = await axios.get("http://localhost:8080/filiais");
      setFiliais(result.data);
    } catch (error) {
      console.error('Erro ao carregar as filiais.', error);
    }
  };

  // Função para deletar uma filial
  const deleteFilial = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/filial/${id}`);
      // Atualiza a lista após deletar a filial
      setFiliais(filiais.filter(filial => filial.id !== id));
    } catch (error) {
      console.error('Erro ao deletar a filial.', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Lista de Filiais</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filiais.map(filial => (
            <tr key={filial.id}>
              <td>{filial.nome}</td>
              <td>{filial.cidade}</td>
              <td>{filial.estado}</td>
              <td>{filial.telefone}</td>
              <td>
                {/* Link para a página de detalhes da filial */}
                <Link to={`/viewfilial/${filial.id}`} className="btn btn-info">
                  Ver
                </Link>
                {/* Link para a página de edição da filial */}
                <Link to={`/editfilial/${filial.id}`} className="btn btn-outline-primary mx-2">
                  Editar
                </Link>
                {/* Botão de deletar - com funcionalidade */}
                <button onClick={() => deleteFilial(filial.id)} className="btn btn-danger mx-2">
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
