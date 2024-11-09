import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    neighborhood: "",
    city: "",
    rg: "",
    street: "",
  });

  const { name, email, neighborhood, city, rg, street } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/users/${id}`, user); 
    navigate("/listusers"); 
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/${id}`); 
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your name" 
                name="name" 
                value={name} 
                onChange={(e) => onInputChange(e)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your email" 
                name="email" 
                value={email} 
                onChange={(e) => onInputChange(e)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="neighborhood" className="form-label">Bairro</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your neighborhood" 
                name="neighborhood" 
                value={neighborhood} 
                onChange={(e) => onInputChange(e)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">Cidade</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your city" 
                name="city" 
                value={city} 
                onChange={(e) => onInputChange(e)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="rg" className="form-label">RG</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your RG" 
                name="rg" 
                value={rg} 
                onChange={(e) => onInputChange(e)} 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="street" className="form-label">Rua</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter your street" 
                name="street" 
                value={street} 
                onChange={(e) => onInputChange(e)} 
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
