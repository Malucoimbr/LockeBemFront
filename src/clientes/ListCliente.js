import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListCliente() {
  const [clientes, setClientes] = useState([]); 
  const [error, setError] = useState('');

  // Função para carregar os clientes
  useEffect(() => {
    loadClientes();
  }, []);

  // Função para carregar os clientes
  const loadClientes = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/cliente"); 
      setClientes(result.data);
    } catch (err) {
      setError('Erro ao carregar clientes');
      console.error(err);
    }
  };

  // Função para excluir um cliente pelo rg
  const deleteCliente = async (rg) => {
    try {
      await axios.delete(`http://localhost:8080/api/cliente/${rg}`);  // Usando rg como identificador
      loadClientes();  // Recarregar a lista após a exclusão
    } catch (err) {
      setError('Erro ao excluir cliente');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">RG</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
            <th scope="col">Rua</th>
            <th scope="col">Bairro</th>
            <th scope="col">Número</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.rg}>  {/* Alterado para usar rg como chave */}
              <th scope="row">{cliente.rg}</th> {/* Usando rg como identificador */}
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.rua}</td>
              <td>{cliente.bairro}</td>
              <td>{cliente.numero}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewcliente/${cliente.rg}`}>Ver</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/editcliente/${cliente.rg}`}>Editar</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteCliente(cliente.rg)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
