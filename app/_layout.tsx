// app/_layout.tsx
import { ThemeProvider } from '@/src/context/ThemeContext';
import { store } from '@/src/Redux/store/store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({});

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}