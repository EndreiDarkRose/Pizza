import React from "react";

function Categories({ value, onClickCategories }) {
  const catagories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {catagories.map((categoriesName, index) => (
          <li
            key={index}
            className={value === index ? "active" : ""}
            onClick={() => onClickCategories(index)}
          >
            {categoriesName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
