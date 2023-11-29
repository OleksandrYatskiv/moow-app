import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  distance: 0,
  forwarder: false,
  pointA: {},
}

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setForwarder: (state, action) => {
      state.forwarder = action.payload;
    },
    setPointA: (state, action) => {
      state.pointA = action.payload;
    },
  },
});

export const { setDistance, setForwarder, setPointA } = slice.actions;
export default slice.reducer;
