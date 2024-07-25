import React, { useState , useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { MdAdd, MdClose } from 'react-icons/md';
import { addEvent } from './Service/api';
import { getCurrentUser } from './Service/api';
import logo from "../assets/logo-1.png"

Modal.setAppElement('#root');

const localizer = momentLocalizer(moment);

const MyCalendar = ({ onSelectEvent }) => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [agenda, setAgenda] = useState({ date: null, time: null, title: '' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = await getCurrentUser();
        const userEvents = user.events.map(event => ({
          ...event,
          start: new Date(event.date + 'T' + event.time),
          end: new Date(event.date + 'T' + event.time),
        }));
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching user events:', error);
      }
    };

    fetchEvents();
  }, []);


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setAgenda({ date: null, time: null, title: '' });
  };
  const addAgenda = () => {
    const newEvent = {
      title: agenda.title,
      date: agenda.date,
      time: agenda.time
    };
    addEvent(newEvent)
      .then(() => {
        const event = {
          id: events.length + 1,
          title: agenda.title,
          start: new Date(agenda.date + 'T' + agenda.time),
          end: new Date(agenda.date + 'T' + agenda.time),
          allDay: false,
        };
        setEvents([...events, event]);
        closeModal();
      })
      .catch((error) => {
        console.error('Error adding event:', error);
      });
  };

  const handleSelectSlot = ({ start }) => {
    setAgenda({
      date: moment(start).format('YYYY-MM-DD'),
      time: moment(start).format('HH:mm'),
      title: ''
    });
    openModal();
  };

  const handleSelectEvent = (event) => {
    onSelectEvent(event);
  };



  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission == 'granted') {
            console.log('Notification permission granted.');
          } else {
            console.log('Notification permission denied.');
          }
        })
        .catch((error) => {
          console.error('Error requesting notification permission:', error);
        });
    }
  };
  
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  
  const showNotification = (title, options) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };
  const scheduleNotification = (event) => {
    const eventTime = new Date(event.start).getTime();
    const now = new Date().getTime();
    const delay = eventTime - now;
  
    if (delay > 0) {
      setTimeout(() => {
        showNotification('Meeting Reminder', {
          body: `You have an Meeting: ${event.title}`,
          icon: {logo}, 
        });
      }, delay);
    }
  };
  
  useEffect(() => {
    events.forEach(scheduleNotification);
  }, [events]);
  return (
    <div className="flex flex-col h-screen bg-orange-100">
      <div>
        <DndProvider backend={HTML5Backend}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '90vh' }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            resizable
            draggable
          />
        </DndProvider>
      </div>

      <div className="flex justify-center space-x-4 p-4">
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
           
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="flex justify-end">
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">
                  <MdClose size={24} />
                </button>
              </div>
              <div className="flex bg-whit flex-col space-y-4">
                <input
                  type="date"
                  value={agenda.date}
                  onChange={(e) => setAgenda({ ...agenda, date: e.target.value })}
                  className="border rounded p-2"
                />
                <input
                  type="time"
                 value={agenda.time}
                  onChange={(e) => setAgenda({ ...agenda, time: e.target.value })}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  value={agenda.title}
                  onChange={(e) => setAgenda({ ...agenda, title: e.target.value })}
                  placeholder="Event Title"
                  className="border rounded p-2"
                />
                <button
                  onClick={addAgenda}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  Save Event
                </button>
              </div>
            </div>
          </Modal>
        )}
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          onClick={() => handleSelectSlot({ start: new Date() })}
        >
          <MdAdd size={24} className="mr-2" />
          Add Event
        </button>
      </div>
    </div>
  );
};

export default MyCalendar;
