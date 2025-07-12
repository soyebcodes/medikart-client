import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const exists = get().cart.find((i) => i._id === item._id);
        if (exists) {
          set({
            cart: get().cart.map((i) =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, quantity: 1 }] });
        }
      },

      removeFromCart: (id) =>
        set({ cart: get().cart.filter((i) => i._id !== id) }),

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, quantity) =>
        set({
          cart: get().cart.map((item) =>
            item._id === id
              ? { ...item, quantity: Math.max(quantity, 1) }
              : item
          ),
        }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
