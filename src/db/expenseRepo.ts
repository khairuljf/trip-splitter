import { db } from '@/db/sqlite';
import { v4 as uuidv4 } from 'uuid';

export const saveOffline = (title: string) => {
    if (!db) return;

    const id = uuidv4();

    db.transaction((tx) => {
        tx.executeSql('INSERT INTO items (id, title, synced) VALUES (?, ?, 0)', [id, title]);
    });
};
