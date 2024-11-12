import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyticsModal.css';

const AnalyticsModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleAnalyticsEfficience = () => {
    navigate('/admin/AnalyticsEfficience');
    handleClose();
  };

  const handleAnalyticsTRP = () => {
    navigate('/admin/AnalyticsTRP');
    handleClose();
  };

  const handleAnalyticsCauseArret = () => {
    navigate('/admin/AnalyticsCauseArret');
    handleClose();
  };

  const handleAnalyticsTrack = () => {
    navigate('/admin/AnalyticsTrack');
    handleClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Analytics Dashboard</h5>
            <button type="button" className="btn-close btn-close-red" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="d-grid gap-3">
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleAnalyticsEfficience}
              >
                <i className="bi bi-graph-up me-2"></i>
                Efficience Analytics
              </button>
              <button 
                className="btn btn-success btn-lg"
                onClick={handleAnalyticsTRP}
              >
                <i className="bi bi-pie-chart me-2"></i>
                TRP Analytics
              </button>
              <button 
                className="btn btn-warning btn-lg"
                onClick={handleAnalyticsCauseArret}
              >
                <i className="bi bi-exclamation-triangle me-2"></i>
                Cause Arret Analytics
              </button>
              <button 
                className="btn btn-info btn-lg"
                onClick={handleAnalyticsTrack}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                Track Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;