import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

export default function EditSeguro() {
  let navigate = useNavigate();
  const { id } = useParams();  // Obtém o ID da URL

  const [seguro, setSeguro] = useState({
    id: '',   // Adiciona id no estado
    cobertura: "",
  });

  const [loading, setLoading] = useState(true);

  const onInputChange = (e) => {
    setSeguro({ ...seguro, [e.target.name]: e.target.value });  // Atualiza o campo correto
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Atualiza no backend com o ID e a cobertura
      await axios.put(`http://localhost:8080/api/seguro/seguro/${id}`, seguro);  
      navigate("/listseguro");  // Redireciona para a lista
    } catch (error) {
      console.error("Erro ao atualizar seguro:", error.response ? error.response.data : error);
    }
  };

  useEffect(() => {
    loadSeguro();  // Carrega o seguro quando o componente for montado
  }, [id]);

  const loadSeguro = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/seguro/${id}`);
      setSeguro(result.data);  // Preenche os dados do seguro
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar seguro:", error);
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
          <h2 className="text-center m-4">Editar Seguro</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="cobertura" className="form-label">Cobertura</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Digite a cobertura" 
                name="cobertura" 
                value={seguro.cobertura} 
                onChange={onInputChange} 
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-outline-primary">Atualizar</button>
            <Link className="btn btn-outline-danger d-flex align-items-center" to="/listseguro" style={{
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
