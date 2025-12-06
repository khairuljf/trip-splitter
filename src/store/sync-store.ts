import { create } from 'zustand';

type SyncState = {
  lastSyncedAt: Date | null;
  setLastSyncedAt: (date: Date) => void;
};

export const useSyncStore = create<SyncState>((set) => ({
  lastSyncedAt: null,
  setLastSyncedAt: (date) => set({ lastSyncedAt: date }),
}));

