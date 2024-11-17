import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

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
  const deleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cliente/${id}`);  // Usando rg como identificador
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
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.rg}>
              <td>{cliente.rg}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>{cliente.rua}</td>
              <td>{cliente.bairro}</td>
              <td>{cliente.numero}</td>
              <td className="d-flex justify-content-center">
                {/* Botões com ícones e estilização aprimorada */}
                <Link className="btn btn-outline-primary mx-2" to={`/viewcliente/${cliente.id}`}>
                  <FaEye size={18} /> <span className="d-none d-sm-inline">Ver</span>
                </Link>
                <Link className="btn btn-outline-warning mx-2" to={`/editcliente/${cliente.id}`}>
                  <FaEdit size={18} /> <span className="d-none d-sm-inline">Editar</span>
                </Link>
                <button className="btn btn-outline-danger mx-2" onClick={() => deleteCliente(cliente.id)}>
                  <FaTrash size={18} /> <span className="d-none d-sm-inline">Excluir</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
