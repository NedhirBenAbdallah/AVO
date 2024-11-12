import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
// import './TrackChart.css';

const TrackChart = () => {
  const [tracks, setTracks] = useState([]);
  const [lignes, setLignes] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    ligne: '',
    weekNumber: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, lignesResponse] = await Promise.all([
          fetch('http://localhost:5000/track'),
          fetch('http://localhost:5000/ligne')
        ]);
        const tracksData = await tracksResponse.json();
        const lignesData = await lignesResponse.json();
        setTracks(tracksData);
        setLignes(lignesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return tracks.filter(track => {
      return (
        (filters.date === '' || track.date_start.includes(filters.date)) &&
        (filters.ligne === '' || track.title === filters.ligne) &&
        (filters.weekNumber === '' || track.week_number.toString() === filters.weekNumber)
      );
    });
  }, [filters, tracks]);

  const chartData = useMemo(() => {
    const labels = filteredData.map(track => {
      const date = new Date(track.date_start);
      return date.toLocaleDateString();
    });
    const quantities = filteredData.map(track => track.qt);
    
    return {
      labels,
      datasets: [{
        label: 'Production Quantity',
        data: quantities,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }]
    };
  }, [filteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const chartOptions = {
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
        },
        callbacks: {
          label: function(context) {
            const track = filteredData[context.dataIndex];
            return [
              `Line: ${track.title}`,
              `Quantity: ${track.qt}`,
              `Capacity: ${track.capacity}`,
              `Week: ${track.week_number}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Production Quantity',
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
          text: 'Date',
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
  };

  return (
    <div className="chart-container card border-0 shadow-lg">
      <div className="card-header bg-primary text-white py-3">
        <h3 className="card-title mb-0 text-center">
          <i className="bi bi-graph-up me-2"></i>
          Production Track Visualization
        </h3>
      </div>
      <div className="card-body p-4">
        <div className="filters-container row mb-4">
          <div className="col-md-4">
            <input
              type="date"
              name="date"
              className="form-control"
              placeholder="Filter by Date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <select
              name="ligne"
              className="form-control"
              value={filters.ligne}
              onChange={handleFilterChange}
            >
              <option value="">Select Production Line</option>
              {lignes.map(ligne => (
                <option key={ligne.id} value={ligne.title}>
                  {ligne.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="weekNumber"
              className="form-control"
              placeholder="Filter by Week Number"
              value={filters.weekNumber}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div className="chart-wrapper" style={{ height: '400px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TrackChart;