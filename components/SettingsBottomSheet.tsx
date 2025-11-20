// src/components/SettingsBottomSheet.tsx
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech'; // ← THIS WAS MISSING!
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  voices: Speech.Voice[];
  selectedVoice: string;
  setSelectedVoice: (id: string) => void;
  rate: number;
  setRate: (v: number) => void;
  pitch: number;
  setPitch: (v: number) => void;
}

const SettingsBottomSheet = React.forwardRef<BottomSheetModal, Props>((props, ref) => {
  const {
    voices,
    selectedVoice,
    setSelectedVoice,
    rate,
    setRate,
    pitch,
    setPitch,
  } = props;

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['65%']}
      backgroundStyle={{
        backgroundColor: '#1a1a2e',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      <BottomSheetScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 24 }}>
          Settings
        </Text>

        {/* Voice Selection */}
        <Text style={{ color: '#aaa', marginBottom: 12, fontSize: 16 }}>Voice</Text>
        {voices.map((voice) => (
          <TouchableOpacity
            key={voice.identifier}
            onPress={() => setSelectedVoice(voice.identifier)}
            style={{
              padding: 16,
              backgroundColor: selectedVoice === voice.identifier ? '#667eea' : '#16213e',
              borderRadius: 14,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>
              {voice.name} • {voice.language}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Rate Slider */}
        <Text style={{ color: '#aaa', marginTop: 24, marginBottom: 8, fontSize: 16 }}>
          Speed: {rate.toFixed(2)}×
        </Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={0.5}
          maximumValue={2}
          step={0.1}
          value={rate}
          onValueChange={setRate}
          minimumTrackTintColor="#667eea"
          maximumTrackTintColor="#444"
          thumbTintColor="#667eea"
        />

        {/* Pitch Slider */}
        <Text style={{ color: '#aaa', marginTop: 24, marginBottom: 8, fontSize: 16 }}>
          Pitch: {pitch.toFixed(2)}
        </Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={0.5}
          maximumValue={2}
          step={0.1}
          value={pitch}
          onValueChange={setPitch}
          minimumTrackTintColor="#764ba2"
          maximumTrackTintColor="#444"
          thumbTintColor="#764ba2"
        />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

SettingsBottomSheet.displayName = 'SettingsBottomSheet';

export default SettingsBottomSheet;