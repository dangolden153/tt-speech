import * as Speech from "expo-speech";

export const speakText = (text: string) => {
  Speech.speak(text);
};

export const stopSpeaking = () => {
  Speech.stop();
};
