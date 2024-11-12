import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar"; // Ensure the correct casing for import
import TrpChartWidget from "../components/TrpChartWidget"; // Import the TRP Chart Widget
import EfficienceChartWidget from "../components/EfficienceChartWidget"; // Import the Efficience Chart Widget

const AnalyticsEfficience = () => {
  const [tracks, setTracks] = useState([]);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('http://localhost:5000/track/');
        const data = await response.json();
        setTracks(data);
        setShowTracks(true);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="admin-dashboard container-fluid">
      <div className="row">
        <div className="col main-body">
          <div className="row">
            <div className="col-md-10  m-auto">
              <EfficienceChartWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsEfficience;