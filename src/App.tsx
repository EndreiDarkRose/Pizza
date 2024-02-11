import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { NotFoundBlock } from "./components/NotFoundBlock";

import "./scss/app.scss";
import PizzaInfo from "./components/PizzaInfo";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFoundBlock />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
