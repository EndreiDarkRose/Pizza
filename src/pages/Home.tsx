import React from "react";

import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortPopup } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import ContentLoaderPizza from "../components/PizzaBlock/ContentLoader";
import Search from "../components/Search";
import Pagination from "../components/Pagination";

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";
import { fetchPizzas } from "../redux/slice/pizzaSlice";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [_, setIsLoading] = React.useState(true);
  const { searchValue } = useSelector((state: any) => state.filter);
  const { items, status } = useSelector((state: any) => state.pizza);

  const search = searchValue ? `&search=${searchValue}` : "";
  const { categoryId, sortType, currentPage } = useSelector(
    (state: any) => state.filter
  );

  const onClickCategories = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onClickSelected = (obj: object) => {
    dispatch(setSortType(obj));
  };
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortParam = sortPopup.find(
        (obj) => obj.sortProperty === params.sortType
      );
      dispatch(setFilters({ ...params, sortParam }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [sortType, categoryId, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        currentPage,
        sortType: sortType.sortProperty,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType, categoryId, currentPage]);

  const getPizzas = () => {
    // @ts-ignore
    dispatch(fetchPizzas({ currentPage, sortType, categoryId, search })).then(
      setIsLoading(false)
    );
  };

  const contentLoader = [...Array(4)].map((_, index) => (
    <ContentLoaderPizza key={index} />
  ));

  const pizzas = items.map((item: any) => (
    <PizzaBlock {...item} key={item.id} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onClickCategories={(id: number) => onClickCategories(id)}
          />
          <Sort
            sortType={sortType}
            onClickSelected={(obj: object) => onClickSelected(obj)}
          />
        </div>
        <div className="content-header">
          <h2 className="content__title">Все пиццы</h2>
          <Search />
        </div>
        {status === `error` ? (
          <div className="content__error-info">
            <h1>Произошла ошибка</h1> <p>Не удалось получить пиццы</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? contentLoader : pizzas}
          </div>
        )}
        <Pagination onChangePage={(page: number) => onChangePage(page)} />
      </div>
    </>
  );
};

export default Home;
