import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DateSelector = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const navigate = useNavigate(); // Hook do react-router-dom para navegação

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data Início:", dataInicio);
    console.log("Data Final:", dataFinal);

    if (dataInicio && dataFinal) {
      // Verifica se as datas são válidas
      if (new Date(dataInicio) <= new Date(dataFinal)) {
        // Redireciona para a página de carros, passando as datas
        navigate("/car-list", { state: { dataInicio, dataFinal } });
      } else {
        alert("A data de início não pode ser maior que a data final.");
      }
    } else {
      alert("Por favor, selecione as duas datas.");
    }
  };

  return (
    <div>
      <h3>Selecione as datas</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data Início: </label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>
        <div>
          <label>Data Final: </label>
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
        <button type="submit">Selecionar</button>
      </form>
    </div>
  );
};

export default DateSelector;
