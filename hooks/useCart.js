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
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
