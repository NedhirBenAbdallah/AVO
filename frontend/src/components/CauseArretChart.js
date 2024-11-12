import React, { useState, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './CauseArretChart.css';

const CauseArretChart = () => {
  const [causeArrets, setCauseArrets] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    cause: '',
    service: '',
    minuteArret: '',
    week: ''
  });

  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  useEffect(() => {
    const fetchCauseArrets = async () => {
      try {
        const response = await fetch('http://localhost:5000/CauseArret');
        const data = await response.json();
        setCauseArrets(data);
      } catch (error) {
        console.error('Error fetching cause arrets:', error);
      }
    };

    fetchCauseArrets();
  }, []);

  const filteredData = useMemo(() => {
    return causeArrets.filter(causeArret => {
      const weekNumber = getWeekNumber(causeArret.date_cause);
      return (
        (filters.date === '' || causeArret.date_cause.includes(filters.date)) &&
        (filters.cause === '' || causeArret.causearret.toLowerCase().includes(filters.cause.toLowerCase())) &&
        (filters.service === '' || causeArret.service === filters.service) &&
        (filters.minuteArret === '' || causeArret.minutearret.toString().includes(filters.minuteArret)) &&
        (filters.week === '' || weekNumber.toString() === filters.week)
      );
    });
  }, [filters, causeArrets]);

  const chartData = useMemo(() => {
    const labels = filteredData.map(causeArret => {
      const date = new Date(causeArret.date_cause);
      return date.toLocaleDateString();
    });
    const minutesArret = filteredData.map(causeArret => causeArret.minutearret);
    
    return {
      labels,
      datasets: [{
        label: 'Minutes of Arret',
        data: minutesArret,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
            const causeArret = filteredData[context.dataIndex];
            return [
              `Cause: ${causeArret.causearret}`,
              `Minutes: ${causeArret.minutearret}`,
              `Week: ${getWeekNumber(causeArret.date_cause)}`
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
          text: 'Minutes of Arret',
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
          <i className="bi bi-bar-chart-fill me-2"></i>
          Cause Arret Visualization
        </h3>
      </div>
      <div className="card-body p-4">
        <div className="filters-container row mb-4">
          <div className="col-md-3">
            <input
              type="date"
              name="date"
              className="form-control"
              placeholder="Filter by Date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="cause"
              className="form-control"
              placeholder="Filter by Cause"
              value={filters.cause}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <select
              name="service"
              className="form-control"
              value={filters.service}
              onChange={handleFilterChange}
            >
              <option value="">Select a service</option>
              <option value="Production">Production</option>
              <option value="Qualité">Qualité</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Méthode">Méthode</option>
              <option value="Indus">Indus</option>
              <option value="Logistique">Logistique</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="minuteArret"
              className="form-control"
              placeholder="Filter by Minute"
              value={filters.minuteArret}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="week"
              className="form-control"
              placeholder="Week (1-52)"
              value={filters.week}
              onChange={handleFilterChange}
              min="1"
              max="52"
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

export default CauseArretChart;