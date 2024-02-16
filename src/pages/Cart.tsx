import React from "react";
import { clearItems } from "../redux/slice/cartSlice";

import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import CartEmpty from "../components/CartEmpty";
import { useAppDispatch, useAppSelector } from "../utils/hookRedux";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const countItems = items.reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );
  const onClickDeleteItems = () => dispatch(clearItems());

  return (
    <div>
      <div className="content">
        {items.length > 0 ? (
          <div className="container container--cart">
            <div className="cart">
              <div className="cart__top">
                <div className="cart-left">
                  <img src="/assets/img/delete-items.svg" alt="" />
                  <h2 className="content__title">Корзина</h2>
                </div>
                <div className="cart__clear" onClick={onClickDeleteItems}>
                  <img src="/assets/img/trash.svg" />
                  <span>Очистить корзину</span>
                </div>
              </div>
              <div className="content__items">
                {items.map((item: any) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
              <div className="cart__bottom">
                <div className="cart__bottom-details">
                  <span>
                    Всего пицц: <b> {countItems ? countItems : 0} шт.</b>
                  </span>
                  <span>
                    Сумма заказа:
                    <b>{totalPrice ? totalPrice : 0} ₽</b>
                  </span>
                </div>
                <div className="cart__bottom-buttons">
                  <Link to="/React-pizza">
                    <div className="button button--outline button--add go-back-btn">
                      <img src="/assets/img/grey-arrow-left.svg" />
                      <span>Вернуться назад</span>
                    </div>
                  </Link>
                  <div className="button pay-btn">
                    <span>Оплатить сейчас</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CartEmpty />
        )}
      </div>
    </div>
  );
};

export default Cart;
