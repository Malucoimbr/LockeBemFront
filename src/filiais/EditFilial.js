import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

export default function EditFilial() {
  const navigate = useNavigate();
  const { codigoFilial } = useParams();  // Obtém o 'codigoFilial' da URL

  const [filial, setFilial] = useState({
    nome: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: '',
    telefone: '',
    codigoFilial: '',
    cnpj: ''
  });

  useEffect(() => {
    loadFilial();
  }, [codigoFilial]);

  const loadFilial = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/filial/${codigoFilial}`);
      setFilial(result.data);
    } catch (error) {
      console.error('Erro ao carregar os dados da filial.', error);
    }
  };

  const onInputChange = (e) => {
    setFilial({ ...filial, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/filial/${codigoFilial}`, filial);
      navigate("/listfilial");
    } catch (error) {
      console.error('Erro ao atualizar a filial!', error);
      alert('Erro ao atualizar a filial. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Filial</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Código da Filial</label>
              <input
                type="text"
                className="form-control"
                name="codigoFilial"
                value={filial.id}
                onChange={onInputChange}
                readOnly  
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={filial.nome}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Rua</label>
              <input
                type="text"
                className="form-control"
                name="rua"
                value={filial.rua}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Número</label>
              <input
                type="text"
                className="form-control"
                name="numero"
                value={filial.numero}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cidade</label>
              <input
                type="text"
                className="form-control"
                name="cidade"
                value={filial.cidade}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <input
                type="text"
                className="form-control"
                name="estado"
                value={filial.estado}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                className="form-control"
                name="telefone"
                value={filial.telefone}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">CNPJ</label>
              <input
                type="text"
                className="form-control"
                name="cnpj"
                value={filial.cnpj}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-outline-primary">Atualizar</button>
            <Link className="btn btn-outline-danger mx-2" to="/listfilial" style={{
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
