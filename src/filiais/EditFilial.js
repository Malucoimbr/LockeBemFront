import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function EditFilial() {
  const navigate = useNavigate();
  const { id } = useParams();  // Obtém o 'id' da URL

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
  }, [id]);

  const loadFilial = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/filiais/${id}`);
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
      const response = await axios.put(`http://localhost:8080/api/filiais/${id}`, filial, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      navigate('/listfilial');
    } catch (error) {
      console.error('Erro ao atualizar filial!', error);
      alert('Erro ao atualizar a filial. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Filial</h2>

          <form onSubmit={onSubmit}>
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
              <label className="form-label">Código da Filial</label>
              <input
                type="text"
                className="form-control"
                name="codigoFilial"
                value={filial.codigoFilial}
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
            <button type="submit" className="btn btn-outline-primary">Atualizar</button>
            <Link className="btn btn-outline-danger mx-2" to="/listfilial">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
