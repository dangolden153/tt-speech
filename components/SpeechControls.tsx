// src/components/SpeechControls.tsx
import { Ionicons } from '@expo/vector-icons';
import { AnimatePresence, MotiView } from 'moti';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  isSpeaking: boolean;
  isPaused: boolean;
  hasText: boolean;
  onSpeak: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
}

const ControlButton = ({
  onPress,
  icon,
  color = '#fff',
  size = 36,
}: {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
}) => (
  <MotiView
    from={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    transition={{ type: 'spring' }}
  >
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  </MotiView>
);

export default function SpeechControls({
  isSpeaking,
  isPaused,
  hasText,
  onSpeak,
  onStop,
  onPause,
  onResume,
}: Props) {
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={styles.container}>
      <AnimatePresence>
        {/* Play button */}
        {hasText && !isSpeaking && !isPaused && (
          <ControlButton 
            key="ready-play"  // Unique key
            onPress={onSpeak} 
            icon="play" 
            color="#4CAF50" 
            size={44} 
          />
        )}

        {/* Speaking: Pause + Stop */}
        {isSpeaking && (
          <>
            <ControlButton 
              key="speaking-pause"  // Unique key
              onPress={onPause} 
              icon={isAndroid ? "stop" : "pause"}  // Stop icon on Android
              size={44}
            />
            <ControlButton 
              key="speaking-stop"  // Unique: "speaking-stop"
              onPress={onStop} 
              icon="stop" 
              color="#f44336" 
            />
          </>
        )}

        {/* Paused: Resume + Stop (iOS only) */}
        {!isAndroid && isPaused && (
          <>
            <ControlButton 
              key="paused-resume"  // Unique key
              onPress={onResume} 
              icon="play" 
              color="#4CAF50" 
              size={44} 
            />
            <ControlButton 
              key="paused-stop"  // Unique: "paused-stop"
              onPress={onStop} 
              icon="stop" 
              color="#f44336" 
            />
          </>
        )}
      </AnimatePresence>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
});