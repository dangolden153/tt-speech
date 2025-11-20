import { speakText, stopSpeaking } from "@/src/service/ttsService";
import { useState } from "react";

export default function useTTS() {
  const [text, setText] = useState("");

  const handleSpeak = () => {
    if (text.trim().length === 0) return;
    speakText(text);
  };

  const handleStop = () => stopSpeaking();

  return {
    text,
    setText,
    handleSpeak,
    handleStop,
  };
}
