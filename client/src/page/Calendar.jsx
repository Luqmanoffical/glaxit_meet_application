import React, { useEffect, useState } from 'react';
import MyCalendar from '../components/MyCalendar';
import Meeting from '../components/Meeting';
import axios from 'axios';
import { API_URL } from '../components/Service/api';

function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/current-user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchEvents();
  }, []); 

  return (
    <div>
      <MyCalendar onSelectEvent={handleSelectEvent} />
      {selectedEvent && <Meeting roomName={selectedEvent.title} />} 
    </div>
  );
}

export default Calendar;
