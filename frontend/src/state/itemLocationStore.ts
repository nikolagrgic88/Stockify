// import { persist } from "zustand/middleware";
import { create } from "zustand";

export type ItemLocation = {
  locationId: string;
  quantity: number;
};

interface ItemLocationState {
  itemId: string;
  quantity: number;
  locations: { locationId: string; quantity: number }[];
  addQuantity: (q: number) => void;
  removeQuantity: (q: number) => void;
  addLocation: ({ locationId, quantity }: ItemLocation) => void;
  removeLocation: (locationId: string) => void;
  setLocations: (locations: ItemLocation[]) => void;
  resetQuantity: () => void;
  updateLocation: ({ locationId, quantity }: ItemLocation) => void;
}
export const useItemLocationState = create<ItemLocationState>()((set) => ({
  itemId: "",
  quantity: 0,
  locations: [],
  addQuantity: (q: number) =>
    set((state) => ({ quantity: state.quantity + q })),
  removeQuantity: (q: number) =>
    set((state) => ({ quantity: state.quantity - q })),
  addLocation: (location) =>
    set((state) => ({
      locations: [...state.locations, location],
    })),
  removeLocation: (locationId) =>
    set((state) => ({
      locations: state.locations.filter(
        (location) => location.locationId !== locationId
      ),
    })),
  setLocations: (locations) =>
    set(() => ({
      locations,
    })),
  updateLocation: ({ locationId, quantity }) =>
    set((state) => ({
      locations: state.locations.map((loc) =>
        loc.locationId === locationId ? { ...loc, quantity } : loc
      ),
    })),
  resetQuantity: () => set(() => ({ quantity: 0 })),
}));
