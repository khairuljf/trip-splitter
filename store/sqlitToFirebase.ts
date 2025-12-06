import { db as offlineDB } from "@/sqlite";
import { firebaseDB } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { isOnline } from "@/library/network";

export const syncToFirebase = async () => {
    if (!(await isOnline())) return;

    offlineDB.transaction((tx: any) => {
        tx.executeSql(
            "SELECT * FROM items WHERE synced = 0",
            [],
            async (_, { rows }: any) => {
                for (let item of rows._array) {
                    await setDoc(doc(firebaseDB, "items", item.id), {
                        title: item.title,
                    });

                    offlineDB.transaction((txx: any) => {
                        txx.executeSql(
                            "UPDATE items SET synced = 1 WHERE id = ?",
                            [item.id]
                        );
                    });
                }
            }
        );
    });
};
