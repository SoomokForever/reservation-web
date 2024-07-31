import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBooking = ({ booking, onUpdate, onDelete }) => {
  const [customerName, setCustomerName] = useState(booking.customerName);
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [service, setService] = useState(booking.service);
  const [notes, setNotes] = useState(booking.notes);

  const handleUpdate = async () => {
    const updatedBooking = { customerName, date, time, service, notes };
    await axios.put(`/api/bookings/${booking._id}`, updatedBooking);
    onUpdate();
  };

  const handleDelete = async () => {
    await axios.delete(`/api/bookings/${booking._id}`);
    onDelete();
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
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
        <button type="submit">Update Booking</button>
        <button type="button" onClick={handleDelete}>Delete Booking</button>
      </form>
    </div>
  );
};

export default EditBooking;
