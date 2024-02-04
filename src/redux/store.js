import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";
import pizzaReducer from "./slice/pizzaSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
