import React, { useState, useEffect } from "react";
import "./AdminDashboard.css"; // Import CSS file
import SideBar from "../components/sideBar"; // Ensure the correct casing for import
import { Link, useLocation, useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation
import AnalyticsDashboard from "./AnalyticsDashboard"; // Import the AnalyticsDashboard component
import { useHistory } from 'react-router-dom';
import AnalyticsModal from "../components/AnalyticsModal"


const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigateToAnalytics = () => {
    navigate('/admin/analyticsdashboard');
  };


  
  const location = useLocation();
  // State for User Management
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [roleCounts, setRoleCounts] = useState({});
  const [userCount, setUserCount] = useState(0); // Add state for user count

  // State for Tracks Management
  const [tracks, setTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tracksPerPage] = useState(5); // Number of tracks per page
  const [showTracks, setShowTracks] = useState(false);
  const [startDate, setStartDate] = useState(""); // State for start date filter
  const [endDate, setEndDate] = useState(""); // State for end date filter
  const [sortConfig, setSortConfig] = useState({ key: 'date_start', direction: 'ascending' });

  // State for CauseArret Management
  const [causeArrets, setCauseArrets] = useState([]);
  const [causeArretPage, setCauseArretPage] = useState(1);
  const [causeArretsPerPage] = useState(5); // Number of CauseArrets per page
  const [showCauseArrets, setShowCauseArrets] = useState(false);
  const [sortConfigCause, setSortConfigCause] = useState({ key: 'date_cause', direction: 'ascending' }); // State for sorting CauseArrets
// analytics pop up
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const handleAnalyticsClick = () => {
    setShowAnalyticsModal(true);
  };
  
  const handleCloseModal = () => {
    setShowAnalyticsModal(false);
  };

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/count-users'); // Adjust the URL as needed
        const data = await response.json();
        const totalUsers = data.user || 0; // Change this if your API structure is different
        setUserCount(totalUsers); 
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchUserCounts();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('http://localhost:5000/track/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      setTracks(data);
      setShowTracks(true);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const fetchCauseArrets = async () => {
    try {
      const response = await fetch('http://localhost:5000/causearret/'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCauseArrets(data);
      setShowCauseArrets(true);
    } catch (error) {
      console.error('Error fetching CauseArrets:', error);
    }
  };

  // Get current tracks
  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;

  // Utility function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Filter tracks based on date range
  const filteredTracks = tracks.filter(track => {

    const trackDate = new Date(track.date_start);
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    return trackDate >= start && trackDate <= end;
  });

  // Sort tracks
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Get current sorted tracks for pagination
  const currentTracks = sortedTracks.slice(indexOfFirstTrack, indexOfLastTrack);

  // Get current CauseArrets
  const indexOfLastCauseArret = causeArretPage * causeArretsPerPage;
  const indexOfFirstCauseArret = indexOfLastCauseArret - causeArretsPerPage;

  // Sort CauseArrets
  const sortedCauseArrets = [...causeArrets].sort((a, b) => {
    if (a[sortConfigCause.key] < b[sortConfigCause.key]) {
      return sortConfigCause.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfigCause.key] > b[sortConfigCause.key]) {
      return sortConfigCause.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const currentCauseArrets = sortedCauseArrets.slice(indexOfFirstCauseArret, indexOfLastCauseArret);

  // Change page for tracks
  const paginateTracks = (pageNumber) => setCurrentPage(pageNumber);

  // Change page for CauseArrets
  const paginateCauseArrets = (pageNumber) => setCauseArretPage(pageNumber);

  // Handle sorting for Tracks
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handle sorting for CauseArrets
  const requestSortCause = (key) => {
    let direction = 'ascending';
    if (sortConfigCause.key === key && sortConfigCause.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfigCause({ key, direction });
  };

  return (
    <div className="admin-dashboard container-fluid">
    <div className="dash-layout">
      <div className="row ">
        <SideBar />
        {location.pathname.includes('/admin') && (
          <div className="col main-body">
            {/* <button onClick={navigateToAnalytics} className="btn btn-primary dashboard-btn mb-4">
              <img src={`${process.env.PUBLIC_URL}/anlytics.png`} alt="Profile" className="dashboard-btn-img" />
              Anlytics
            </button> */}

            <button onClick={handleAnalyticsClick} className="btn btn-primary dashboard-btn mb-4">
              <img src={`${process.env.PUBLIC_URL}/anlytics.png`} alt="Profile" className="dashboard-btn-img" />
              Anlytics
            </button>
            <AnalyticsModal show={showAnalyticsModal} handleClose={handleCloseModal} />
            
            <div className="row">
              {/* Total Users Card */}
              <div className="col-md-4">
                <div className="card text-white bg-primary mb-3 dashboard-card">
                  <div className="card-header">
                  <i className="bi bi-people me-3"></i>
                  Total Users
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">There is currently <strong>{userCount} users</strong></h5> {/* Display just the number */}
                  </div>
                </div>
              </div>

              <div>
    {/* Other components and elements */}

  </div>

              {/* CauseArret Card */}
              <div className="col-md-4">
                <div className="card text-white bg-success mb-3 dashboard-card">
                  <div className="card-header">
                    <i className="bi bi-exclamation-triangle me-3"></i>
                    CauseArret
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">View All CauseArret</h5>
                    <p className="card-text">See all CauseArret records.</p>
                    <button onClick={fetchCauseArrets} className="btn btn-light">View CauseArret</button>
                  </div>
                </div>
              </div>

              {/* Track Card */}
              <div className="col-md-4">
                <div className="card text-white bg-info mb-3 dashboard-card">
                  <div className="card-header">
                  <i className="bi bi-file-earmark-text-fill me-3"></i>
                  Track
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">View All Track</h5>
                    <p className="card-text">See all Track records.</p>
                    <button onClick={fetchTracks} className="btn btn-light">View Tracks</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            {showTracks && (
              <div className="row mt-4">
                <div className="col-md-6">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Track Table */}
            {showTracks && (
              <div className="card mt-4 shadow">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Track Records</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-bordered table-hover text-center align-middle table-sm">
                    <thead className="table-primary">
                      <tr>
                        <th onClick={() => requestSort('id')}></th>
                        <th onClick={() => requestSort('date_start')}>Start Date</th>
                        <th onClick={() => requestSort('capacity')}>capacity</th>
                        <th onClick={() => requestSort('day_name')}>Day</th>
                        <th onClick={() => requestSort('h_paye')}>Paye</th>
                        <th onClick={() => requestSort('title')}>Ligne</th>
                        <th onClick={() => requestSort('qt')}>Quantity</th>
                        <th onClick={() => requestSort('week_number')}>Week number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTracks.map((track, index) => (
                        <tr key={track.id}>
                          <td>{indexOfFirstTrack + index + 1}</td>
                          <td>{formatDate(track.date_start)}</td>
                          <td>{track.capacity}</td>
                          <td>{track.day_name}</td>
                          <td>{track.h_paye}</td>
                          <td>{track.title}</td>
                          <td>{track.qt}</td>
                          <td>{track.week_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav>
                    <ul className="pagination">
                      {Array.from({ length: Math.ceil(filteredTracks.length / tracksPerPage) }, (_, i) => (
                        <li key={i + 1} className="page-item">
                          <a onClick={() => paginateTracks(i + 1)} href="#!" className="page-link">
                            {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}

            {/* CauseArret Table */}
            {showCauseArrets && (
              <div className="card mt-4 shadow">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">CauseArret Records</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped table-bordered table-hover text-center align-middle table-sm">
                    <thead className="table-success">
                      <tr>
                        <th></th>
                        <th onClick={() => requestSortCause('date_cause')}>Date</th>
                        <th onClick={() => requestSortCause('causearret')}>Cause</th>
                        <th onClick={() => requestSortCause('service')}>Service</th>
                        <th onClick={() => requestSortCause('minutearret')}>Minute Arret</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCauseArrets.map((causeArret, index) => (
                        <tr key={causeArret.id}>
                          <td>{indexOfFirstCauseArret + index + 1}</td>
                          <td>{formatDate(causeArret.date_cause)}</td>
                          <td>{causeArret.causearret}</td>
                          <td>{causeArret.service}</td>
                          <td>{causeArret.minutearret}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav>
                    <ul className="pagination">
                      {Array.from({ length: Math.ceil(causeArrets.length / causeArretsPerPage) }, (_, i) => (
                        <li key={i + 1} className="page-item">
                          <a onClick={() => paginateCauseArrets(i + 1)} href="#!" className="page-link">
                            {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        )}
        {location.pathname.includes('/user') && (
          <div className="col main-body">
            <h1>User Dashboard</h1>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;