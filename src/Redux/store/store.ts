// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import speechReducer from './speechSlice';

export const store = configureStore({
  reducer: {
    speech: speechReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;