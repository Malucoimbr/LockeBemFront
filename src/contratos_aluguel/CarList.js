import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './CarList.css';

import fuscaImage from '../imgs/fusca.jpg';
import palioImage from '../imgs/palio.jpg';
import sienaImage from '../imgs/siena.jpg';
import golImage from '../imgs/gol.jpg';
import unoImage from '../imgs/uno.jpg';
import civicImage from '../imgs/civic.png';
import hb20Image from '../imgs/hb20.jpg';
import onixImage from '../imgs/onix.png';
import kwidImage from '../imgs/kwid.png';

const CarList = () => {
  const location = useLocation();
  const [carros, setCarros] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { dataInicio, dataFinal } = location.state || {};

  // Mapeamento de carros para imagens
  const carImages = {
    "Fusca": fuscaImage,
    "Palio": palioImage,
    "Siena": sienaImage,
    "Gol": golImage,
    "Uno": unoImage,
    "Civic": civicImage,
    "HB20": hb20Image,
    "Onix": onixImage,
    "Kwid": kwidImage,
  };

  const fetchCarrosDisponiveis = async () => {
    try {
      if (dataInicio && dataFinal) {
        const startDate = new Date(dataInicio);
        const endDate = new Date(dataFinal);

        if (startDate <= endDate) {
          const carrosResponse = await axios.get(`http://localhost:8080/api/carro`, {
            params: {
              dataInicio: dataInicio,
              dataFim: dataFinal,
            }
          });
          setCarros(carrosResponse.data);

          const documentosResponse = await axios.get('http://localhost:8080/api/documento-carro');
          setDocumentos(documentosResponse.data);

          const contratosResponse = await axios.get('http://localhost:8080/api/contrato-aluguel', {
            params: {
              dataInicio: dataInicio,
              dataFim: dataFinal,
            }
          });
          setContratos(contratosResponse.data);

        } else {
          console.log("A data de início não pode ser maior que a data final.");
        }
      } else {
        console.log("Datas não fornecidas corretamente");
      }
    } catch (error) {
      console.error("Erro ao buscar carros, documentos e contratos", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataInicio && dataFinal) {
      fetchCarrosDisponiveis();
    }
  }, [dataInicio, dataFinal]);

  const getDocumentoByCarroId = (carroId) => {
    const documento = documentos.find((doc) => doc.id === carroId);
    return documento || {};
  };

  const isCarroDisponivel = (carroId) => {
    const contrato = contratos.find(
      (contrato) =>
        contrato.carroId === carroId &&
        ((new Date(contrato.dataInicio) <= new Date(dataFinal) && new Date(contrato.dataFinal) >= new Date(dataInicio)) ||
         (new Date(contrato.dataInicio) >= new Date(dataInicio) && new Date(contrato.dataInicio) <= new Date(dataFinal)) ||
         (new Date(contrato.dataFinal) >= new Date(dataInicio) && new Date(contrato.dataFinal) <= new Date(dataFinal)))
    );
    return !contrato;
  };

  const carrosDisponiveis = carros.filter((carro) => isCarroDisponivel(carro.id));

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
          {carrosDisponiveis.length === 0 ? (
            <div className="alert alert-info text-center w-100">
              Nenhum carro disponível para o período selecionado.
            </div>
          ) : (
            carrosDisponiveis.map((carro) => {
              const documento = getDocumentoByCarroId(carro.id);
              const carImage = carImages[documento.modelo] || "default_car.png";
              return (
                <div key={carro.id} className="col-sm-6 col-md-4 mb-4">
                  <div className="card shadow-sm">
                    <img
                      src={`${carImage}`}
                      alt={documento.modelo}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{documento.modelo || "Modelo Indisponível"}</h5>
                      <p className="card-text"><strong>Placa:</strong> {documento.placa || "Não disponível"}</p>
                      <p className="card-text"><strong>KM:</strong> {carro.km || "Não informado"}</p>
                      <p className="card-text"><strong>Valor Diária:</strong> {carro.valorDiaria ? `R$ ${carro.valorDiaria} / dia` : "Preço não informado"}</p>
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
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CarList;
