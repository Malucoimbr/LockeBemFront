import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ClientSelector = () => {
  const [clienteId, setClienteId] = useState(""); // Armazenar o ID do cliente
  const navigate = useNavigate();
  const { state } = useLocation(); // Captura o estado passado da tela anterior
  const { dataInicio, dataFinal, carro } = state || {}; // Recebe as datas e o carro

  const handleSelectCliente = () => {
    if (clienteId) {
      // Navegar para a tela de contrato passando clienteId, datas e carro
      navigate("/confirmcontract", {
        state: {
          clienteId,  // Passando o clienteId
          dataInicio, // Passando a data de início
          dataFinal,  // Passando a data final
          carro,      // Passando o carro selecionado
        },
      });
    } else {
      alert("Selecione um cliente!");
    }
  };

  return (
    <div>
      <h3>Selecione o Cliente</h3>
      <input
        type="text"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value)}
        placeholder="Digite o ID do Cliente"
      />
      <button onClick={handleSelectCliente}>Selecionar Cliente</button>
    </div>
  );
};

export default ClientSelector;
