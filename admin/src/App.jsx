import React, { useState } from 'react';
import Sidebar from './Component/Sidebar';
import Dashboard from './Component/dashboard/Dashboard';
import Admin from './Component/Admin/Admin';
import ParticipantData from './Component/ParticipantData/ParticipantData';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';


const App = () => {
  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </div>
    </Router>
  );
};

const MainApp = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-4">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/participant-data" element={<ParticipantData />} />
           
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;