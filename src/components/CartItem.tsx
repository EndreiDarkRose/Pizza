import React from "react";
import { useDispatch } from "react-redux";
import { addItems, minusItem, deleteItems } from "../redux/slice/cartSlice";

type Items = {
  imageUrl: string;
  item: string;
  type: number;
  id: string;
  size: number;
  count: number;
  name: string;
  price: number;
};

const CartItem: React.FC<Items> = ({ ...item }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => dispatch(addItems({ id: item.id }));
  const onClickMinus = () => dispatch(minusItem({ id: item.id }));
  const onClickDeleteItem = () => dispatch(deleteItems({ id: item.id }));

  return (
    <div className="content__items">
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{item.name}</h3>
          <p>
            {item.type}, {item.size} см.
          </p>
        </div>
        <div className="cart__item-count">
          <div
            className="button button--outline button--circle cart__item-count-minus"
            onClick={onClickMinus}
          >
            <img src="assets/img/minus-icon.svg"></img>
          </div>
          <b>{item.count}</b>
          <div
            className="button button--outline button--circle cart__item-count-plus"
            onClick={onClickPlus}
          >
            <img src="assets/img/plus-icon.svg"></img>
          </div>
        </div>
        <div className="cart__item-price">
          <b>{item.price * item.count} ₽</b>
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
