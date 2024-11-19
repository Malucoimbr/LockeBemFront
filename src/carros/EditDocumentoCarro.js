import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export default function EditDocumentoCarro() {
  let navigate = useNavigate();
  
  const [documento, setDocumento] = useState({
    anoFab: '',
    chassi: '',
    placa: '',
    modelo: '',
  });

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const onInputChange = (e) => {
    setDocumento({ ...documento, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {};
    Object.keys(documento).forEach(key => {
      if (documento[key]) {
        updatedData[key] = documento[key];
      }
    });

    try {
      await axios.put(`http://localhost:8080/api/documento-carro/${id}`, updatedData);
      navigate("/listdocumento");
    } catch (error) {
      console.error("Erro ao atualizar documento:", error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    loadDocumento();
  }, [id]);

  const loadDocumento = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/documento-carro/${id}`);
      setDocumento(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar documento:", error);
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
          <h2 className="text-center m-4">Editar Documento do Carro</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="anoFab" className="form-label">Ano de Fabricação</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o ano de fabricação" 
                name="anoFab" 
                value={documento.anoFab} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="chassi" className="form-label">Chassi</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o chassi" 
                name="chassi" 
                value={documento.chassi} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="placa" className="form-label">Placa</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite a placa" 
                name="placa" 
                value={documento.placa} 
                onChange={onInputChange} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="modelo" className="form-label">Modelo</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite o modelo" 
                name="modelo" 
                value={documento.modelo} 
                onChange={onInputChange} 
              />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button type="submit" className="btn btn-outline-primary">Atualizar</button>
              <Link className="btn btn-outline-danger" to="/listdocumento" style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: '10px',
                padding: '6px 12px',
                fontSize: '1rem'
              }}>
                <FaTimes style={{ marginRight: '8px', fontSize: '1.2rem' }} /> 
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
