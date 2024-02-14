import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { CartItemProps } from "./cartSlice";
import { PizzaBlock } from "../../components/PizzaBlock";
import { SortProp } from "./filterSlice";

interface PizzaSliceState {
  items: CartItemProps[];
  status: "loading" | "success" | "error";
}
export type SortItem = {
  name: string;
  sortProperty: string;
};

export interface FetchPizzasArg {
  currentPage: number;
  sortType: SortProp;
  categoryId: number;
  search: string;
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async ({ currentPage, sortType, categoryId, search }: FetchPizzasArg) => {
    const { data } = await axios.get<PizzaBlock[]>(
      `https://65c32311f7e6ea59682c02c5.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProperty}&order=desc${search}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
