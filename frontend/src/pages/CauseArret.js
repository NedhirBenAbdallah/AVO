import React, { useState, useEffect } from "react";
import './CauseArret.css';
import SideBar from "../components/sideBar";

const CauseArret = () => {
  const [dateCause, setDateCause] = useState("");
  const [cause, setCause] = useState("");
  const [statusLigne, setStatusLigne] = useState("");
  const [service, setService] = useState("");
  const [minutesArret, setMinutesArret] = useState("");
  const [lignes, setLignes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLignes();
  }, []);

  const fetchLignes = async () => {
    try {
      const response = await fetch('http://localhost:5000/ligne/');
      const data = await response.json();
      setLignes(data);
    } catch (error) {
      setErrorMessage("Failed to load production lines");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/CauseArret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date_cause: dateCause,
          cause,
          statusLigne,
          service,
          minutesArret
        }),
      });

      if (response.ok) {
        setSuccessMessage("Cause d'arrêt submitted successfully!");
        resetForm();
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to submit");
      }
    } catch (error) {
      setErrorMessage("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!dateCause || !cause || !statusLigne || !service || !minutesArret) {
      setErrorMessage("Please fill all required fields");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setDateCause("");
    setCause("");
    setStatusLigne("");
    setService("");
    setMinutesArret("");
    setErrorMessage("");
  };

  return (
    <div className="causearret-page bg-light min-vh-100">
      <div className="row g-0">
        <div className="col-auto">
          <SideBar />
          </div>
    <div className="col px-3 py-4">
      <div className="container">
        <div className="row justify-content-center"> {/* Center the row */}
          <div className="col-12 col-lg-8 col-xl-6"> {/* Responsive width */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white p-4 text-center"> {/* Center header */}
                <h3 className="card-title mb-0">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Cause d'Arrêt Form
                </h3>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit} className="needs-validation mx-auto" noValidate> {/* Center form */}
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating text-center"> 
                            <input
                              type="date"
                              className="form-control form-control-lg"
                              id="dateInput"
                              value={dateCause}
                              onChange={(e) => setDateCause(e.target.value)}
                              required
                            />
                            <label htmlFor="dateInput">Date</label>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating">
                            <textarea
                              className="form-control"
                              id="causeInput"
                              value={cause}
                              onChange={(e) => setCause(e.target.value)}
                              style={{ height: "100px" }}
                              required
                            ></textarea>
                            <label htmlFor="causeInput">Cause</label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              id="ligneSelect"
                              value={statusLigne}
                              onChange={(e) => setStatusLigne(e.target.value)}
                              required
                            >
                              <option value="">Select a line</option>
                              {lignes.map(ligne => (
                                <option key={ligne.id} value={ligne.id}>
                                  {ligne.title}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="ligneSelect">Production Line</label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              id="serviceSelect"
                              value={service}
                              onChange={(e) => setService(e.target.value)}
                              required
                            >
                              <option value="">Select a service</option>
                              <option value="Production">Production</option>
                              <option value="Qualité">Qualité</option>
                              <option value="Maintenance">Maintenance</option>
                              <option value="Méthode">Méthode</option>
                              <option value="Indus">Indus</option>
                              <option value="Logistique">Logistique</option>
                            </select>
                            <label htmlFor="serviceSelect">Service</label>
                          </div>
                        </div>

                        <div className="col-12 m-auto">
                          <div className="form-floating">
                            <input
                              type="number"
                              className="form-control form-control-lg"
                              id="minutesInput"
                              value={minutesArret}
                              onChange={(e) => setMinutesArret(e.target.value)}
                              required
                            />
                            <label htmlFor="minutesInput">Minutes d'arrêt</label>
                          </div>
                        </div>
                      </div>

                      <div className="d-grid gap-2 mt-4">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-lg me-2"></i>
                              Submit
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

export default CauseArret;