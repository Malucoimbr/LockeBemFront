import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";

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
  console.log("Data Início:", dataInicio, "Data Final:", dataFinal, "Dias de Aluguel:", diasCount);


  const valorTotalCalculado = carroDetalhado ? carroDetalhado.valorDiaria * diasCount : 0;
  console.log("Valor Total Calculado:", valorTotalCalculado);


  const confirmarContrato = async () => {
    try {
      
      const dadosContrato = {
        cliente_id: clienteId,  
        carro_id: carroDetalhado?.id, 
        data_inicio: dataInicio,  
        data_fim: dataFinal,  
        valor_pago: valorTotalCalculado,  
      };

      console.log("Enviando os dados para o contrato:", dadosContrato);

      const response = await axios.post(
        `http://localhost:8080/api/contrato-aluguel/confirmar-contrato`,
        dadosContrato,  
        {
          headers: {
            'Content-Type': 'application/json',  
          },
        }
      );

      console.log("Resposta da API:", response.data);
      alert("Contrato confirmado!");
      navigate("/contrato-confirmado");
    } catch (error) {
      console.error("Erro ao confirmar contrato", error);
      alert("Erro ao confirmar contrato. Tente novamente.");
    }
  };

  return (
    <div>
      <h3>Confirme o Contrato</h3>
      {clienteDetalhado && <p><strong>Cliente:</strong> {clienteDetalhado.nome}</p>}
      {carroDetalhado && (
        <>
          <p><strong>Carro:</strong> {carroDetalhado.modelo}</p>
          <p><strong>Valor diário:</strong> {carroDetalhado.valorDiaria}</p>
        </>
      )}
      <p><strong>Período de Aluguel:</strong> {diasCount} dias</p>
      <p><strong>Valor Total:</strong> {valorTotalCalculado.toFixed(2)}</p>
      <button onClick={confirmarContrato}>Confirmar Contrato</button>
    </div>
  );
};

export default ConfirmContract;
