import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const sumTotalPrice = (state) =>
  (state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      sumTotalPrice(state, action);
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem.count > 0 ? findItem.count-- : (findItem.count = 0);
      sumTotalPrice(state, action);
    },
    deleteItems(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      sumTotalPrice(state, action);
    },
    clearItems(state) {
      state.items = [];
      sumTotalPrice(state);
    },
  },
});

export const selectorCart = (state) => state.cart;

export const { addItems, deleteItems, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
