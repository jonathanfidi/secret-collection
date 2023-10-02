import { Cart } from "./useCart";

const getCartQuantity = (cart: Cart) => {
  if (cart?.items?.length) {
    return cart.items.reduce((acc, item) => acc + item.quantity, 0);
  }
  return 0;
};

export default getCartQuantity;
