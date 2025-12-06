import { Platform } from 'react-native';

import { db } from './sqlite';

export const initTables = () => {
    if (Platform.OS === 'web' || !db) return;

    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        synced INTEGER
      );`,
        );
    });
};

