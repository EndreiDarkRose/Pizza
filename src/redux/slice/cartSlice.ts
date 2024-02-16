import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { itemLS } from "../../utils/getCartItemLS";
import { sumTotalPrice } from "../../utils/calcTotalPrice";

export type CartItemProps = {
  imageUrl: string;
  type: string;
  id: string;
  size: number;
  name: string;
  price: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemProps[];
}
const { items, totalPrice } = itemLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = sumTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count > 1 ? findItem.count-- : (findItem.count = 0);
      }
      state.totalPrice = sumTotalPrice(state.items);
    },
    deleteItems(state, action: PayloadAction<CartItemProps>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalPrice = sumTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = sumTotalPrice(state.items);
    },
  },
});

export const selectorCart = (state: RootState) => state.cart;

export const { addItems, deleteItems, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
