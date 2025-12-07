import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import "../global.css";


import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { isOnline } from '../src/hooks/useOnlineStatus';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  console.log("env", process.env.FIREBASE_API_KEY)

  console.log("isOnline", isOnline());

  useEffect(() => {
    // createTables();
    //syncFromFirebase();
    //syncToFirebase();
  }, []);



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="group/[id]/index" />
        <Stack.Screen name="group/[id]/members" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="about" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
