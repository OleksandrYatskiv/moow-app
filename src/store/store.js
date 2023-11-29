// store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice';

const store = configureStore({
  reducer: {
    slice: appReducer,
  },
});

export default store;
