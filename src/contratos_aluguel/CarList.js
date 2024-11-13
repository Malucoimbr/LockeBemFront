import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import palio from '../imgs/palio.jpg'
import siena from '../imgs/siena.jpg'
import './CarList.css';  // Importe o arquivo CSS


const CarList = () => {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dataInicio, dataFinal } = state || {};

  // Mapeamento de modelos para imagens
  const carImages = {
    Siena: siena,
    Palio: palio,
    // Adicione outros modelos conforme necessário
  };

  const fetchCarrosDisponiveis = async () => {
    try {
      // Verifique se as datas foram fornecidas antes de fazer a requisição
      if (dataInicio && dataFinal) {
        const response = await axios.get(
          `http://localhost:8080/api/carro/carros-disponiveis`,
          {
            params: {
              data_inicio: dataInicio,
              data_fim: dataFinal,
            }
          }
        );
        setCarros(response.data);
      } else {
        console.log("Datas não fornecidas corretamente");
      }
    } catch (error) {
      console.error("Erro ao buscar carros", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarrosDisponiveis();
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
      ) : (
        <div className="row">
          {carros.map((carro) => {
            // Verificando a imagem baseada no modelo do carro
            const carImageUrl = carImages[carro.modelo] || "https://via.placeholder.com/300"; // Caso o modelo não tenha imagem específica
            return (
              <div key={carro.id} className="col-sm-6 col-md-4 mb-4">
                <div className="card">
                  <img
                    src={carImageUrl}
                    className="card-img-top"
                    alt={carro.modelo}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{carro.modelo}</h5>
                    <p className="card-text">
                      {carro.tipo_carro || "Sem descrição disponível."}
                    </p>
                    <p className="card-text">
                      <strong>{carro.valorDiaria} / dia</strong>
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
