import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import './ConfirmContract.css'; // Importando o CSS estilizado

const ConfirmContract = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const { carro, dataInicio, dataFinal, clienteId } = state || {}; 
  const [carroDetalhado, setCarroDetalhado] = useState(null);
  const [clienteDetalhado, setClienteDetalhado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const fetchCarroDetalhado = async () => {
    if (carro) {
      try {
        const response = await axios.get(`http://localhost:8080/api/carro/${carro.id}`); 
        setCarroDetalhado(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do carro:", error);
      }
    }
  };

  const fetchClienteDetalhado = async () => {
    if (clienteId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/cliente/${clienteId}`); 
        setClienteDetalhado(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error);
      }
    }
  };

  useEffect(() => {
    fetchCarroDetalhado();
    fetchClienteDetalhado();
  }, [carro, clienteId]); 

  const diasCount = (dataInicio && dataFinal) 
    ? Math.floor((new Date(dataFinal) - new Date(dataInicio)) / (1000 * 3600 * 24)) 
    : 0;  

  const valorTotalCalculado = carroDetalhado ? carroDetalhado.valorDiaria * diasCount : 0;

  const confirmarContrato = async () => {
    try {
      const dadosContrato = {
        cliente_id: clienteId,  
        carro_id: carroDetalhado?.id, 
        data_inicio: dataInicio,  
        data_fim: dataFinal,  
        valor_pago: valorTotalCalculado,  
      };

      const response = await axios.post(
        `http://localhost:8080/api/contrato-aluguel/confirmar-contrato`,
        dadosContrato,  
        {
          headers: {
            'Content-Type': 'application/json',  
          },
        }
      );

      alert("Contrato confirmado!");
      navigate("/contrato-confirmado");
    } catch (error) {
      console.error("Erro ao confirmar contrato", error);
      alert("Erro ao confirmar contrato. Tente novamente.");
    }
  };

  return (
    <div className="contract-container">
      <h3 className="title">Confirme o Contrato</h3>
      <div className="card">
        {clienteDetalhado && (
          <div className="detail-item">
            <span className="label">Cliente:</span>
            <span>{clienteDetalhado.nome}</span>
          </div>
        )}
        {carroDetalhado && (
          <>
            <div className="detail-item">
              <span className="label">Carro:</span>
              <span>{carroDetalhado.modelo}</span>
            </div>
            <div className="detail-item">
              <span className="label">Valor diário:</span>
              <span>R$ {carroDetalhado.valorDiaria}</span>
            </div>
          </>
        )}
        <div className="detail-item">
          <span className="label">Período de Aluguel:</span>
          <span>{diasCount} dias</span>
        </div>
        <div className="detail-item">
          <span className="label">Valor Total:</span>
          <span>R$ {valorTotalCalculado.toFixed(2)}</span>
        </div>
      </div>
      <button className="confirm-button" onClick={confirmarContrato}>
        Confirmar Contrato
      </button>
    </div>
  );
};

export default ConfirmContract;
