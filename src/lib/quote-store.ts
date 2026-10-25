"use client";

import { create } from "zustand";

/**
 * Shared state for the interactive quote builder.
 * Other sections (services, events) push selections in here,
 * and the quote wizard in the contact section picks them up.
 */
export type QuoteState = {
  eventType: string;
  eventDate: string;
  guests: number;
  services: string[];
  setEventType: (value: string) => void;
  setEventDate: (value: string) => void;
  setGuests: (value: number) => void;
  toggleService: (title: string) => void;
  clearQuote: () => void;
};

const INITIAL = {
  eventType: "",
  eventDate: "",
  guests: 150,
  services: [] as string[],
};

export const useQuoteStore = create<QuoteState>((set) => ({
  ...INITIAL,
  setEventType: (value) => set({ eventType: value }),
  setEventDate: (value) => set({ eventDate: value }),
  setGuests: (value) => set({ guests: value }),
  toggleService: (title) =>
    set((state) => ({
      services: state.services.includes(title)
        ? state.services.filter((s) => s !== title)
        : [...state.services, title],
    })),
  clearQuote: () => set({ ...INITIAL }),
}));
