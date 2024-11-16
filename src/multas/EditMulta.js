import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditMulta() {
  let navigate = useNavigate();
  
  const [multa, setMulta] = useState({
    dataMulta: "",
    tipoInfracao: "",
    valorMulta: "",
    contratoId: ""
  });

  const [loading, setLoading] = useState(true); 

  const { id } = useParams(); 
  
  const onInputChange = (e) => {
    setMulta({ ...multa, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(multa);  
    
    const updatedData = {};
    Object.keys(multa).forEach(key => {
      if (multa[key]) {
        updatedData[key] = multa[key];
      }
    });
  
    try {
      await axios.put(`http://localhost:8080/api/multa/${id}`, updatedData);
      navigate("/listmulta");
    } catch (error) {
      console.error("Erro ao atualizar multa:", error.response ? error.response.data : error);
    }
  };
  
  useEffect(() => {
    loadMulta();
  }, [id]);

  const loadMulta = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/multa/${id}`);
      console.log(result.data);  
      setMulta(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar multa:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Multa</h2>
          
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="dataMulta" className="form-label">Data da Multa</label>
              <input 
                type="date" 
                className="form-control" 
                placeholder="Digite a Data da Multa" 
                name="dataMulta" 
                value={multa.dataMulta} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoInfracao" className="form-label">Tipo de Infração</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o Tipo de Infração" 
                name="tipoInfracao" 
                value={multa.tipoInfracao} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="valorMulta" className="form-label">Valor da Multa</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o Valor da Multa" 
                name="valorMulta" 
                value={multa.valorMulta} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contratoId" className="form-label">ID do Contrato</label>
              <input 
                type="number" 
                className="form-control" 
                placeholder="Digite o ID do Contrato" 
                name="contratoId" 
                value={multa.contratoId} 
                onChange={onInputChange} 
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">Atualizar</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
