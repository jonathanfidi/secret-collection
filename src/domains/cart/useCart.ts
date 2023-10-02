import { create } from "zustand";
import Product from "../products/product";

export type Cart = {
  items: CartItem[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  cart: Cart;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addOneToCart: (product: Product) => void;
  removeOneFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
};

export const useCart = create<CartStore>((set) => ({
  cart: { items: [] },
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addOneToCart: (product: Product) =>
    set((state) => {
      if (!product) return state;

      const cartItemFromProduct = state.cart.items.find(
        (item) => item.product.id === product.id,
      );

      if (!!cartItemFromProduct)
        return {
          cart: {
            items: [
              ...state.cart.items.map((item) => {
                if (item.product.id === product.id) {
                  return {
                    ...item,
                    quantity: item.quantity + 1,
                  };
                }
                return item;
              }),
            ],
          },
        };

      return {
        cart: { items: [...state.cart.items, { product, quantity: 1 }] },
      };
    }),
  removeOneFromCart: (product: Product) =>
    set((state) => {
      if (!product) return state;

      const cartItemFromProduct = state.cart.items.find(
        (item) => item.product.id === product.id,
      );

      if (!cartItemFromProduct) return state;

      if (cartItemFromProduct.quantity > 1)
        return {
          cart: {
            items: [
              ...state.cart.items.map((item) => {
                if (item.product.id === product.id) {
                  return {
                    ...item,
                    quantity: item.quantity - 1,
                  };
                }
                return item;
              }),
            ],
          },
        };

      return {
        cart: {
          items: state.cart.items.filter(
            (item) => item.product.id !== product.id,
          ),
        },
      };
    }),
  removeFromCart: (product: Product) =>
    set((state) => {
      if (!product) return state;

      return {
        cart: {
          items: state.cart.items.filter(
            (item) => item.product.id !== product.id,
          ),
        },
      };
    }),
}));

export default useCart;
