import { create } from "zustand";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
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
      toast.success(`${item.name} quantity increased`);
    } else {
      set({ cart: [...get().cart, { ...item, quantity: 1 }] });
      toast.success(`${item.name} added to cart`);
    }
  },

  removeFromCart: (id) => {
    const item = get().cart.find((i) => i._id === id);
    set({ cart: get().cart.filter((i) => i._id !== id) });
    toast.error(`${item?.name || "Item"} removed from cart`);
  },

  clearCart: () => {
    set({ cart: [] });
    toast.error("Cart cleared");
  },

  updateQuantity: (id, qty) => {
    set({
      cart: get().cart.map((i) =>
        i._id === id ? { ...i, quantity: qty } : i
      ),
    });
    toast.success("Quantity updated");
  },
}));
