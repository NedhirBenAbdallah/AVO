import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TrpChartWidget = () => {
  const [tracks, setTracks] = useState([]);
  const [lignes, setLignes] = useState([]);
  const [weekNumbers, setWeekNumbers] = useState([]);
  const [selectedLigne, setSelectedLigne] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'TRP (%)',
      data: [],
      backgroundColor: 'rgba(13, 110, 253, 0.5)',
      borderColor: 'rgba(13, 110, 253, 1)',
      borderWidth: 2
    }]
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tracksResponse, lignesResponse] = await Promise.all([
          fetch('http://localhost:5000/track/'),
          fetch('http://localhost:5000/ligne/')
        ]);

        const tracksData = await tracksResponse.json();
        const lignesData = await lignesResponse.json();

        setTracks(tracksData);
        setLignes(lignesData);

        // Extract unique week numbers
        const weeks = [...new Set(tracksData.map(track => track.week_number))];
        setWeekNumbers(weeks);

        // Update chart data
        updateChartData(tracksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = [...tracks];
     filteredData = tracks.reduce((acc, current) => {
      const existingIndex = acc.findIndex(item => item.date_start === current.date_start);
  
      if (existingIndex >= 0) {
          acc[existingIndex] = current;
      } else {
          acc.push(current);
      }
  
      return acc;
  }, []);
  
  filteredData.sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  
  
    if (selectedLigne) {
      filteredData = filteredData.filter(track => track.ligne_id == selectedLigne);
    }
    if (selectedWeek) {
      filteredData = filteredData.filter(track => track.week_number == parseInt(selectedWeek));
    }

    updateChartData(filteredData);
  }, [selectedLigne, selectedWeek, tracks]);

  const updateChartData = (data) => {
    const labels = data.map(track => {
      const date = new Date(track.date_start);
      return date.toLocaleDateString();
    });

    const trpValues = data.map(track => 
      track.capacity !== 0 ? (track.qt / track.capacity) * 100 : 0
    );

    setChartData({
      labels,
      datasets: [{
        ...chartData.datasets[0],
        data: trpValues
      }]
    });
  };

  const handleLigneChange = (e) => {
    setSelectedLigne(e.target.value);
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

 
  return (
    <div className="card border-0 shadow-lg">
      {/* Header */}
      <div className="card-header bg-primary text-white py-3">
        <h3 className="card-title mb-0 text-center">
          <i className="bi bi-bar-chart-fill me-2"></i>
          TRP Dashboard
        </h3>
      </div>

      {/* Body */}
      <div className="card-body p-4">
        {/* Filters Section */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="form-floating">
              <select 
                className="form-select" 
                value={selectedLigne} 
                onChange={handleLigneChange}
                id="ligneSelect"
              >
                <option value="">All Lines</option>
                {lignes.map(ligne => (
                  <option key={ligne.id} value={ligne.id}>{ligne.title}</option>
                ))}
              </select>
              <label htmlFor="ligneSelect">Select Production Line</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select 
                className="form-select" 
                value={selectedWeek} 
                onChange={handleWeekChange}
                id="weekSelect"
              >
                <option value="">All Weeks</option>
                {weekNumbers.map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
              <label htmlFor="weekSelect">Select Week</label>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-container position-relative" style={{ minHeight: '400px' }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : tracks.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No data available
            </div>
          ) : chartData.labels ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14,
                        weight: 'bold'
                      },
                      padding: 20
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                      size: 14
                    },
                    bodyFont: {
                      size: 13
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'TRP (%)',
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Days',
                      font: {
                        size: 14,
                        weight: 'bold'
                      }
                    },
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          ) : (
            <div className="alert alert-warning text-center" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              No data available for the selected filters
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer bg-light p-3">
        <div className="d-flex justify-content-between align-items-center text-muted">
          <small>
            <i className="bi bi-clock me-1"></i>
            Last updated: {new Date().toLocaleDateString()}
          </small>
          <small>
            <i className="bi bi-graph-up me-1"></i>
            Total Records: {tracks.length}
          </small>
        </div>
      </div>
    </div>
  );
};

export default TrpChartWidget;