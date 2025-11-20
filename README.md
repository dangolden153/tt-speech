# Text to Speech Pro — Expo SDK 54 + TypeScript + Redux Toolkit

A stunning, production-ready Text-to-Speech app built with modern Expo (Router + SDK 54), featuring:

- Voice selection (all device voices)
- Real-time pitch & rate control
- Pause/Resume (iOS) + graceful fallback (Android)
- Save favorite phrases (AsyncStorage)
- Dark/Light mode with persistence
- Glassmorphism UI + Moti animations
- Bottom sheet settings
- 100% TypeScript + Redux Toolkit

**Live Android APK (EAS Build):**  
https://expo.dev/artifacts/eas/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apk  
*(Built with `eas build --platform android --profile preview`)*

### Tech Stack
- Expo SDK 54 (React Native 0.81 + React 19)
- Expo Router (file-based routing)
- Redux Toolkit + React-Redux
- Moti + Reanimated (animations)
- @gorhom/bottom-sheet
- expo-speech, expo-linear-gradient
- react-native-safe-area-context

### Installation & Setup

```bash
# 1. Clone repo
git clone https://github.com/yourusername/tts-pro.git
cd tts-pro

# 2. Install dependencies
npm install
# or
yarn

# 3. Install Expo (if needed)
npm install -g expo-cli

# 4. Start the app
npx expo start --clear

# Scan QR code with Expo Go (iOS/Android)
# Or press 'a' for Android emulator, 'i' for iOS simulator






 Folder Structure

TTS-Pro/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── src/
│   ├── components/
│   │   └── SettingsBottomSheet.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   └── Redux/
│       ├── store/
│       │   └── store.ts
│       └── store/
│           └── speechSlice.ts
├── assets/
├── app.json
├── package.json
├── babel.config.js
└── README.md        ← This one below