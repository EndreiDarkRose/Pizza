import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

export type CartItemProps = {
  imageUrl: string;
  type: string;
  id: string;
  size: number;
  name: string;
  price: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemProps[];
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

const sumTotalPrice = (state: CartSliceState) =>
  (state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0));

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
      sumTotalPrice(state);
    },
    minusItem(state, action: PayloadAction<CartItemProps>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count > 1 ? findItem.count-- : (findItem.count = 0);
      }
    },
    deleteItems(state, action: PayloadAction<CartItemProps>) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      sumTotalPrice(state);
    },
    clearItems(state) {
      state.items = [];
      sumTotalPrice(state);
    },
  },
});

export const selectorCart = (state: RootState) => state.cart;

export const { addItems, deleteItems, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
