import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './ClienteSelector.css'; 

const ClientSelector = () => {
  const [clienteId, setClienteId] = useState(""); 
  const [rg, setRg] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const { dataInicio, dataFinal, carro } = state || {}; 

  const handleSelectCliente = async () => {
    if (rg || clienteId) {
      setIsLoading(true);
      setError(""); 

      try {
        const existsResponse = await axios.get(
          `http://localhost:8080/api/cliente/idByRg/${rg}`
        );

        if (existsResponse.status === 200) {
          setClienteId(existsResponse.data); 
          navigate("/confirmcontract", {
            state: {
              clienteId: existsResponse.data, 
              rg,                           
              dataInicio,                   
              dataFinal,                    
              carro,                        
            },
          });
        } else {
          setError(existsResponse.data);  
        }
      } catch (err) {
        setError("Erro ao buscar cliente. Tente novamente.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Selecione um cliente!");
    }
  };

  return (
    <div className="client-selector-container">
      <h3>Selecione o Cliente</h3>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          placeholder="Digite o RG do Cliente"
        />
      </div>
      {isLoading && <p className="loading-text">Carregando...</p>}
      {error && <p className="error-text">{error}</p>}
      <button className="select-button" onClick={handleSelectCliente}>
        Selecionar Cliente
      </button>
    </div>
  );
};

export default ClientSelector;
