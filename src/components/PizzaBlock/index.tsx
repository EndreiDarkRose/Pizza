import React from "react";
import { CartItemProps, addItems } from "../../redux/slice/cartSlice";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hookRedux";

export type PizzaBlock = {
  imageUrl: string;
  type: string;
  id: string;
  size: number;
  count: number;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlock> = ({ ...items }) => {
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const typeName = ["тонкое", "традиционное"];
  const size = [26, 30, 40];
  const dispatch = useAppDispatch();
  const countItems = useAppSelector((state) =>
    state.cart.items.find((obj: any) => obj.id === items.id)
  );

  const onClickAdd = () => {
    const item: CartItemProps = {
      name: items.name,
      id: items.id,
      price: items.price,
      imageUrl: items.imageUrl,
      type: typeName[activeType],
      size: size[activeSize],
      count: 0,
    };

    dispatch(addItems(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={items.id} to={`/pizza/${items.id}`}>
          <img
            className="pizza-block__image"
            src={items.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{items.name}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {items.types.map((type, index) => (
              <li
                key={index}
                className={activeType === index ? "active" : ""}
                onClick={() => setActiveType(index)}
              >
                {typeName[type]}
              </li>
            ))}
          </ul>
          <ul>
            {items.sizes.map((size, index) => (
              <li
                key={index}
                className={activeSize === index ? "active" : ""}
                onClick={() => setActiveSize(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {items.price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{countItems ? countItems.count : 0}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
