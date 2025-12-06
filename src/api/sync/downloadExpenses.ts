import { firebaseDB } from '@/api/firebase/firebaseConfig';
import { db as offlineDB } from '@/db/sqlite';
import { collection, getDocs } from 'firebase/firestore';

export const downloadExpenses = async () => {
  if (!offlineDB) return;

  const snapshot = await getDocs(collection(firebaseDB, 'items'));

  offlineDB.transaction((tx) => {
    snapshot.forEach((docSnap) => {
      const item = docSnap.data();
      tx.executeSql('INSERT OR REPLACE INTO items (id, title, synced) VALUES (?, ?, 1)', [
        docSnap.id,
        item.title,
      ]);
    });
  });
};
