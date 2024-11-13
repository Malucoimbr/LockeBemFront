// CarList.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importando o useLocation
import axios from "axios";

const CarList = () => {
  const [carros, setCarros] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation(); // Capturando o estado passado pela navegação anterior
  const { dataInicio, dataFinal } = state || {}; // Pegando as datas e o clienteId do estado

  const fetchCarrosDisponiveis = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/carro/carros-disponiveis`
      );
      console.log("Resposta da API:", response.data);
      setCarros(response.data);
    } catch (error) {
      console.error("Erro ao buscar carros", error);
    }
  };

  useEffect(() => {
    fetchCarrosDisponiveis();
  }, []);

  const handleCarroSelecionado = (carro) => {
    navigate("/clienteselector", {
      state: { 
        carro, 
        dataInicio, 
        dataFinal, // Passando clienteId para a próxima página
      },
    });
  };

  return (
    <div>
      <h3>Carros Disponíveis</h3>
      <ul>
        {carros.map((carro) => (
          <li key={carro.id}>
            {carro.modelo} - {carro.valorDiaria} / dia
            <button onClick={() => handleCarroSelecionado(carro)}>
              Selecionar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
