// src/store/speechSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SpeechState {
  text: string;
  isSpeaking: boolean;
  isPaused: boolean;
}

const initialState: SpeechState = {
  text: '',
  isSpeaking: false,
  isPaused: false,
};

const speechSlice = createSlice({
  name: 'speech',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setIsSpeaking: (state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    },
    setIsPaused: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    resetSpeech: (state) => {
      state.isSpeaking = false;
      state.isPaused = false;
    },
  },
});

export const { setText, setIsSpeaking, setIsPaused, resetSpeech } = speechSlice.actions;
export default speechSlice.reducer;