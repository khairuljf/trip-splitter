import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

import '../global.css';
import { useColorScheme } from 'react-native';
import { syncService } from '../src/api/sync/syncService';
import { initTables } from '@/src/db/initTables';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initTables();
    void syncService.downloadExpenses();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="trip/[tripId]/index" />
        <Stack.Screen name="trip/[tripId]/members" />
        <Stack.Screen name="trip/[tripId]/expenses" />
        <Stack.Screen name="trip/[tripId]/add-expense" />
        <Stack.Screen name="trip/[tripId]/equalization" />
        <Stack.Screen name="trip/[tripId]/settle" />
        <Stack.Screen name="about" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
