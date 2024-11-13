import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Se não estiver importado

const DateSelector = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [error, setError] = useState(""); // Para armazenar erros

  const navigate = useNavigate(); // Hook do react-router-dom para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Limpa os erros antes de verificar novamente

    if (dataInicio && dataFinal) {
      // Verifica se as datas são válidas
      if (new Date(dataInicio) <= new Date(dataFinal)) {
        // Redireciona para a página de carros, passando as datas
        navigate("/car-list", { state: { dataInicio, dataFinal } });
      } else {
        setError("A data de início não pode ser maior que a data final.");
      }
    } else {
      setError("Por favor, selecione as duas datas.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="text-center mb-4">Selecione as datas</h3>
          
          {/* Exibe erros se houver */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
            <div className="mb-3">
              <label htmlFor="dataInicio" className="form-label">Data Início</label>
              <input
                type="date"
                id="dataInicio"
                className="form-control"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dataFinal" className="form-label">Data Final</label>
              <input
                type="date"
                id="dataFinal"
                className="form-control"
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">Selecionar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
