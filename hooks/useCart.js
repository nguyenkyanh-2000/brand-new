"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      addItem: (variant) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.id === variant.id,
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
            return { items: updatedItems };
          }

          return { items: [...state.items, { ...variant, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                const updatedQuantity = item.quantity - 1;
                // If quantity becomes zero or negative, remove the item
                if (updatedQuantity <= 0) {
                  return null; // Return null to filter it out
                }
                return { ...item, quantity: updatedQuantity };
              }
              return item;
            })
            .filter(Boolean); // Remove null entries
          return { items: updatedItems };
        }),
      clearCart: () => set({ items: [] }),
      setCart: (newItems) => set({ items: newItems }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
