import { firebaseDB } from '@/api/firebase/firebaseConfig';
import { db as offlineDB } from '@/db/sqlite';
import { isOnline } from '@/hooks/useOnlineStatus';
import { doc, setDoc } from 'firebase/firestore';

export const uploadExpenses = async () => {
  if (!(await isOnline()) || !offlineDB) return;

  offlineDB.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM items WHERE synced = 0',
      [],
      async (_, { rows }: any) => {
        for (const item of rows._array) {
          await setDoc(doc(firebaseDB, 'items', item.id), {
            title: item.title,
          });

          offlineDB.transaction((txNested) => {
            txNested.executeSql('UPDATE items SET synced = 1 WHERE id = ?', [item.id]);
          });
        }
      },
    );
  });
};
