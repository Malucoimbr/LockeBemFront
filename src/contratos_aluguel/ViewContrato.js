import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function ViewContrato() {
  const [contrato, setContrato] = useState(null);
  const [cliente, setCliente] = useState({ nome: '', rg: '' });
  const [erro, setErro] = useState('');
  const { id } = useParams();

  useEffect(() => {
    loadContrato();
  }, [id]);

  // Função para carregar o contrato
  const loadContrato = async () => {
    try {
      const contratoResult = await axios.get(`http://localhost:8080/api/contrato-aluguel/${id}`);
      console.log('Contrato:', contratoResult.data); // Verifique o retorno do contrato
      setContrato(contratoResult.data);

      // Após carregar o contrato, carregar os dados do cliente
      const clienteResult = await axios.get(`http://localhost:8080/api/cliente/${contratoResult.data.clienteId}`);
      console.log('Cliente:', clienteResult.data); // Verifique o retorno do cliente
      setCliente(clienteResult.data);

    } catch (error) {
      console.error("Erro ao carregar contrato ou cliente:", error);
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
    doc.text(`ID do Cliente: ${cliente?.nome}`, 20, 40);  // Nome do Cliente
    doc.text(`RG do Cliente: ${cliente?.rg}`, 20, 50);  // RG do Cliente
    doc.text(`Data Início: ${new Date(contrato?.dataInicio).toLocaleDateString()}`, 20, 60);
    doc.text(`Data Fim: ${new Date(contrato?.dataFim).toLocaleDateString()}`, 20, 70);
    doc.text(`Funcionario Id: ${contrato?.funcionarioId}`, 20, 80);
    doc.text(`Carro Id: ${contrato?.carroId}`, 20, 90);
    doc.text(`Seguro Id: ${contrato?.seguroId}`, 20, 100);

    // Informações de pagamento
    doc.text(`Valor Pago: R$ ${contrato?.valorPago ? contrato.valorPago.toFixed(2) : '0.00'}`, 20, 110);

    // Salvar o PDF
    doc.save(`relatorio_contrato_${contrato?.id}.pdf`);
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {contrato ? (
        <div className="card shadow-lg p-4 mb-4">
          <div className="card-header" style={{
            width: '100%',
            color: 'black',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            borderRadius: '5px 5px 0 0',
            padding: '15px',
            height: 'auto',
            lineHeight: '1.5'
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
                <strong>Nome do Cliente:</strong>
                <p>{cliente.nome}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>RG do Cliente:</strong>
                <p>{cliente.rg}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Data Início:</strong>
                <p>{contrato.dataInicio}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Data Fim:</strong>
                <p>{contrato.dataFim}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Id do carro:</strong>
                <p>{contrato.carroId}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Valor Pago:</strong>
                <p>R$ {contrato.valorPago}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Id do Funcionario:</strong>
                <p>{contrato.funcionarioId}</p>
              </div>
              <div className="col-md-6 mb-3">
                <strong>Id do Seguro:</strong>
                <p>{contrato.seguroId}</p>
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
