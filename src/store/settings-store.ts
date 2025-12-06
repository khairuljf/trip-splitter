import { create } from 'zustand';

type SettingsState = {
  currency: string;
  setCurrency: (currency: string) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),
}));

