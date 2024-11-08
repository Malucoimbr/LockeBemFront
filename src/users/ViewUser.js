import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    neighborhood: "",
    city: "",
    rg: "",
    street: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id:
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nome:</b> {user.name}
                </li>

                <li className="list-group-item">
                  <b>Email:</b> {user.email}
                </li>

                <li className="list-group-item">
                  <b>Bairro:</b> {user.neighborhood}
                </li>

                <li className="list-group-item">
                  <b>Cidade:</b> {user.city}
                </li>

                <li className="list-group-item">
                  <b>RG:</b> {user.rg}
                </li>

                <li className="list-group-item">
                  <b>Rua:</b> {user.street}
                </li>
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2" to={"/"}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
