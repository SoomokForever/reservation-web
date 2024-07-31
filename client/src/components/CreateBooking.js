import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../App.css';

// moment 로케일을 한국어로 설정
moment.locale('ko');

const localizer = momentLocalizer(moment);

const CreateBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data.map(booking => ({
        title: booking.customerName,
        start: new Date(booking.date),
        end: new Date(booking.date),
        allDay: true,
      })));
    };

    fetchBookings();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setDate(moment(start).format('YYYY-MM-DD'));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newBooking = { customerName, date, time, service, notes };
    await axios.post('http://localhost:5000/api/bookings', newBooking);

    // Fetch updated bookings
    const response = await axios.get('http://localhost:5000/api/bookings');
    setBookings(response.data.map(booking => ({
      title: booking.customerName,
      start: new Date(booking.date),
      end: new Date(booking.date),
      allDay: true,
    })));

    // Clear form and selected slot
    setCustomerName('');
    setDate('');
    setTime('');
    setService('');
    setNotes('');
    setSelectedSlot(null);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        culture="ko"
        selectable
        views={[Views.MONTH]} // 월간 보기로 고정
        defaultView={Views.MONTH} // 기본 보기를 월간으로 설정
        onSelectSlot={handleSelectSlot}
        dayPropGetter={(date) => {
          // 예약된 날짜에 하이라이트 스타일 적용
          const bookingDates = bookings.map(b => b.start.toDateString());
          if (bookingDates.includes(date.toDateString())) {
            return { className: 'rbc-selected-cell' };
          }
          return {};
        }}
      />
      {selectedSlot && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Customer Name:</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          </div>
          <div>
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <label>Time:</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </div>
          <div>
            <label>Service:</label>
            <input type="text" value={service} onChange={(e) => setService(e.target.value)} required />
          </div>
          <div>
            <label>Notes:</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          </div>
          <button type="submit">Create Booking</button>
        </form>
      )}
    </div>
  );
};

export default CreateBooking;
