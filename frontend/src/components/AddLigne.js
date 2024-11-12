import React, { useState, useEffect } from 'react';
import './AddLigne.css';
import SideBar from "../components/sideBar";

const AddLigne = () => {
  const [title, setTitle] = useState('');
  const [h1000, setH1000] = useState('');
  const [cadence, setCadence] = useState('');
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editH1000, setEditH1000] = useState('');
  const [editCadence, setEditCadence] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/ligne/');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      showMessage('error', 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/ligne/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, h1000, cadence }),
      });
      const data = await response.json();
      setItems([...items, data]);
      resetForm();
      showMessage('success', 'Line added successfully');
    } catch (error) {
      showMessage('error', 'Failed to add line');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this line?')) return;
    
    try {
      await fetch(`http://localhost:5000/ligne/${id}`, { method: 'DELETE' });
      setItems(items.filter(item => item.id !== id));
      showMessage('success', 'Line deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete line');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/ligne/${editItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, h1000: editH1000, cadence: editCadence }),
      });
      const data = await response.json();
      setItems(items.map(item => item.id === editItemId ? data : item));
      resetEditForm();
      showMessage('success', 'Line updated successfully');
    } catch (error) {
      showMessage('error', 'Failed to update line');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setH1000('');
    setCadence('');
  };

  const resetEditForm = () => {
    setEditItemId(null);
    setEditTitle('');
    setEditH1000('');
    setEditCadence('');
  };

  return (
    <div className="user ">
      <div className="main-content row">
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="main-body col-md-7">
          <div className="container">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-primary text-white p-3">
                <h3 className="card-title mb-0">
                  <i className="bi bi-diagram-3 me-2"></i>
                  Production Lines Management
                </h3>
              </div>
              <div className="card-body p-4">
                {message.text && (
                  <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`}>
                    <i className={`bi bi-${message.type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2`}></i>
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })}></button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="row g-3 mb-4">
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="titleInput"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <label htmlFor="titleInput">Title</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="h1000Input"
                        placeholder="Enter H1000"
                        value={h1000}
                        onChange={(e) => setH1000(e.target.value)}
                        required
                      />
                      <label htmlFor="h1000Input">H1000</label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="cadenceInput"
                        placeholder="Enter cadence"
                        value={cadence}
                        onChange={(e) => setCadence(e.target.value)}
                        required
                      />
                      <label htmlFor="cadenceInput">Cadence</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Adding...</>
                      ) : (
                        <><i className="bi bi-plus-lg me-2"></i>Add Line</>
                      )}
                    </button>
                  </div>
                </form>

                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>H1000</th>
                        <th>Cadence</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.id} className="align-middle">
                          {editItemId === item.id ? (
                            <td colSpan="4">
                              <form onSubmit={handleUpdate} className="row g-3">
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={editH1000}
                                    onChange={(e) => setEditH1000(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    value={editCadence}
                                    onChange={(e) => setEditCadence(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="col-md-3">
                                  <button type="submit" className="btn btn-success me-2">
                                    <i className="bi bi-check-lg"></i>
                                  </button>
                                  <button type="button" className="btn btn-secondary" onClick={resetEditForm}>
                                    <i className="bi bi-x-lg"></i>
                                  </button>
                                </div>
                              </form>
                            </td>
                          ) : (
                            <>
                              <td>{item.title}</td>
                              <td>{item.h1000}</td>
                              <td>{item.cadence}</td>
                              <td>
                                <button
                                  className="btn btn-outline-primary btn-sm me-2"
                                  onClick={() => {
                                    setEditItemId(item.id);
                                    setEditTitle(item.title);
                                    setEditH1000(item.h1000);
                                    setEditCadence(item.cadence);
                                  }}
                                >
                                  <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLigne;