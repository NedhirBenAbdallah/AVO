// frontend/src/pages/AddUser.js
import React, { useState } from 'react';
import './AddUser.css';
import SideBar from "../components/sideBar"; // Ensure the correct casing for import


const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User added successfully');
      } else {
        alert('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="user min-vh-100 bg-light">
      <div className="main-content row g-0">
        <div className="col-auto">
          <SideBar />
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <div className="container py-5">
            <div className="row justify-content-center m-auto">
              <div className="col-12 col-md-8 col-lg-6">
                <div className="card shadow-lg border-0">
                  <div className="card-header bg-primary text-white p-4 text-center">
                    <h3 className="card-title mb-0">
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Add New User
                    </h3>
                  </div>
                  <div className="card-body p-4">
                    <form onSubmit={handleAddUser} className="form">
                      <div className="mb-4">
                        <div className="form-floating">
                          <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control form-control-lg"
                            placeholder="Username"
                            required 
                          />
                          <label htmlFor="username">
                            <i className="bi bi-person me-2"></i>
                            Username
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="form-floating">
                          <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control form-control-lg"
                            placeholder="Password"
                            required 
                          />
                          <label htmlFor="password">
                            <i className="bi bi-lock me-2"></i>
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="form-floating">
                          <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="form-control form-control-lg" 
                            id="role"
                            required
                          >
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                          <label htmlFor="role">
                            <i className="bi bi-shield me-2"></i>
                            Role
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg">
                          <i className="bi bi-plus-circle me-2"></i>
                          Add User
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default AddUser;