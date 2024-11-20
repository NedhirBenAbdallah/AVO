// EfficiencyChartWidget.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './EfficienceChartWidget.css';

const EfficiencyChartWidget = () => {
  const [tracks, setTracks] = useState([]);
  const [lignes, setLignes] = useState([]);
  const [selectedLigne, setSelectedLigne] = useState('');
  const [drillDownLevel, setDrillDownLevel] = useState('year');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tracksResponse, lignesResponse] = await Promise.all([
          fetch('http://localhost:5000/track/'),
          fetch('http://localhost:5000/ligne/')
        ]);
        const tracksData = await tracksResponse.json();
        const lignesData = await lignesResponse.json();

        // Consolidate tracks by date
        const consolidatedTracks = consolidateTracksByDate(tracksData);

        setTracks(consolidatedTracks);
        setLignes(lignesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Consolidate tracks by date
  const consolidateTracksByDate = (tracksData) => {
    const consolidatedMap = new Map();
    tracksData.forEach(track => {
      const dateKey = new Date(track.date_start).toISOString().split('T')[0];
      consolidatedMap.set(dateKey, {
        ...track,
        date_start: dateKey // Normalize the date format
      });
    });
    return Array.from(consolidatedMap.values());
  };

  // Calculate trpValues
  const calculateTrpValues = (data) => {
    return data.map(track => 
      track.capacity !== 0 ? (track.qt / track.capacity) * 100 : 0
    );
  };

  // Group by year
  const groupByYear = (tracks) => {
    const yearGroups = {};
    tracks.forEach(track => {
      const year = new Date(track.date_start).getFullYear();
      if (!yearGroups[year]) {
        yearGroups[year] = { year, total: 0, count: 0 };
      }
      yearGroups[year].total += calculateTrpValues([track])[0];
      yearGroups[year].count++;
    });
    return Object.values(yearGroups).map(group => ({
      year: group.year,
      efficiency: group.total / group.count
    }));
  };

  // Group by month
  const groupByMonth = (tracks, year) => {
    const monthGroups = {};
    tracks.forEach(track => {
      const date = new Date(track.date_start);
      if (date.getFullYear() === year) {
        const month = date.getMonth();
        if (!monthGroups[month]) {
          monthGroups[month] = {
            month: date.toLocaleString('default', { month: 'long' }),
            total: 0,
            count: 0
          };
        }
        monthGroups[month].total += calculateTrpValues([track])[0];
        monthGroups[month].count++;
      }
    });
    return Object.values(monthGroups).map(group => ({
      month: group.month,
      efficiency: group.total / group.count
    }));
  };

  // Group by week
  const groupByWeek = (tracks, year, month) => {
    const weekGroups = {};
    tracks.forEach(track => {
      const date = new Date(track.date_start);
      if (date.getFullYear() === year && date.getMonth() === new Date(Date.parse(month + " 1")).getMonth()) {
        const week = track.week_number;
        if (!weekGroups[week]) {
          weekGroups[week] = { week, total: 0, count: 0 };
        }
        weekGroups[week].total += calculateTrpValues([track])[0];
        weekGroups[week].count++;
      }
    });
    return Object.values(weekGroups).map(group => ({
      week: group.week,
      efficiency: group.total / group.count
    }));
  };

  // Group by day
  const groupByDay = (tracks, year, month, week) => {
    return tracks
      .filter(track => {
        const date = new Date(track.date_start);
        return date.getFullYear() === year &&
               date.getMonth() === new Date(Date.parse(month + " 1")).getMonth() &&
               track.week_number === week;
      })
      .map(track => ({
        day: new Date(track.date_start).toLocaleDateString(),
        efficiency: calculateTrpValues([track])[0]
      }));
  };

  // Process data based on drill down level
  const processData = () => {
    const filteredTracks = selectedLigne 
      ? tracks.filter(track => track.ligne_id === parseInt(selectedLigne))
      : tracks;

    switch (drillDownLevel) {
      case 'year':
        return groupByYear(filteredTracks);
      case 'month':
        return groupByMonth(filteredTracks, selectedYear);
      case 'week':
        return groupByWeek(filteredTracks, selectedYear, selectedMonth);
      case 'day':
        return groupByDay(filteredTracks, selectedYear, selectedMonth, selectedWeek);
      default:
        return [];
    }
  };

  // Calculate summary stats
  const getStats = () => {
    const data = processData();
    const efficiencies = data.map(item => item.efficiency);
    return {
      average: efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length || 0,
      max: Math.max(...efficiencies, 0),
      min: Math.min(...efficiencies, 0)
    };
  };

  // Handle drill down
  const handleDrillDown = (elements) => {
    if (!elements.length) return;

    const value = processData()[elements[0].index];

    switch (drillDownLevel) {
      case 'year':
        setSelectedYear(parseInt(value.year));
        setDrillDownLevel('month');
        break;
      case 'month':
        setSelectedMonth(value.month);
        setDrillDownLevel('week');
        break;
      case 'week':
        setSelectedWeek(parseInt(value.week));
        setDrillDownLevel('day');
        break;
      default:
        break;
    }
  };

  // Chart data
  const chartData = {
    labels: processData().map(item => item[drillDownLevel] || item.day),
    datasets: [{
      data: processData().map(item => item.efficiency),
      backgroundColor: function(context) {
        const chart = context.chart;
        const {ctx, chartArea} = chart;
        if (!chartArea) return;
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(13,110,253,0.2)');
        gradient.addColorStop(1, 'rgba(13,110,253,0.8)');
        return gradient;
      },
      borderRadius: 6,
      borderWidth: 0,
      hoverBackgroundColor: 'rgba(13,110,253,0.9)'
    }]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_, elements) => handleDrillDown(elements),
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Efficiency: ${context.parsed.y.toFixed(1)}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { 
          display: true, 
          text: 'Efficiency %' 
        }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Render breadcrumb
  const renderBreadcrumb = () => (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <button 
            className="btn btn-link p-0"
            onClick={() => {
              setDrillDownLevel('year');
              setSelectedYear(null);
              setSelectedMonth(null);
              setSelectedWeek(null);
            }}
          >
            Years
          </button>
        </li>
        {selectedYear && (
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link p-0"
              onClick={() => {
                setDrillDownLevel('month');
                setSelectedMonth(null);
                setSelectedWeek(null);
              }}
            >
              {selectedYear}
            </button>
          </li>
        )}
        {selectedMonth && (
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link p-0"
              onClick={() => {
                setDrillDownLevel('week');
                setSelectedWeek(null);
              }}
            >
              {selectedMonth}
            </button>
          </li>
        )}
        {selectedWeek && (
          <li className="breadcrumb-item active" aria-current="page">
            Week {selectedWeek}
          </li>
        )}
      </ol>
    </nav>
  );

  return (
    <div className="efficiency-widget card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-gradient p-4 border-0">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <h4 className="text-white mb-0 d-flex align-items-center">
              <i className="bi bi-graph-up-arrow fs-4 me-2"></i>
              Efficiency Dashboard
            </h4>
            <p className="text-white-50 mb-0 mt-1">
              Performance analysis and trends
            </p>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex gap-4 justify-content-md-end">
              <div className="text-white text-center">
                <small className="d-block text-white-50">Average</small>
                <span className="h5 mb-0">{getStats().average.toFixed(1)}%</span>
              </div>
              <div className="text-white text-center">
                <small className="d-block text-white-50">Max</small>
                <span className="h5 mb-0">{getStats().max.toFixed(1)}%</span>
              </div>
              <div className="text-white text-center">
                <small className="d-block text-white-50">Min</small>
                <span className="h5 mb-0">{getStats().min.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-body p-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <div className="flex-grow-1">
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="bi bi-filter"></i>
                  </span>
                  <select 
                    className="form-select border-0 bg-light" 
                    value={selectedLigne}
                    onChange={(e) => {
                      setSelectedLigne(e.target.value);
                      setDrillDownLevel('year');
                      setSelectedYear(null);
                      setSelectedMonth(null);
                      setSelectedWeek(null);
                    }}
                  >
                    <option value="">All Production Lines</option>
                    {lignes.map(ligne => (
                      <option key={ligne.id} value={ligne.id}>
                        {ligne.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <nav className="ms-auto">
                <ol className="breadcrumb bg-light px-3 py-2 rounded-pill mb-0">
                  <li className="breadcrumb-item">
                    <button className="btn btn-link p-0 text-decoration-none"
                      onClick={() => {
                        setDrillDownLevel('year');
                        setSelectedYear(null);
                        setSelectedMonth(null);
                        setSelectedWeek(null);
                      }}
                    >Years</button>
                  </li>
                  {selectedYear && (
                    <li className="breadcrumb-item">
                      <button className="btn btn-link p-0 text-decoration-none"
                        onClick={() => {
                          setDrillDownLevel('month');
                          setSelectedMonth(null);
                          setSelectedWeek(null);
                        }}
                      >{selectedYear}</button>
                    </li>
                  )}
                  {selectedMonth && (
                    <li className="breadcrumb-item">
                      <button className="btn btn-link p-0 text-decoration-none"
                        onClick={() => {
                          setDrillDownLevel('week');
                          setSelectedWeek(null);
                        }}
                      >{selectedMonth}</button>
                    </li>
                  )}
                  {selectedWeek && (
                    <li className="breadcrumb-item active">Week {selectedWeek}</li>
                  )}
                </ol>
              </nav>
            </div>
          </div>

          <div className="col-12">
            {tracks.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted mt-3 mb-0">Loading efficiency data...</p>
              </div>
            ) : (
              <div className="chart-container bg-light rounded-4 p-4" style={{ height: '400px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card-footer border-0 bg-white p-4">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center text-muted">
              <i className="bi bi-clock me-2"></i>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div className="col-12 col-md-6 text-md-end">
            <div className="d-flex align-items-center justify-content-md-end text-muted">
              <i className="bi bi-database me-2"></i>
              <span>Total records: {tracks.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EfficiencyChartWidget;