import React, { useState, useEffect } from "react";

import TrackChart from "../components/TrackChart"; // Import the Cause Arret Chart Widget

const AnalyticsTrack = () => {
  return (
    <div className="analytics-trp container-fluid">
      <div className="row">
        <div className="col-auto">
         
        </div>
        <div className="col main-body">
          <div className="row">
            <div className="col-md-10 m-auto">
              <TrackChart />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTrack;