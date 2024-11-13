import React, { useState } from "react";
import DateSelector from "./components/DateSelector";
import CarList from "./components/CarList";
import ConfirmContract from "./components/ConfirmContract";

const Contratos = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [carroSelecionado, setCarroSelecionado] = useState(null);

  const handleSelectDates = (dataInicio, dataFinal) => {
    setDataInicio(dataInicio);
    setDataFinal(dataFinal);
  };

  const handleCarSelected = (carro) => {
    setCarroSelecionado(carro);
  };

  return (
    <div>
      <h1>Contratação de Aluguel de Carro</h1>
      {!dataInicio || !dataFinal ? (
        <DateSelector onSelectDates={handleSelectDates} />
      ) : !carroSelecionado ? (
        <CarList dataInicio={dataInicio} dataFinal={dataFinal} onCarSelected={handleCarSelected} />
      ) : (
        <ConfirmContract carro={carroSelecionado} dataInicio={dataInicio} dataFinal={dataFinal} />
      )}
    </div>
  );
};

export default Contratos;
