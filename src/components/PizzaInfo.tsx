import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CartItemProps } from "../redux/slice/cartSlice";

const PizzaInfo = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<CartItemProps>();
  console.log(id);
  React.useEffect(() => {
    async function fetchPizzaInfo() {
      try {
        const { data } = await axios.get(
          `https://65c32311f7e6ea59682c02c5.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert(`Ошибка получении информации`);
      }
    }
    fetchPizzaInfo();
  }, []);

  if (!pizza) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <>
        <img src={pizza.imageUrl}></img>
        <h2>{pizza.name}</h2>
        <p>{pizza.price} ₽</p>
      </>
    </div>
  );
};

export default PizzaInfo;
