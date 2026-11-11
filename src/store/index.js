import { configureStore } from '@reduxjs/toolkit';
import bakingReducer from './bakingSlice';

export const store = configureStore({
  reducer: {
    baking: bakingReducer,
  },
});