import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings'); // 백엔드 API 경로
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.customerName} - {new Date(booking.date).toLocaleDateString()} - {booking.time} - {booking.service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
