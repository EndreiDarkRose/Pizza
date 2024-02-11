import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PizzaInfo = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: string;
  }>();
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
    console.log(pizza);
  }, []);
  return (
    <div className="container">
      {pizza !== undefined ? (
        <>
          <img src={pizza.imageUrl}></img>
          <h2>{pizza.name}</h2>
          <p>{pizza.price} ₽</p>
        </>
      ) : (
        <>
          <h3>Загрузка...</h3>
        </>
      )}
    </div>
  );
};

export default PizzaInfo;
