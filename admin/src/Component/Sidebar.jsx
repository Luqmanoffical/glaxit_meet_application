import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="flex">
      <button
        onClick={toggleSidebar}
        className="p-4 text-blue-500 fixed top-0 left-0 z-50"
      >
        ☰
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="mt-16">
          <li className="p-4 hover:bg-gray-700">
            <Link to="/dashboard" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/admin" onClick={toggleSidebar}>
              Create Room
            </Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/participant-data" onClick={toggleSidebar}>
              Participant Data
            </Link>
          </li>
          
         
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
