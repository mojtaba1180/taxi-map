import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../components/main-map/mapSlice';

export const store = configureStore({
  reducer: {
    mapStore: mapReducer,
  },
});
