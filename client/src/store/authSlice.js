// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  token: null,
  status: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.userData = user;
      state.token = token;
      state.status = true;
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.userData = null;
      state.token = null;
      state.status = false;
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
    },
    setAuthState: (state, action) => {
      const { user, token } = action.payload;
      state.userData = user;
      state.token = token;
      state.status = true;
    }
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
