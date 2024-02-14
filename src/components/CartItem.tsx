import React from "react";
import { useDispatch } from "react-redux";
import {
  addItems,
  minusItem,
  deleteItems,
  CartItemProps,
} from "../redux/slice/cartSlice";

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => dispatch(addItems({ id } as CartItemProps));
  const onClickMinus = () => dispatch(minusItem({ id } as CartItemProps));
  const onClickDeleteItem = () =>
    dispatch(deleteItems({ id } as CartItemProps));

  return (
    <div className="content__items">
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{name}</h3>
          <p>
            {type}, {size} см.
          </p>
        </div>
        <div className="cart__item-count">
          <button
            disabled={count == 1}
            className="button button--outline button--circle cart__item-count-minus"
            onClick={onClickMinus}
          >
            <img src="assets/img/minus-icon.svg"></img>
          </button>
          <b>{count}</b>
          <div
            className="button button--outline button--circle cart__item-count-plus"
            onClick={onClickPlus}
          >
            <img src="assets/img/plus-icon.svg"></img>
          </div>
        </div>
        <div className="cart__item-price">
          <b>{price * count} ₽</b>
        </div>
        <div className="cart__item-remove">
          <div
            className="button button--outline button--circle"
            onClick={onClickDeleteItem}
          >
            <img src="assets/img/close-icon.svg"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
