// app/index.tsx
import SettingsBottomSheet from '@/components/SettingsBottomSheet';
import {
  resetSpeech,
  setIsPaused,
  setIsSpeaking,
  setText,
} from '@/src/Redux/store/speechSlice';
import { RootState } from '@/src/Redux/store/store';
import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { AnimatePresence, MotiView } from 'moti';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { text, isSpeaking, isPaused } = useSelector((s: RootState) => s.speech);

  const [voices, setVoices] = React.useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = React.useState<string>('');
  const [rate, setRate] = React.useState(0.9);
  const [pitch, setPitch] = React.useState(1.0);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const isAndroid = Platform.OS === 'android';
  const isDark = theme === 'dark';

  // Load voices & favorites on mount
  useEffect(() => {
    (async () => {
      const availableVoices = await Speech.getAvailableVoicesAsync();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].identifier);
      }

      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    })();

    return () => {
      void Speech.stop();
    };
  }, []);

  // Shared finish handler — fixes TS2322 error
  const handleFinish = () => {
    dispatch(resetSpeech());
  };

  const speak = () => {
    if (!text.trim()) return;

    Speech.speak(text, {
      voice: selectedVoice,
      rate,
      pitch,
      onStart: () => {
        dispatch(setIsSpeaking(true));
        dispatch(setIsPaused(false));
      },
      onDone: handleFinish,
      onStopped: handleFinish,
      onError: handleFinish,
    });
  };

  const stop = () => {
    void Speech.stop();
    dispatch(resetSpeech());
  };

  const pause = () => {
    if (isAndroid) {
      stop(); // Android has no pause support
    } else {
      Speech.pause();
      dispatch(setIsPaused(true));
    }
  };

  const resume = () => {
    if (isAndroid) {
      speak(); // restart from beginning
    } else {
      Speech.resume();
      dispatch(setIsSpeaking(true));
      dispatch(setIsPaused(false));
    }
  };

  const saveFavorite = async () => {
    if (!text.trim()) return;
    const newFavs = [...new Set([...favorites, text.trim()])];
    setFavorites(newFavs);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavs));
    Alert.alert('Saved', 'Phrase added to favorites');
  };

  return (
    <>
      <LinearGradient
        colors={isDark
          ? ['#667eea', '#764ba2']
          : ['#a8edea', '#fed6e3']}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Title */}
          <MotiView
            from={{ opacity: 0, translateY: -30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 800 }}
          >
            <Text style={{
              fontSize: 36,
              fontWeight: '800',
              color: 'white',
              textAlign: 'center',
              marginVertical: 30,
              textShadowColor: 'rgba(0,0,0,0.4)',
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 8,
            }}>
              Text to Speech Pro
            </Text>
          </MotiView>

          {/* Text Input */}
          <MotiView
            from={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring' }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.18)',
              borderRadius: 28,
              padding: 20,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.2)',
            }}
          >
            <TextInput
              placeholder="Type or paste text here..."
              placeholderTextColor="#ccc"
              value={text}
              onChangeText={(t) => dispatch(setText(t))}
              multiline
              maxLength={500}
              style={{
                color: 'white',
                fontSize: 18,
                minHeight: 160,
                textAlignVertical: 'top',
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Text style={{ color: '#fff9', fontSize: 14 }}>{text.length}/500</Text>
              <TouchableOpacity onPress={saveFavorite}>
                <Ionicons
                  name="heart"
                  size={28}
                  color={favorites.includes(text.trim()) ? '#ff6b6b' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </MotiView>

          {/* Favorites */}
          {favorites.length > 0 && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={favorites}
              keyExtractor={(_, i) => i.toString()}
              style={{ marginBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => dispatch(setText(item))}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                    borderRadius: 30,
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: 'white' }}>{item.slice(0, 28)}...</Text>
                </TouchableOpacity>
              )}
            />
          )}

          {/* Play / Pause / Stop Controls */}
          <View style={{ alignItems: 'center', marginVertical: 50 }}>
            <AnimatePresence>
              {/* Play */}
              {text.trim() && !isSpeaking && !isPaused && (
                <MotiView
                  key="play"
                  from={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring' }}
                >
                  <TouchableOpacity
                    onPress={speak}
                    style={{
                      backgroundColor: '#4ade80',
                      width: 90,
                      height: 90,
                      borderRadius: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 12 },
                      shadowOpacity: 0.4,
                      shadowRadius: 20,
                      elevation: 20,
                    }}
                  >
                    <Ionicons name="play" size={48} color="white" />
                  </TouchableOpacity>
                </MotiView>
              )}

              {/* Speaking */}
              {isSpeaking && (
                <>
                  <MotiView
                    from={{ rotate: '0deg' }}
                    animate={{ rotate: '360deg' }}
                    transition={{ loop: true, duration: 4000 }}
                  >
                    <TouchableOpacity onPress={pause} style={{ marginBottom: 24 }}>
                      <Ionicons
                        name={isAndroid ? 'stop-circle' : 'pause-circle'}
                        size={80}
                        color="#fbbf24"
                      />
                    </TouchableOpacity>
                  </MotiView>
                  <TouchableOpacity onPress={stop}>
                    <Ionicons name="stop-circle" size={64} color="#ef4444" />
                  </TouchableOpacity>
                </>
              )}

              {/* Paused (iOS only) */}
              {!isAndroid && isPaused && (
                <MotiView
                  key="resume"
                  from={{ scale: 0.8 }}
                  animate={{ scale: 1.15 }}
                  transition={{ loop: true, duration: 1200 }}
                >
                  <TouchableOpacity onPress={resume}>
                    <Ionicons name="play-circle" size={90} color="#4ade80" />
                  </TouchableOpacity>
                </MotiView>
              )}
            </AnimatePresence>
          </View>

          {/* Theme Toggle */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              position: 'absolute',
              left: 24,
              bottom: 100,
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 16,
              borderRadius: 30,
            }}
          >
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={30} color="white" />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.present()}
            style={{
              position: 'absolute',
              right: 24,
              bottom: 100,
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 16,
              borderRadius: 30,
            }}
          >
            <Ionicons name="settings" size={30} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>

      {/* Settings Bottom Sheet */}
      <SettingsBottomSheet
        ref={bottomSheetRef}
        voices={voices}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        rate={rate}
        setRate={setRate}
        pitch={pitch}
        setPitch={setPitch}
      />
    </>
  );
}