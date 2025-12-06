import { db } from '@/db/sqlite';

export const getAllTrips = () =>
    new Promise((resolve) => {
        if (!db) {
            resolve([]);
            return;
        }

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM items',
                [],
                (_, result) => resolve(result.rows._array),
                () => {
                    resolve([]);
                    return false;
                },
            );
        });
    });

