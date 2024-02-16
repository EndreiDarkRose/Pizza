import { CartItemProps } from "../redux/slice/cartSlice";

export const sumTotalPrice = (items: CartItemProps[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
