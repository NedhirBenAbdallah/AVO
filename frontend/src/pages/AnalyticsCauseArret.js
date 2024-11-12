import React, { useState, useEffect } from "react";

import CauseArretChart from "../components/CauseArretChart"; // Import the Cause Arret Chart Widget

const AnalyticsCauseArret = () => {
  return (
    <div className="analytics-trp container-fluid">
      <div className="row">
        <div className="col-auto">
         
        </div>
        <div className="col main-body">
          <div className="row">
            <div className="col-md-10 m-auto">
              <CauseArretChart />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCauseArret;