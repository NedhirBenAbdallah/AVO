import React, { useState, useEffect } from "react";
import './Track.css';
import SideBar from "../components/sideBar";

const Track = () => {
  const [date_start, setDateStart] = useState("");
  const [ligne_id, setLigneId] = useState("");
  const [qt, setQt] = useState("");
  const [h_paye, setHPaye] = useState("");
  const [capacity, setCapacity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [lignes, setLignes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLignes();
  }, []);

  const fetchLignes = async () => {
    try {
      const response = await fetch('http://localhost:5000/ligne/');
      const data = await response.json();
      setLignes(data);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("Failed to load production lines");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/track/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date_start,
          ligne_id,
          qt,
          h_paye,
          capacity
        }),
      });

      if (response.ok) {
        setSuccessMessage("Track data submitted successfully!");
        setShowPopup(true);
        resetForm();
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to submit track data");
      }
    } catch (error) {
      setErrorMessage("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (!date_start || !ligne_id || !qt || !h_paye || !capacity) {
      setErrorMessage("Please fill all required fields");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setDateStart("");
    setLigneId("");
    setQt("");
    setHPaye("");
    setCapacity("");
    setErrorMessage("");
  };

  return (
    <div className="track-page bg-light min-vh-100">
    <div className="row g-0">
      <div className="col-auto">
        <SideBar />
      </div>
      <div className="col px-3 py-4">
        <div className="container">
          <div className="row justify-content-center"> {/* Center content */}
            <div className="col-12 col-lg-8 col-xl-6"> {/* Adjust responsive widths */}
              <div className="card shadow-sm border-0 mx-auto"> {/* Add mx-auto */}
                <div className="card-header bg-primary text-white p-4 text-center"> {/* Center header text */}
                  <h3 className="card-title mb-0">
                    <i className="bi bi-clipboard-data me-2"></i>
                    Track Form
                  </h3>
                </div>
                <div className="card-body p-4">
                  {showPopup && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      <i className="bi bi-check-circle me-2"></i>
                      {successMessage}
                      <button type="button" className="btn-close" onClick={() => setShowPopup(false)}></button>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {errorMessage}
                      <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
                    </div>
                    )}

                    {errorMessage && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {errorMessage}
                        <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">Date</label>
                          <input
                            type="date"
                            className="form-control form-control-lg"
                            value={date_start}
                            onChange={(e) => setDateStart(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label">Production Line</label>
                          <select
                            className="form-select form-select-lg"
                            value={ligne_id}
                            onChange={(e) => setLigneId(e.target.value)}
                            required
                          >
                            <option value="">Select a production line</option>
                            {lignes.map(ligne => (
                              <option key={ligne.id} value={ligne.id}>
                                {ligne.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">Quantity</label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            value={qt}
                            onChange={(e) => setQt(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">Hours Paid</label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            value={h_paye}
                            onChange={(e) => setHPaye(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">Capacity</label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="d-grid gap-2 mt-4">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-lg me-2"></i>
                              Submit Track Data
                            </>
                          )}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-outline-secondary btn-lg"
                          onClick={resetForm}
                        >
                          <i className="bi bi-x-lg me-2"></i>
                          Clear Form
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

export default Track;