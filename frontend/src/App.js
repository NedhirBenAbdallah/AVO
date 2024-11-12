// frontend/src/App.js
import React from 'react';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import AddUser from './components/AddUser';
import Track from './pages/Track';
import CauseArret from './pages/CauseArret';
import AddLigne from './components/AddLigne';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AnalyticsTRP from './pages/AnalyticsTRP';
import AnalyticsEfficience from './pages/AnalyticsEfficience';
import AnalyticsCauseArret from './pages/AnalyticsCauseArret';
import AnalyticsTrack from './pages/AnalyticsTrack';

import './App.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginForm />} />
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/user" element={<AddUser />} />
        <Route path="admin/track" element={<Track />} />
        {/* <Route path="admin/cause-arret" element={<CauseArret/>} /> */}
        <Route path="admin/cause-arret" element={<CauseArret/>} />

        <Route path="admin/AddLigne" element={<AddLigne/>} />

////_______________________//
        <Route path="user/dashboard" element={<AdminDashboard />} />
        {/* <Route path="user/user" element={<AddUser />} /> */}
        <Route path="user/track" element={<Track />} />
        <Route path="user/cause-arret" element={<CauseArret/>} />
        {/* <Route path="user/AddLigne" element={<AddLigne/>} /> */}
        <Route path="admin/analyticsdashboard" element={<AnalyticsDashboard/>} />
        <Route path="admin/AnalyticsTRP" element={<AnalyticsTRP/>} />
        <Route path="admin/AnalyticsEfficience" element={<AnalyticsEfficience/>} />
        <Route path="admin/AnalyticsCauseArret" element={<AnalyticsCauseArret/>} />
        <Route path="admin/AnalyticsTrack" element={<AnalyticsTrack/>} />
      </Routes>
    </Router>
  );
}

export default App;

