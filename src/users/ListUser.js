// users/ListUser.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4"></div>
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">rg</th>
            <th scope="col">cidade</th>
            <th scope="col">bairro</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rg}</td>
              <td>{user.city}</td>
              <td>{user.neighborhood}</td>
              <td>
                <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
