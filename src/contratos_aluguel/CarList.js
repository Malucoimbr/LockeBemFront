import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './CarList.css';  // Importe o arquivo CSS

const CarList = () => {
  const location = useLocation();
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dataInicio, dataFinal } = location.state || {};

  const fetchCarrosDisponiveis = async () => {
    try {
      if (dataInicio && dataFinal) {
        const startDate = new Date(dataInicio);
        const endDate = new Date(dataFinal);
  
        if (startDate <= endDate) {
          const response = await axios.get(
            `http://localhost:8080/api/carro`,
            {
              params: {
                data_inicio: dataInicio,
                data_fim: dataFinal,
              }
            }
          );
          console.log(response.data);  // Verifique os dados recebidos
          setCarros(response.data);
        } else {
          console.log("A data de início não pode ser maior que a data final.");
        }
      } else {
        console.log("Datas não fornecidas corretamente");
      }
    } catch (error) {
      console.error("Erro ao buscar carros", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataInicio && dataFinal) {
      fetchCarrosDisponiveis();
    }
  }, [dataInicio, dataFinal]);

  const handleCarroSelecionado = (carro) => {
    navigate("/clienteselector", {
      state: {
        carro,
        dataInicio,
        dataFinal,
      },
    });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Carros Disponíveis</h3>

      {/* Feedback de carregamento */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row">
          {carros.map((carro) => {
            return (
              <div key={carro.id} className="col-sm-6 col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    {/* Exibindo apenas o km, valorDiaria e id */}
                    <h5 className="card-title">ID: {carro.id}</h5>
                    <p className="card-text">
                      <strong>KM:</strong> {carro.km || "Sem informação de KM"}
                    </p>
                    <p className="card-text">
                      <strong>Valor Diária:</strong> {carro.valorDiaria || "Sem preço disponível"} / dia
                    </p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleCarroSelecionado(carro)}
                    >
                      Selecionar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarList;
