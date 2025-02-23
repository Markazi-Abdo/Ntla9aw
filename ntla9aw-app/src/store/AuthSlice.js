import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: JSON.parse(localStorage.getItem('authState')) ?? false,
  users: JSON.parse(localStorage.getItem('users')) ?? [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) ?? null,
};

console.log("Users:", JSON.stringify(initialState.users));

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action) => {
      console.log("Signed Up User:", action.payload);
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('authState', JSON.stringify(true));
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, users: updatedUsers, currentUser: action.payload, isAuth: true };
    },
    login: (state, action) => {
      console.log('Logged In User:', action.payload);
      const authUser = state.users.find(
        (user) => user.email === action.payload.email && user.pass === action.payload.pass
      );
      if (authUser) {
        localStorage.setItem('currentUser', JSON.stringify(authUser));
        localStorage.setItem('authState', JSON.stringify(true));
        return { ...state, currentUser: authUser, isAuth: true };
      }
    }
  },
});

export const { signUp, login } = authSlice.actions;
export default authSlice.reducer;
