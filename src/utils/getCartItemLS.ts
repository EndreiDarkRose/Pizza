import { sumTotalPrice } from "./calcTotalPrice";

export const itemLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = sumTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
