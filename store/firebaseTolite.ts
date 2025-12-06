import { firebaseDB } from "@/firebaseConfig";
import { db as offlineDB } from "@/sqlite";
import { collection, getDocs } from "firebase/firestore";

export const syncFromFirebase = async () => {
    const snapshot = await getDocs(collection(firebaseDB, "items"));

    offlineDB.transaction((tx: any) => {
        snapshot.forEach(docSnap => {
            const item = docSnap.data();
            tx.executeSql(
                "INSERT OR REPLACE INTO items (id, title, synced) VALUES (?, ?, 1)",
                [docSnap.id, item.title]
            );
        });
    });
};
