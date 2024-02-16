import React from "react";

type CategoriesItem = {
  categoryId: number;
  onClickCategories: (index: number) => void;
};

const Categories: React.FC<CategoriesItem> = React.memo(
  ({ categoryId, onClickCategories }) => {
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
              className={categoryId === index ? "active" : ""}
              onClick={() => onClickCategories(index)}
            >
              {categoriesName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
