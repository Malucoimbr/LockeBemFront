import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function ViewContrato() {
  const [contrato, setContrato] = useState(null);
  const [cliente, setCliente] = useState({ nome: '', rg: '' });
  const [carro, setCarro] = useState({ modelo: '', placa: '' });
  const [erro, setErro] = useState('');
  const { id } = useParams();

  useEffect(() => {
    loadContrato();
  }, [id]);

  const loadContrato = async () => {
    try {
      const contratoResult = await axios.get(`http://localhost:8080/api/contrato-aluguel/${id}`);
      setContrato(contratoResult.data);

      const clienteResult = await axios.get(`http://localhost:8080/api/cliente/${contratoResult.data.cliente_id}`);
      setCliente({ nome: clienteResult.data.nome, rg: clienteResult.data.rg });

      const carroResult = await axios.get(`http://localhost:8080/api/carro/${contratoResult.data.carro_id}`);
      setCarro({ modelo: carroResult.data.modelo, placa: carroResult.data.placa });
    } catch (error) {
      console.error("Erro ao carregar contrato:", error);
      setErro("Erro de rede ou servidor.");
    }
  };

  // Função para gerar o PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    
    // Título
    doc.text("Relatório do Contrato", 20, 20);

    // Informações do Contrato
    doc.text(`ID do Contrato: ${contrato?.id}`, 20, 30);
    doc.text(`Cliente: ${cliente.nome || "Nome não encontrado"}`, 20, 40);
    doc.text(`RG do Cliente: ${cliente.rg || "RG não encontrado"}`, 20, 50);
    doc.text(`Data Início: ${contrato ? new Date(contrato.data_inicio).toLocaleDateString() : ''}`, 20, 60);
    doc.text(`Data Fim: ${contrato ? new Date(contrato.data_fim).toLocaleDateString() : ''}`, 20, 70);

    // Informações do Carro
    doc.text(`Modelo do Carro: ${carro.modelo || "Modelo não encontrado"}`, 20, 80);
    doc.text(`Placa do Carro: ${carro.placa || "Placa não encontrada"}`, 20, 90);

    // Valor Pago
    doc.text(`Valor Pago: R$ ${contrato ? contrato.valor_pago.toFixed(2) : ''}`, 20, 100);

    // Salvar o PDF
    doc.save(`relatorio_contrato_${contrato?.id}.pdf`);
  };

  return (
    <div className="container">
      <h1>Detalhes do Contrato</h1>

      {erro && <div className="alert alert-danger">{erro}</div>}

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
              <b>Cliente:</b> {cliente.nome || "Nome do cliente não encontrado"}
            </li>
            <li className="list-group-item">
              <b>RG do Cliente:</b> {cliente.rg || "RG do cliente não encontrado"}
            </li>
            <li className="list-group-item">
              <b>Data Início:</b> {new Date(contrato.data_inicio).toLocaleDateString()}
            </li>
            <li className="list-group-item">
              <b>Data Fim:</b> {new Date(contrato.data_fim).toLocaleDateString()}
            </li>
            <li className="list-group-item">
              <b>Carro Modelo:</b> {carro.modelo || "Modelo do carro não encontrado"}
            </li>
            <li className="list-group-item">
              <b>Placa do Carro:</b> {carro.placa || "Placa do carro não encontrada"}
            </li>
            <li className="list-group-item">
              <b>Valor Pago:</b> R$ {contrato.valor_pago.toFixed(2)}
            </li>
          </ul>
          <button className="btn btn-primary mt-3" onClick={generatePDF}>
            Gerar Relatório em PDF
          </button>
        </div>
      ) : (
        <p>Carregando contrato...</p>
      )}
    </div>
  );
}
