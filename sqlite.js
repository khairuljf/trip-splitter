import { Platform } from "react-native";

/* ✅ 1. OPEN DATABASE SAFELY */
let db = null;

if (Platform.OS !== "web") {
    const SQLite = require("expo-sqlite");
    db = SQLite.openDatabase("offline.db");
}

export { db };

/* ✅ 2. CREATE TABLES */
export const createTables = () => {
    if (Platform.OS === "web") return;
    if (!db) return;

    db.transaction(tx => {
        tx.executeSql(`
      CREATE TABLE IF NOT EXISTS items (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT,
        synced INTEGER
      );
    `);
    });
};
