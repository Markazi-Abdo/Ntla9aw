import { createSlice } from '@reduxjs/toolkit';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  email: 'admin2005@gmail.com',
  pass: 'admin2005',
};

const initialState = {
  isAdminAuth: JSON.parse(localStorage.getItem('adminAuthState')) ?? false,
  admin: ADMIN_CREDENTIALS
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      const { email, pass } = action.payload;
      if (email === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.pass) {
        localStorage.setItem('adminAuthState', JSON.stringify(true));
        return { ...state, isAdminAuth: true };
      }
    },
    adminLogout: (state) => {
      localStorage.setItem('adminAuthState', JSON.stringify(false));
      return { ...state, isAdminAuth: false };
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
