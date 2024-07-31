import React from 'react';
import Home from './components/Home';
import Booking from './components/Booking';
import CreateBooking from './components/CreateBooking';
import './App.css'; // CSS 파일 불러오기

function App() {
  return (
    <div className="App">
      <Home />
      <CreateBooking />
      <Booking />
    </div>
  );
}

export default App;
