import React, { useState } from 'react';
import StartMeeting from '../components/StartMeeting';
import Meeting from '../components/Meeting';
import { useNavigate } from 'react-router-dom';
import "../components/Meeting.css";
function Meetingio() {
  const [roomName, setRoomName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isInMeeting, setIsInMeeting] = useState(false);
  const navigate = useNavigate();

  const startMeeting = (name, room) => {
    setDisplayName(name);
    setRoomName(room);
    setIsInMeeting(true);
  };

  const endMeeting = () => {
    setIsInMeeting(false);
    setDisplayName('');
    setRoomName('');
    navigate('/');
  };

  return (
    <div className="App">
      {isInMeeting ? (
      <Meeting roomName={roomName} displayName={displayName} endMeeting={endMeeting} />

      ) : (
        <StartMeeting startMeeting={startMeeting} />
      )}
    </div>
  );
}

export default Meetingio;
///