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
    <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
  
  
    {erro && <div className="alert alert-danger">{erro}</div>}
  
    {contrato ? (
      <div className="card shadow-lg p-4 mb-4">
        <div className="card-header" style={{
          width: '100%',
          color: 'black', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          textAlign: 'center',
          borderRadius: '5px 5px 0 0', // Canto arredondado
          padding: '15px', // Aumentando o padding para tornar o cabeçalho mais espaçoso
          height: 'auto', // Ajustando a altura do cabeçalho
          lineHeight: '1.5' // Ajuste para manter o texto centralizado verticalmente
        }}>
          Detalhes do Contrato
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>ID do Contrato:</strong>
              <p>{contrato.id}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Cliente:</strong>
              <p>{cliente.nome || "Nome do cliente não encontrado"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>RG do Cliente:</strong>
              <p>{cliente.rg || "RG do cliente não encontrado"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Data Início:</strong>
              <p>{new Date(contrato.data_inicio).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Data Fim:</strong>
              <p>{new Date(contrato.data_fim).toLocaleDateString()}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Modelo do Carro:</strong>
              <p>{carro.modelo || "Modelo do carro não encontrado"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Placa do Carro:</strong>
              <p>{carro.placa || "Placa do carro não encontrada"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Valor Pago:</strong>
              <p>R$ {contrato.valor_pago.toFixed(2)}</p>
            </div>
          </div>
  
          {/* Botão centralizado com estilo melhorado */}
          <div className="d-flex justify-content-center mt-4">
            <button 
              className="btn btn-success"
              onClick={generatePDF}
              style={{
                backgroundColor: '#28a745', 
                borderColor: '#218838', 
                padding: '10px 20px', 
                fontSize: '1rem',
                borderRadius: '5px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
            >
              Gerar Relatório em PDF
            </button>
          </div>
        </div>
      </div>
    ) : (
      <p>Carregando contrato...</p>
    )}
  </div>
  

  
  );
}
