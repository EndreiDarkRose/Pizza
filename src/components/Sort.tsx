import React from "react";
import { SortProp } from "../redux/slice/filterSlice";

export const sortPopup: SortProp[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

type SortProps = {
  sortType: SortProp;
  onClickSelected: any;
};

const Sort: React.FC<SortProps> = React.memo(
  ({ sortType, onClickSelected }) => {
    const [openPopup, setOpenPopup] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside: EventListener = (event) => {
        console.log(event);

        if (
          sortRef.current &&
          !sortRef.current.contains(event.target as Node)
        ) {
          setOpenPopup(false);
        }
      };
      document.body.addEventListener("click", handleClickOutside);
      return () => {
        document.body.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div className="sort" ref={sortRef}>
        <div className="sort__label">
          <img src="./assets/img/triangle.svg"></img>
          <b>Сортировка по:</b>
          <span onClick={() => setOpenPopup(!openPopup)}>{sortType.name}</span>
        </div>
        {openPopup && (
          <div className="sort__popup">
            <ul>
              {sortPopup.map((obj, index) => (
                <li
                  key={index}
                  className={
                    sortType.sortProperty === obj.sortProperty ? "active" : ""
                  }
                  onClick={() => [onClickSelected(obj), setOpenPopup(false)]}
                >
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default Sort;
