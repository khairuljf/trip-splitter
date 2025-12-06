import { create } from 'zustand';

type Trip = {
  id: string;
  title: string;
};

type TripStore = {
  trips: Trip[];
  setTrips: (trips: Trip[]) => void;
};

export const useTripStore = create<TripStore>((set) => ({
  trips: [],
  setTrips: (trips) => set({ trips }),
}));

