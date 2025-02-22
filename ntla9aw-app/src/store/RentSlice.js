import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: JSON.parse(localStorage.getItem('carbookings')) || [],
};
console.log(initialState.bookings)
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      console.log('Adding booking:', action.payload);
      const bookings = [...state.bookings, action.payload];
      localStorage.setItem('carbookings', JSON.stringify(bookings));
      return {...state, bookings: bookings};
    },
    removeBooking: (state, action) => {
      console.log('Removing booking with ID:', action.payload);
      const updatedBookings = state.bookings.filter((_,i) => i !== action.payload);
      localStorage.setItem('carbookings', JSON.stringify(updatedBookings));
      return {...state, bookings: updatedBookings};
    },
  },
});

export const { addBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;