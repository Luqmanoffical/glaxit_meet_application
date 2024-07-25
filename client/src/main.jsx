import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Calendar from './page/Calendar.jsx';
import Meetingio from './page/Meeting.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store.js';
import { setAuthState } from './store/authSlice';
import History from   './components/History.jsx';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('token');
    if (userData && token) {
      dispatch(setAuthState({ user: JSON.parse(userData), token }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="MyCalendar" element={<Calendar />} />
          <Route path="Login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="history" element={<History/>} />
          
        </Route>
        <Route path="StartMeeting" element={<Meetingio />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Main />
  </Provider>
);
