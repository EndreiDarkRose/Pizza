import React from "react";
import { Link } from "react-router-dom";
const CartEmpty: React.FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src="./assets/img/empty-cart.png" alt="Empty cart" />
        <Link to="/React-pizza">
          <div className="button button--black">
            <span>Вернуться назад</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
