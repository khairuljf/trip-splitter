
import { collection, getDocs } from 'firebase/firestore';
import { firebaseDB } from '../firebase/firebaseConfig';
import { db } from '@/src/db/sqlite';

export const downloadExpenses = async () => {
  if (!db) return;

  const snapshot = await getDocs(collection(firebaseDB, 'items'));

  db.transaction((tx) => {
    snapshot.forEach((docSnap) => {
      const item = docSnap.data();
      tx.executeSql('INSERT OR REPLACE INTO items (id, title, synced) VALUES (?, ?, 1)', [
        docSnap.id,
        item.title,
      ]);
    });
  });
};
