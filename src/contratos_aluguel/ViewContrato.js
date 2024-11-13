import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewContrato() {
  const [contrato, setContrato] = useState(null);
  const [cliente, setCliente] = useState('');  // Estado para armazenar o nome do cliente
  const [carro, setCarro] = useState('');  // Estado para armazenar o nome do carro
  const [erro, setErro] = useState('');
  const { id } = useParams(); 

  useEffect(() => {
    loadContrato();
  }, [id]);

  // Função para carregar o contrato
  const loadContrato = async () => {
    try {
      const contratoResult = await axios.get(`http://localhost:8080/api/contrato-aluguel/${id}`);
      setContrato(contratoResult.data);  // Atualiza o estado com os dados do contrato

      // Carregar o nome do cliente associado ao contrato
      const clienteResult = await axios.get(`http://localhost:8080/api/cliente/${contratoResult.data.cliente_id}`);
      setCliente(clienteResult.data.nome);  // Atualiza o estado com o nome do cliente

      // Carregar o nome do carro associado ao contrato
      const carroResult = await axios.get(`http://localhost:8080/api/carro/${contratoResult.data.carro_id}`);
      setCarro(carroResult.data.nome);  // Atualiza o estado com o nome do carro

    } catch (error) {
      console.error("Erro ao carregar contrato:", error);
      setErro("Erro de rede ou servidor.");
    }
  };

  return (
    <div className="container">
      <h1>Detalhes do Contrato</h1>
      
      {erro && <div className="alert alert-danger">{erro}</div>} 

      {/* Verifica se contrato existe */}
      {contrato ? (
        <div className="card">
          <div className="card-header">
            <strong>Detalhes do Contrato: </strong>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>ID do Contrato:</b> {contrato.id}
            </li>
            <li className="list-group-item">
              <b>Cliente ID:</b> {contrato.cliente_id}
            </li>
            <li className="list-group-item">
              <b>Cliente:</b> {cliente || "Nome do cliente não encontrado"}
            </li>
            <li className="list-group-item">
              <b>Data Início:</b> {contrato.data_inicio}
            </li>
            <li className="list-group-item">
              <b>Data Fim:</b> {contrato.data_fim}
            </li>
            <li className="list-group-item">
              <b>Carro ID:</b> {contrato.carro_id}
            </li>
            <li className="list-group-item">
              <b>Carro:</b> {carro || "Nome do carro não encontrado"}
            </li>
            <li className="list-group-item">
              <b>Valor Pago:</b> {contrato.valor_pago}
            </li>
          </ul>
        </div>
      ) : (
        <p>Carregando contrato...</p>
      )}
    </div>
  );
}
