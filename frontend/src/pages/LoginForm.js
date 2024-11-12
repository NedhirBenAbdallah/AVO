import React, { useState, useEffect } from "react";
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');

    if (token) {
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/track');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('token', data.token, { expires: 0.5 });
        Cookies.set('role', data.role, { expires: 0.5 });
        navigate(data.role === 'admin' ? '/admin/dashboard' : '/user/track');
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="bg-image"></div>
      
      <div className="min-vh-100 d-flex align-items-center justify-content-center login-container">
        <div className="card glass-card border-0 shadow-lg">
          <div className="card-header bg-transparent border-0 text-center pt-4">
            <img 
              src={`${process.env.PUBLIC_URL}/logo-avocarbon-1.png`} 
              alt="Logo" 
              className="logo img-fluid mb-4" 
            />
          </div>

          <div className="card-body px-4 py-6">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
                <button type="button" className="btn-close" onClick={() => setError("")}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-4">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="login"
                  placeholder="Enter username"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
                <label htmlFor="login">Username</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control bg-light"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;