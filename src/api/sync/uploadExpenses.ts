
import { doc, setDoc } from 'firebase/firestore';
import { isOnline } from '../../hooks/useOnlineStatus';
import { db } from '@/src/db/sqlite';
import { firebaseDB } from '../firebase/firebaseConfig';


export const uploadExpenses = async () => {
  if (!(await isOnline()) || !db) return;

  db.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      'SELECT * FROM items WHERE synced = 0',
      [],
      async (_, { rows }: any) => {
        for (const item of rows._array) {
          await setDoc(doc(firebaseDB, 'items', item.id), {
            title: item.title,
          });

          db.transaction((txNested: SQLTransaction) => {
            txNested.executeSql('UPDATE items SET synced = 1 WHERE id = ?', [item.id]);
          });
        }
      },
    );
  });
};
