import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { getParticipants } from '../components/Service/api';
import "./Meeting.css";
const StartMeeting = ({ startMeeting }) => {
  const [name, setName] = useState('');
  const [roomname, setRoomname] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participantsData = await getParticipants();
        setParticipants(participantsData);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    fetchData();
  }, []);

  const handleJoin = () => {
    const participant = participants.find(
      p => p.username === name && p.room === roomname && p.password === userpassword
    );

    if (participant) {
      startMeeting(name, roomname);
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className='home'>
      <Header />
      <div className='m-9'>
        <div className='flex justify-center items-center flex-col'>
          <div className="bg-white flex justify-center border flex-col p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h1 className='text-center font-bold'>Join a Meeting</h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
              <input
                type="text"
                placeholder="Enter room Name"
                value={roomname}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onChange={(e) => setRoomname(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={userpassword}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                onChange={(e) => setUserpassword(e.target.value)}
              />
            </div>
            <button onClick={handleJoin} className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-6 py-2.5'>Join</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StartMeeting;
///