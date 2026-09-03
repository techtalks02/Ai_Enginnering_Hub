"use client";

import { create } from "zustand";

interface UIState {
  reserveSeatOpen: boolean;
  openReserveSeat: () => void;
  closeReserveSeat: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  reserveSeatOpen: false,
  openReserveSeat: () => set({ reserveSeatOpen: true }),
  closeReserveSeat: () => set({ reserveSeatOpen: false }),
}));
