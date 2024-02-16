import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import { NotFoundBlock } from "./components/NotFoundBlock";

import "./scss/app.scss";

const Cart = React.lazy(() => import("./pages/Cart"));
const PizzaInfo = React.lazy(() => import("./components/PizzaInfo"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundBlock />} />

        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <PizzaInfo />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
