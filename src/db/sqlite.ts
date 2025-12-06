import { openDatabase, type SQLiteDatabase } from 'expo-sqlite';
import { Platform } from 'react-native';

let db: SQLiteDatabase | null = null;

if (Platform.OS !== 'web') {
  db = openDatabase('offline.db');
}

export { db };
